import recursiveReaddir from 'recursive-readdir';
import * as mm from 'music-metadata';
import * as path from 'path';
// tslint:disable-next-line:import-name
import produce from 'immer';
import electronLog from 'electron-log';

import { sortTracks } from '../utilities/LibraryUtils';
import { AppStoreModel } from '../stores/AppStoreModel';
import { TrackModel, TracksDatabase } from '../database/TracksDatabase';
import Notifications from '../libraries/Notifications';

export async function refreshLibrary(state?: AppStoreModel) {
    Notifications.addNotification(
        'library',
        'Refreshing Library... Please Wait'
    );
    const db: TracksDatabase = new TracksDatabase('library');

    if (state.settings.library.path === '') {
        return state;
    }

    try {
        let files: string[] = await recursiveReaddir(
            state.settings.library.path
        );

        // filter out the unrequired files
        files = files.filter(file => {
            return (
                path.extname(file) === '.mp3' ||
                path.extname(file) === '.wma' ||
                path.extname(file) === '.ogg' ||
                path.extname(file) === '.wav' ||
                path.extname(file) === '.flac'
            );
        });

        // Grab the metadata and exract the required files
        const tracks: TrackModel[] = await Promise.all(
            files.map(async (file, index) => {
                const data: mm.IAudioMetadata = await mm.parseFile(file, {
                    skipCovers: true,
                    mergeTagHeaders: true,
                });
                data.format.duration =
                    data.format.duration !== undefined
                        ? Math.floor(data.format.duration)
                        : undefined;

                if (
                    data.common.title === '' ||
                    data.common.title === undefined
                ) {
                    data.common.title = path.basename(file, path.extname(file));
                }

                if (
                    data.common.artist === '' ||
                    data.common.artist === undefined
                ) {
                    data.common.artist = 'Unknown Artist';
                }

                if (
                    data.common.album === '' ||
                    data.common.album === undefined
                ) {
                    data.common.album = 'Unknown Album';
                }

                return {
                    id: index,
                    source: file,
                    common: data.common,
                    format: data.format,
                };
            })
        );

        // Clear all existing tracks from the database
        await db.library.clear();

        // Write the new tracks into database
        await db.transaction('rw', db.library, () => {
            for (let i = 0, n = tracks.length; i < n; i++) {
                db.library.add(tracks[i]);
            }
        });

        db.close();
        Notifications.removeNotification('library');

        return produce<AppStoreModel>(state, draft => {
            draft.originalLibrary = tracks;
            draft.library = sortTracks(
                draft.settings.library.sortBy,
                draft.settings.library.sortDirection,
                draft.originalLibrary
            );
        });
    } catch (error) {
        electronLog.error(error);
        Notifications.removeNotification('library');
        Notifications.addNotification(
            'libraryerror',
            'Encountered an Error While Refreshing Library. Please check the logs.',
            true
        );
        db.close();
        return state;
    }
}

export async function sortLibrary(
    sortBy: string,
    sortDirection: 'ASC' | 'DESC',
    state?: AppStoreModel
) {
    return produce(state, draft => {
        draft.library = sortTracks(sortBy, sortDirection, draft.library);
    });
}
