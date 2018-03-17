import { Container } from 'unstated';
import { AppStoreModel } from './AppStoreModel';

import * as SettingsActions from '../actions/SettingsActions';

export default class AppStore extends Container<AppStoreModel> {
    state: AppStoreModel = {
        settings: SettingsActions.getSettings(),
    };

    pathActions = (action: SettingsActions.SettingsActionType) => {
        this.setState({
            settings: SettingsActions.saveSettings(action, this.state),
        });
    };
}
