import * as React from 'react';
import AppStore from '../../stores/AppStore';
import { Checkbox } from '../elements/Checkbox';

export interface PlaylistSettingsProps {
    store: AppStore;
}

export interface PlaylistSettingsState {}

export default class PlaylistSettings extends React.Component<
    PlaylistSettingsProps,
    PlaylistSettingsState
> {
    constructor(props: PlaylistSettingsProps) {
        super(props);
    }

    handleFolderPlaylists = (checked: boolean) => {
        this.props.store.settings.setFolderPlaylistMode(checked);
    };

    render() {
        const { store } = this.props;
        return (
            <div className="playlist-settings">
                <Checkbox
                    handleCheckedState={this.handleFolderPlaylists}
                    checked={store.state.settings.playlist.folder}
                    value="Enable Folder-Based Playlists"
                />
            </div>
        );
    }
}
