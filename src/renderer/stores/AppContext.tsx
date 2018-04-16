import * as React from 'react';
import { List } from 'immutable';
import { AppStoreModel } from './AppStoreModel';

import * as SettingsActions from '../actions/SettingsActions';
import * as LibraryActions from '../actions/LibraryActions';
import * as PlayerActions from '../actions/PlayerActions';
import AppStore from './AppStore';

const storeContext = React.createContext<AppStore>();
// tslint:disable-next-line:variable-name
export const AppStoreConsumer = storeContext.Consumer;

export class AppStoreProvider extends React.Component<any, AppStoreModel> {
    constructor(props: any) {
        super(props);

        this.state = {
            settings: SettingsActions.getSettings(),
            library: List(),
            player: {
                cursor: -2,
                queue: List(),
                originalQueue: List(),
                playing: false,
            },
        };
    }

    settingsActions = (action: SettingsActions.SettingsActionType) => {
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

    render() {
        return (
            <storeContext.Provider
                value={{
                    state: this.state,
                    settingsActions: this.settingsActions,
                    initLibrary: this.initLibrary,
                    createPlayerQueue: this.createPlayerQueue,
                    playerActions: this.playerActions,
                    refreshLibrary: this.refreshLibrary,
                }}>
                {this.props.children}
            </storeContext.Provider>
        );
    }
}
