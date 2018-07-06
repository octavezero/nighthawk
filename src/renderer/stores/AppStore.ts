import { AppStoreModel } from './AppStoreModel';

import * as SettingsActions from '../actions/SettingsActions';
import * as LibraryActions from '../actions/LibraryActions';
import * as PlayerActions from '../actions/PlayerActions';
import * as SearchActions from '../actions/SearchActions';
import * as InitActions from '../actions/InitActions';
import * as PlaylistActions from '../actions/PlaylistActions';

export interface ActionsModel {
    init: typeof InitActions;
    settings: typeof SettingsActions;
    library: typeof LibraryActions;
    player: typeof PlayerActions;
    search: typeof SearchActions;
    playlist: typeof PlaylistActions;
}

export default interface AppStore extends ActionsModel {
    state: AppStoreModel;
}
