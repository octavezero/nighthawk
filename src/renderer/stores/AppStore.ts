import { AppStoreModel } from './AppStoreModel';

import * as SettingsActions from '../actions/SettingsActions';
import * as LibraryActions from '../actions/LibraryActions';
import * as PlayerActions from '../actions/PlayerActions';

export interface ActionsModel {
    settings: typeof SettingsActions;
    library: typeof LibraryActions;
    player: typeof PlayerActions;
}

export default interface AppStore extends ActionsModel {
    state: AppStoreModel;
};
