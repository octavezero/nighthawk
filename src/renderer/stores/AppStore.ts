import { AppStoreModel } from './AppStoreModel';

import * as SettingsActions from '../actions/SettingsActions';
import * as LibraryActions from '../actions/LibraryActions';
import * as PlayerActions from '../actions/PlayerActions';
import * as SearchActions from '../actions/SearchActions';

export interface ActionsModel {
    settings: typeof SettingsActions;
    library: typeof LibraryActions;
    player: typeof PlayerActions;
    search: typeof SearchActions;
}

export default interface AppStore extends ActionsModel {
    state: AppStoreModel;
};
