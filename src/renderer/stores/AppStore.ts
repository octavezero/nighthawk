import { Container } from 'unstated';
import { List } from 'immutable';
import { AppStoreModel } from './AppStoreModel';

import * as SettingsActions from '../actions/SettingsActions';
import * as LibraryActions from '../actions/LibraryActions';

export default class AppStore extends Container<AppStoreModel> {
    state: AppStoreModel = {
        settings: SettingsActions.getSettings(),
        library: List(),
    };

    pathActions = (action: SettingsActions.SettingsActionType) => {
        this.setState({
            settings: SettingsActions.saveSettings(action, this.state),
        });
    };

    initLibrary = async () => {
        this.setState({
            library: await LibraryActions.getLibrary(),
        });
    };

    refreshLibrary = async () => {
        this.setState({
            library: await LibraryActions.refreshLibrary(this.state),
        });
    };
}
