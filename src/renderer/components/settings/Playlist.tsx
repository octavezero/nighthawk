import * as React from 'react';
import AppStore from '../../stores/AppStore';

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

    render() {
        const { store } = this.props;
        return (
            <div className="playlist-settings">
            </div>
        );
    }
}
