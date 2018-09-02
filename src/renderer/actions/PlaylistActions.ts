// tslint:disable-next-line:import-name
import produce from 'immer';
import * as path from 'path';
import { AppStoreModel } from '../stores/AppStoreModel';
import { PlaylistsDatabase } from '../database/PlaylistsDatabase';
import Notifications from '../libraries/Notifications';

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

export async function deletePlaylist(state?: AppStoreModel) {
    if (state.playlist.currentPlaylist.type === 'normal') {
        let db = new PlaylistsDatabase('playlists');

        await db.playlists.delete(state.playlist.currentPlaylist.id);

        db.close();

        Notifications.addNotification(
            'deletePlaylist',
            `Deleted Playlist: ${state.playlist.currentPlaylist.name}`,
            true
        );

        // TODO: Reset the current playlist here.

        return produce(state, draft => {
            let newIndex: number = draft.playlist.currentIndex - 1;
            draft.playlist.currentIndex = newIndex;
            draft.playlist.currentPlaylist = draft.playlist.playlists[newIndex];
            // prettier-ignore
            draft.playlist.currentTracks = draft.playlist.playlists[newIndex].tracks.map(
                value => {
                    return draft.library.find(x => x.id === value);
                }
            );
            draft.playlist.playlists.splice(state.playlist.currentIndex, 1);
        });
    }
    return state;
}

export async function addTrackPlaylist(
    index: number,
    track: number,
    state?: AppStoreModel
) {
    let db = new PlaylistsDatabase('playlists');
    await db.playlists.update(state.playlist.playlists[index].id, {
        tracks: [...state.playlist.playlists[index].tracks, track],
    });
    db.close();

    Notifications.addNotification(
        'addSong',
        `Added Song to Playlist '${state.playlist.playlists[index].name}'`,
        true
    );

    return produce(state, draft => {
        draft.playlist.playlists[index].tracks.push(track);
    });
}

export async function removeTrackPlaylist(
    index: number,
    state?: AppStoreModel
) {
    let trackid = state.playlist.currentTracks[index].id;
    let playlistIndex = state.playlist.playlists.findIndex(
        x => x.id === state.playlist.currentPlaylist.id
    );
    // prettier-ignore
    let trackIndex = state.playlist.playlists[playlistIndex].tracks.findIndex(x => x === trackid);

    let db = new PlaylistsDatabase('playlists');
    let tracks = [...state.playlist.playlists[playlistIndex].tracks];
    tracks.splice(trackIndex, 1);
    await db.playlists.update(state.playlist.currentPlaylist.id, {
        tracks,
    });
    db.close();

    Notifications.addNotification(
        'removeSong',
        `Removed Song from the Playlist`,
        true
    );

    return produce(state, draft => {
        draft.playlist.playlists[playlistIndex].tracks.splice(trackIndex, 1);

        draft.playlist.currentTracks.splice(index, 1);
    });
}
