import * as React from 'react';

export interface SongDetailsProps {
	title?: string;
	artist?: string;
	album?: string;
}

export default class SongDetails extends React.Component<SongDetailsProps, any> {
	public static defaultProps: Partial<SongDetailsProps> = {
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
