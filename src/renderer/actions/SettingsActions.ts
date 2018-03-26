import electronStore from 'electron-store';
import * as seamlessImmutable from 'seamless-immutable';
import { SettingsStoreModel, AppStoreModel } from '../stores/AppStoreModel';
import { remote } from 'electron';
const { dialog } = remote;

export enum SettingsActionEnum {
    SET_LIBRARY_PATH,
    SET_SHUFFLE_MODE,
}

export interface SettingsActionType {
    type: SettingsActionEnum;
    data?: any;
}

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
                repeat: true,
            },
        },
    });
    return seamlessImmutable<SettingsStoreModel>(store.store);
}

export function saveSettings(action: SettingsActionType, state: AppStoreModel) {
    const store = new electronStore<SettingsStoreModel>({ name: 'settings' });
    let data: SettingsStoreModel;
    switch (action.type) {
        case SettingsActionEnum.SET_LIBRARY_PATH:
            const path = dialog.showOpenDialog({
                title: 'Select Music Library Folder',
                properties: ['openDirectory'],
            });
            if (path === undefined) return state.settings;
            data = seamlessImmutable(state.settings).setIn(
                ['library', 'path'],
                path[0]
            );
            store.store = data;
            return data;

        case SettingsActionEnum.SET_SHUFFLE_MODE:
            data = seamlessImmutable(state.settings).setIn(
                ['player', 'shuffle'],
                !state.settings.player.shuffle
            );
            store.store = data;
            return data;
    }
}
