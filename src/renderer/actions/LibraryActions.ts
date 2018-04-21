import * as fs from 'fs-extra';
import * as mm from 'music-metadata';
import * as path from 'path';
// tslint:disable-next-line:import-name
import produce from 'immer';

import { AppStoreModel } from '../stores/AppStoreModel';
import { TrackModel, TracksDatabase } from '../database/TracksDatabase';

export async function initLibrary(state?: AppStoreModel) {
    const db: TracksDatabase = new TracksDatabase('library');
    const data = await db.library.toArray();
    db.close();
    return produce<AppStoreModel>(state, draft => {
        draft.library = data;
    });
}

export async function refreshLibrary(state?: AppStoreModel) {
    const db: TracksDatabase = new TracksDatabase('library');

    if (state.settings.library.path === '') {
        return state;
    }

    let files: string[] = await fs.readdir(state.settings.library.path);

    // filter out the unrequired files
    files = files.filter(value => {
        const file: string = path.join(state.settings.library.path, value);
        return (
            path.extname(file) === '.mp3' ||
            path.extname(file) === '.wma' ||
            path.extname(file) === '.ogg'
        );
    });

    // Grab the metadata and exract the required files
    const tracks: TrackModel[] = await Promise.all(
        files.map(async (value, index) => {
            const fullpath = path.join(state.settings.library.path, value);
            const data: mm.IAudioMetadata = await mm.parseFile(fullpath, {
                skipCovers: true,
            });
            data.format.duration =
                data.format.duration !== undefined
                    ? Math.floor(data.format.duration)
                    : undefined;
            return {
                id: index,
                source: fullpath,
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

    return produce<AppStoreModel>(state, draft => {
        draft.library = tracks;
    });
}
