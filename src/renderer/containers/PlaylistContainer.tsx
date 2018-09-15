import * as React from 'react';
import SidePanel from '../components/playlist/SidePanel';
import Tracks from '../components/playlist/Tracks';
import { AppStoreConsumer } from '../stores/AppContext';

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
            <AppStoreConsumer>
                {store => (
                    <div className="playlist">
                        <SidePanel store={store} />
                        <Tracks store={store} />
                    </div>
                )}
            </AppStoreConsumer>
        );
    }
}
