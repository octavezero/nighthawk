import * as React from 'react';
import { AppStoreModel } from './AppStoreModel';

import * as SettingsActions from '../actions/SettingsActions';
import * as LibraryActions from '../actions/LibraryActions';
import * as PlayerActions from '../actions/PlayerActions';
import * as SearchActions from '../actions/SearchActions';
import AppStore, { ActionsModel } from './AppStore';

const storeContext = React.createContext<AppStore>();
// tslint:disable-next-line:variable-name
export const AppStoreConsumer = storeContext.Consumer;

export class AppStoreProvider extends React.Component<any, AppStoreModel> {
    actions: ActionsModel;

    constructor(props: any) {
        super(props);

        this.state = {
            settings: SettingsActions.getSettings(),
            originalLibrary: [],
            library: [],
            player: {
                cursor: -2,
                queue: [],
                originalQueue: [],
                playing: false,
            },
        };

        this.actions = {
            settings: null,
            library: null,
            player: null,
            search: null,
        };
        this.wrapActions();
    }

    wrapActions = () => {
        // Wrap Settings Actions
        const settingsActions: any = { ...SettingsActions };
        for (const key in settingsActions) {
            if (settingsActions.hasOwnProperty(key)) {
                settingsActions[key] = this.wrap(settingsActions[key]);
            }
        }

        this.actions.settings = settingsActions;

        // Wrap Library Actions
        const libraryActions: any = { ...LibraryActions };
        for (const key in libraryActions) {
            if (libraryActions.hasOwnProperty(key)) {
                libraryActions[key] = this.wrap(libraryActions[key]);
            }
        }

        this.actions.library = libraryActions;

        // Wrap Player Actions
        const playerActions: any = { ...PlayerActions };
        for (const key in playerActions) {
            if (playerActions.hasOwnProperty(key)) {
                playerActions[key] = this.wrap(playerActions[key]);
            }
        }

        this.actions.player = playerActions;

        const searchActions: any = { ...SearchActions };
        for (const key in searchActions) {
            if (searchActions.hasOwnProperty(key)) {
                searchActions[key] = this.wrap(searchActions[key]);
            }
        }

        this.actions.search = searchActions;
    };

    wrap = <T extends (...args: any[]) => any>(fn: T): T => {
        return (async (...args: any[]) => {
            this.setState(await fn(...args, this.state));
        }) as T;
    };

    render() {
        return (
            <storeContext.Provider
                value={{
                    state: this.state,
                    settings: this.actions.settings,
                    player: this.actions.player,
                    library: this.actions.library,
                    search: this.actions.search,
                }}>
                {this.props.children}
            </storeContext.Provider>
        );
    }
}
