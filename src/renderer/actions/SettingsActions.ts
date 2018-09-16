import electronStore from 'electron-store';
// tslint:disable-next-line:import-name
import produce from 'immer';
import { SettingsStoreModel, AppStoreModel } from '../stores/AppStoreModel';
import { remote, ipcRenderer } from 'electron';
const { dialog } = remote;

export function getSettings(): SettingsStoreModel {
    const store = new electronStore<SettingsStoreModel>({
        name: 'settings',
        defaults: {
            library: {
                path: '',
                sortBy: 'artist',
                sortDirection: 'ASC',
            },
            player: {
                shuffle: false,
                repeat: false,
                volume: 1.0,
                mute: false,
            },
            system: {
                unobtrusive: true,
            },
            playlist: {
                folder: true,
            },
        },
    });
    return store.store;
}

export async function setLibraryPath(
    state?: AppStoreModel
): Promise<AppStoreModel> {
    // Force the window to remain on top to work correctly when
    // the dialog is open
    ipcRenderer.send('SET_DIALOG_SHOW', true);
    return produce<AppStoreModel>(state, draft => {
        const store = new electronStore<SettingsStoreModel>({
            name: 'settings',
        });
        const path = dialog.showOpenDialog({
            title: 'Select Music Library Folder',
            properties: ['openDirectory'],
        });

        // Allow the window to be hidden after dialog close
        ipcRenderer.send('SET_DIALOG_SHOW', false);

        if (path !== undefined) {
            draft.settings.library.path = path[0];
            store.store = draft.settings;
        }
    });
}

export async function setShuffleMode(
    state?: AppStoreModel
): Promise<AppStoreModel> {
    return produce<AppStoreModel>(state, draft => {
        const store = new electronStore<SettingsStoreModel>({
            name: 'settings',
        });
        draft.settings.player.shuffle = !draft.settings.player.shuffle;
        store.store = draft.settings;
    });
}

export async function setRepeatMode(
    state?: AppStoreModel
): Promise<AppStoreModel> {
    return produce<AppStoreModel>(state, draft => {
        const store = new electronStore<SettingsStoreModel>({
            name: 'settings',
        });
        draft.settings.player.repeat = !draft.settings.player.repeat;
        store.store = draft.settings;
    });
}

export async function setLibrarySort(
    sortBy: string,
    sortDirection: 'ASC' | 'DESC',
    state?: AppStoreModel
): Promise<AppStoreModel> {
    return produce<AppStoreModel>(state, draft => {
        const store = new electronStore<SettingsStoreModel>({
            name: 'settings',
        });
        draft.settings.library.sortBy = sortBy;
        draft.settings.library.sortDirection = sortDirection;
        store.store = draft.settings;
    });
}

export async function setVolume(
    volume: number,
    state?: AppStoreModel
): Promise<AppStoreModel> {
    return produce<AppStoreModel>(state, draft => {
        const store = new electronStore<SettingsStoreModel>({
            name: 'settings',
        });
        draft.settings.player.volume = volume;
        store.store = draft.settings;
    });
}

export async function setMute(
    value: boolean,
    state?: AppStoreModel
): Promise<AppStoreModel> {
    return produce<AppStoreModel>(state, draft => {
        const store = new electronStore<SettingsStoreModel>({
            name: 'settings',
        });
        draft.settings.player.mute = value;
        store.store = draft.settings;
    });
}

export async function setUnobtrusiveMode(
    value: boolean,
    state?: AppStoreModel
): Promise<AppStoreModel> {
    return produce<AppStoreModel>(state, draft => {
        const store = new electronStore<SettingsStoreModel>({
            name: 'settings',
        });
        draft.settings.system.unobtrusive = value;
        store.store = draft.settings;
    });
}

export async function setFolderPlaylistMode(
    value: boolean,
    state?: AppStoreModel
): Promise<AppStoreModel> {
    return produce<AppStoreModel>(state, draft => {
        const store = new electronStore<SettingsStoreModel>({
            name: 'settings',
        });
        draft.settings.playlist.folder = value;
        store.store = draft.settings;
    });
}
