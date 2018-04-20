import electronStore from 'electron-store';
// tslint:disable-next-line:import-name
import produce from 'immer';
import { SettingsStoreModel, AppStoreModel } from '../stores/AppStoreModel';
import { remote } from 'electron';
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
            },
        },
    });
    return store.store;
}

export async function setLibraryPath(
    state?: AppStoreModel
): Promise<AppStoreModel> {
    return produce<AppStoreModel>(state, draft => {
        const store = new electronStore<SettingsStoreModel>({
            name: 'settings',
        });
        const path = dialog.showOpenDialog({
            title: 'Select Music Library Folder',
            properties: ['openDirectory'],
        });
        if (path === undefined) return draft;
        draft.settings.library.path = path[0];
        store.store = draft.settings;
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
