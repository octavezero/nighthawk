import * as React from 'react';
import { AppStoreConsumer } from '../../stores/AppContext';

interface SidePanelProps {}

interface SidePanelState {}

export default class SidePanel extends React.Component<
    SidePanelProps,
    SidePanelState
> {
    render() {
        return (
            <AppStoreConsumer>
                {store => (
                    <div className="details">
                        <div className="panel">
                            <h6>Playlists</h6>
                        </div>
                        <div className="list">
                            {store.state.playlist.playlists.map(
                                (obj, index) => (
                                    <div
                                        onClick={() =>
                                            store.playlist.changeActivePlaylist(
                                                index
                                            )
                                        }
                                        key={index}
                                        className={
                                            index ===
                                            store.state.playlist.currentId
                                                ? 'list-row current'
                                                : 'list-row'
                                        }>
                                        <p>{obj.name}</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
            </AppStoreConsumer>
        );
    }
}
