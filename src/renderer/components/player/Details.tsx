import * as React from 'react';

import * as defaultAlbumArt from '../../../../static/vectors/defaultAlbumArt.svg';
import AppStore from '../../stores/AppStore';
import { IAudioMetadata, parseFile, IPicture } from 'music-metadata/lib';

export interface DetailsProps {
    store: AppStore;
}

interface DetailsState {
    albumart: string;
}

export default class Details extends React.Component<
    DetailsProps,
    DetailsState
> {
    constructor(props: DetailsProps) {
        super(props);

        this.state = {
            albumart: defaultAlbumArt,
        };
    }

    fetchAlbumArt = async (path: string) => {
        let model: IAudioMetadata = await parseFile(path, {
            mergeTagHeaders: true,
        });
        let img: IPicture[] | undefined = model.common.picture;
        if (img !== undefined) {
            let imgURL = window.URL.createObjectURL(
                new Blob([img[0].data], { type: 'image/' + img[0].format })
            );
            this.setState({ albumart: imgURL });
        } else {
            this.setState({ albumart: defaultAlbumArt });
        }
    };

    componentDidUpdate(prevProps: DetailsProps, prevState: DetailsState) {
        const { cursor, queue } = this.props.store.state.player;
        if (cursor !== prevProps.store.state.player.cursor) {
            if (cursor === -2) {
                this.setState({ albumart: defaultAlbumArt });
                return;
            }
            this.fetchAlbumArt(queue[cursor].source);
        }
    }

    render() {
        const { cursor, queue } = this.props.store.state.player;
        const track = queue[cursor];
        return (
            <>
                <img className="image" src={this.state.albumart} />
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
