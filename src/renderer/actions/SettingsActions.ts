import electronStore from 'electron-store';
import * as seamlessImmutable from 'seamless-immutable';
import { SettingsStoreModel, AppStoreModel } from '../stores/AppStoreModel';
import { remote } from 'electron';
const { dialog } = remote;

export enum SettingsActionEnum {
    SET_LIBRARY_PATH,
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
        },
    });
    return seamlessImmutable<SettingsStoreModel>(store.store);
}

export function saveSettings(action: SettingsActionType, state: AppStoreModel) {
    const store = new electronStore<SettingsStoreModel>({ name: 'settings' });

    switch (action.type) {
        case SettingsActionEnum.SET_LIBRARY_PATH:
            const path = dialog.showOpenDialog({
                title: 'Select Music Library Folder',
                properties: ['openDirectory'],
            });
            if (path === undefined) return state.settings;
            const data = seamlessImmutable(state.settings).setIn(
                ['library', 'path'],
                path[0]
            );
            store.store = data;
            return data;
    }
}
