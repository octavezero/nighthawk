import * as React from 'react';

import * as defaultAlbumArt from '../../../../static/vectors/defaultAlbumArt.svg';

export interface SongDetailsProps {
	albumart?: string;
	title?: string;
	artist?: string;
	album?: string;
}

export default class SongDetails extends React.Component<SongDetailsProps, any> {
	public static defaultProps: Partial<SongDetailsProps> = {
		albumart: defaultAlbumArt,
		title: 'Untitled Song',
		artist: 'Unknown Artist',
		album: 'Untitled Album'
	};
	constructor(props: SongDetailsProps) {
		super(props);
	}

	render() {
		return (
			<>
				<div className='player-art'>
					<img className='album-art' src={this.props.albumart} />
				</div>
				<div className='player-details'>
					<h3 className='text-element'>{this.props.title}</h3>
					<h5 className='text-element'>{this.props.album}</h5>
					<h5 className='text-element'>{this.props.artist}</h5>
				</div>
			</>
		);
	}
}
