import * as React from 'react';
import { AppStoreConsumer } from '../../stores/AppContext';

interface AddTrackProps {
    trackId: number;
}

interface AddTrackState {}

export default class AddTrack extends React.Component<
    AddTrackProps,
    AddTrackState
> {
    render() {
        return (
            <AppStoreConsumer>
                {store => (
                    <div className="add-list">
                        {store.state.playlist.playlists.map((obj, index) => {
                            if (obj.type === 'normal') {
                                return (
                                    <div
                                        key={index}
                                        className="list-row"
                                        onClick={() =>
                                            store.playlist.addTrackPlaylist(
                                                index,
                                                this.props.trackId
                                            )
                                        }>
                                        <p>{obj.name}</p>
                                    </div>
                                );
                            }
                        })}
                    </div>
                )}
            </AppStoreConsumer>
        );
    }
}
