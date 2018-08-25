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
            await db.folders.add({
                name: key,
                tracks: playlists[key],
                type: 'folder',
            });
        }
    });

    playlists = await db.folders.toArray();

    db.close();

    return produce(state, draft => {
        draft.playlist.playlists = playlists;
        draft.playlist.currentPlaylist = playlists[0];
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
        draft.playlist.currentPlaylist = draft.playlist.playlists[index];
        draft.playlist.currentIndex = index;

        // prettier-ignore
        draft.playlist.currentTracks = draft.playlist.playlists[index].tracks.map(value => {
            return draft.library.find(x => x.id === value);
        });
    });
}

export async function renamePlaylist(
    index: number,
    name: string,
    state?: AppStoreModel
) {
    let id: number = state.playlist.playlists[index].id;
    let db = new PlaylistsDatabase('playlists');
    if (state.playlist.currentPlaylist.type === 'folder') {
        await db.folders.update(id, { name });
    } else {
        await db.playlists.update(id, { name });
    }
    db.close();

    return produce(state, draft => {
        draft.playlist.playlists[index].name = name;
    });
}

export async function addNewPlaylist(state?: AppStoreModel) {
    let db = new PlaylistsDatabase('playlists');
    let id = await db.playlists.add({
        name: 'New Playlist',
        tracks: [],
        type: 'normal',
    });
    db.close();

    return produce(state, draft => {
        draft.playlist.playlists.push({
            id,
            name: 'New Playlist',
            tracks: [],
            type: 'normal',
        });
    });
}
