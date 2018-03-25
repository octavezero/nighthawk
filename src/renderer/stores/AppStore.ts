import { Container } from 'unstated';
import { List } from 'immutable';
import { AppStoreModel } from './AppStoreModel';

import * as SettingsActions from '../actions/SettingsActions';
import * as LibraryActions from '../actions/LibraryActions';
import * as PlayerActions from '../actions/PlayerActions';

export default class AppStore extends Container<AppStoreModel> {
    state: AppStoreModel = {
        settings: SettingsActions.getSettings(),
        library: List(),
        player: {
            cursor: -2,
            queue: List(),
            playing: false,
        },
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

    createPlayerQueue = async (index: number) => {
        this.setState({
            player: PlayerActions.createPlayerQueue(index, this.state),
        });
    };

    playerActions = (action: PlayerActions.PlayerActionType) => {
        this.setState({
            player: Object.assign(
                {},
                this.state.player,
                PlayerActions.playerControls(action, this.state)
            ),
        });
    };
}
