// tslint:disable-next-line:import-name
import produce from 'immer';
import * as path from 'path';
import { AppStoreModel } from '../stores/AppStoreModel';
import { PlaylistsDatabase } from '../database/PlaylistsDatabase';

export async function createFolderPlaylists(state?: AppStoreModel) {
    let db = new PlaylistsDatabase('playlists');

    let folders = new Set<String>();
    let playlists: any = { root: [] };
    let paths: string[];
    state.library.forEach(track => {
        paths = track.source
            .slice(state.settings.library.path.length + 1)
            .split(path.sep);

        if (paths.length > 1) {
            if (folders.has(paths[0])) {
                playlists[paths[0]].push(track.id);
            } else {
                folders.add(paths[0]);
                playlists[paths[0]] = [track.id];
            }
        } else {
            playlists['root'].push(track.id);
        }
    });

    await db.folders.clear();
    await db.transaction('rw', db.folders, async () => {
        for (let key of Object.keys(playlists)) {
            await db.folders.add({ name: key, tracks: playlists[key] });
        }
    });

    playlists = await db.folders.toArray();

    db.close();

    return produce(state, draft => {
        draft.playlist.playlists = playlists;
        draft.playlist.currentId = 0;
        draft.playlist.currentName = playlists[0].name;
        draft.playlist.currentTracks = playlists[0].tracks.map(
            (value: number) => {
                return draft.library.find(x => x.id === value);
            }
        );
    });
}

export async function changeActivePlaylist(
    index: number,
    state?: AppStoreModel
) {
    return produce(state, draft => {
        draft.playlist.currentId = index;
        draft.playlist.currentName = draft.playlist.playlists[index].name;

        // prettier-ignore
        draft.playlist.currentTracks = draft.playlist.playlists[index].tracks.map(value => {
            return draft.library.find(x => x.id === value);
        });
    });
}
