import * as React from 'react';
import SidePanel from '../components/playlist/SidePanel';
import Tracks from '../components/playlist/Tracks';

export interface PlaylistContainerProps {}

export default class PlaylistContainer extends React.Component<
    PlaylistContainerProps,
    any
> {
    constructor(props: PlaylistContainerProps) {
        super(props);
    }

    render() {
        return (
            <div className="playlist">
                <SidePanel />
                <Tracks />
            </div>
        );
    }
}
