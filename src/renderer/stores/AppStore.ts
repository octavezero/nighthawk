import { AppStoreModel } from './AppStoreModel';

import * as SettingsActions from '../actions/SettingsActions';
import * as LibraryActions from '../actions/LibraryActions';
import * as PlayerActions from '../actions/PlayerActions';

export default interface AppStore {
    state: AppStoreModel;
    settingsActions: (action: SettingsActions.SettingsActionType) => void;
    initLibrary: () => void;
    refreshLibrary: () => void;
    createPlayerQueue: (index: number) => void;
    playerActions: (action: PlayerActions.PlayerActionType) => void;
};
