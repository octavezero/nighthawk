import * as React from 'react';

import * as defaultAlbumArt from '../../../../static/vectors/defaultAlbumArt.svg';
import AppStore from '../../stores/AppStore';

export interface DetailsProps {
    store: AppStore;
}

export default class Details extends React.Component<DetailsProps, any> {
    constructor(props: DetailsProps) {
        super(props);
    }

    render() {
        const { cursor, queue } = this.props.store.state.player;
        const track = queue.get(cursor);
        return (
            <>
                <img className="image" src={defaultAlbumArt} />
                <div className="details">
                    <h2>{track ? track.common.title : 'Untitled'}</h2>
                    <h5>on</h5>
                    <h4>{track ? track.common.album : 'Untitled'}</h4>
                    <h5>by</h5>
                    <h4>{track ? track.common.artist : 'Untitled'}</h4>
                </div>
            </>
        );
    }
}
