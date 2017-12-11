import PlayerControls from '../components/player/PlayerControls';
import SongDetails from '../components/player/SongDetails';
import * as React from 'react';

export interface PlayerProps {
}

export interface PlayerState {
}

export default class Player extends React.Component<PlayerProps, PlayerState> {
	constructor(props: PlayerProps) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div className='player'>
				<SongDetails />
				<PlayerControls />
			</div>
		);
	}
}
