import * as React from 'react';

import * as defaultAlbumArt from '../../../../static/vectors/defaultAlbumArt.svg';

export interface DetailsProps {}

export default class Details extends React.Component<DetailsProps, any> {
    constructor(props: DetailsProps) {
        super(props);
    }

    render() {
        return (
            <>
                <img className="image" src={defaultAlbumArt} />
                <div className="details">
                    <h2>Title</h2>
                    <h5>on</h5>
                    <h4>Artist</h4>
                    <h5>by</h5>
                    <h4>Album</h4>
                </div>
            </>
        );
    }
}
