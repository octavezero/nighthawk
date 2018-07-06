import * as React from 'react';
import { AppStoreModel } from './AppStoreModel';

import * as InitActions from '../actions/InitActions';
import * as SettingsActions from '../actions/SettingsActions';
import * as LibraryActions from '../actions/LibraryActions';
import * as PlayerActions from '../actions/PlayerActions';
import * as SearchActions from '../actions/SearchActions';
import * as PlaylistActions from '../actions/PlaylistActions';
import AppStore, { ActionsModel } from './AppStore';
import Player from '../libraries/Player';

const defaultValue: AppStore = {
    state: {
        settings: SettingsActions.getSettings(),
        originalLibrary: [],
        library: [],
        player: {
            cursor: -2,
            queue: [],
            originalQueue: [],
            playing: false,
        },
        playlist: {
            currentId: 0,
            currentName: 'none',
            currentTracks: [],
            playlists: [],
        },
    },
    init: null,
    settings: null,
    library: null,
    player: null,
    search: null,
    playlist: null,
};

const storeContext = React.createContext<AppStore>(defaultValue);
// tslint:disable-next-line:variable-name
export const AppStoreConsumer = storeContext.Consumer;

export class AppStoreProvider extends React.Component<any, AppStoreModel> {
    actions: ActionsModel;

    constructor(props: any) {
        super(props);

        this.state = defaultValue.state;
        Player.player.muted = defaultValue.state.settings.player.mute;
        Player.setVolume(defaultValue.state.settings.player.volume);

        this.actions = {
            init: null,
            settings: null,
            library: null,
            player: null,
            search: null,
            playlist: null,
        };
        this.wrapActions();
    }

    wrapActions = () => {
        // Wrap init actions
        const initActions: any = { ...InitActions };
        for (const key in initActions) {
            if (initActions.hasOwnProperty(key)) {
                initActions[key] = this.wrap(initActions[key]);
            }
        }
        this.actions.init = initActions;

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

        const playlistActions: any = { ...PlaylistActions };
        for (const key in playlistActions) {
            if (playlistActions.hasOwnProperty(key)) {
                playlistActions[key] = this.wrap(playlistActions[key]);
            }
        }

        this.actions.playlist = playlistActions;
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
                    init: this.actions.init,
                    settings: this.actions.settings,
                    player: this.actions.player,
                    library: this.actions.library,
                    search: this.actions.search,
                    playlist: this.actions.playlist,
                }}>
                {this.props.children}
            </storeContext.Provider>
        );
    }
}
