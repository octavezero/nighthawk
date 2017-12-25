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
					<h4 className='text-element'>{this.props.title}</h4>
					<h6 className='text-element'> by </h6>
					<h5 className='text-element'>{this.props.artist}</h5>
					<h6 className='text-element'> on </h6>
					<h5 className='text-element'>{this.props.album}</h5>
				</div>
			</>
		);
	}
}
