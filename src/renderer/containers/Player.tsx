import PlayerControls from '../components/player/PlayerControls';
import SongDetails from '../components/player/SongDetails';
import * as React from 'react';
import TrackModel from '../models/TrackModel';
import { playerDispatcher } from '../dispatchers/playerDispatcher';

export interface PlayerProps {
}

export interface PlayerState {
	queue: TrackModel[];
	queueCursor: number;
	currentTrack: TrackModel | undefined;
}

/**
 * This is the container class for the Actual Player.
 * This Class is responsible for managing the queue.
 * @export
 * @class Player
 * @extends {React.Component<PlayerProps, PlayerState>}
 */
export default class Player extends React.Component<PlayerProps, PlayerState> {

	constructor(props: PlayerProps) {
		super(props);

		this.state = {
			queue: [],
			queueCursor: -2,
			currentTrack: undefined
		};
	}

	/*
		The Queue Control Functions
	*/
	refreshQueue = (queue: TrackModel[], playIndex: number) => {
		//TODO: Implement Current Track Logic.
		this.setState({ queue: queue, queueCursor: playIndex, currentTrack: queue[playIndex] });
	}

	nextTrack = () => {
		if (this.state.currentTrack == undefined) {
			return;
		}

		let cursor: number = this.state.queueCursor + 1;
		if (cursor === this.state.queue.length) {
			//start queue from beginning
			cursor = 0;
		}
		this.setState({ currentTrack: this.state.queue[cursor], queueCursor: cursor });
	}

	prevTrack = () => {
		if (this.state.currentTrack == undefined) {
			return;
		}

		let cursor: number = this.state.queueCursor - 1;
		if (cursor === -1) {
			//start queue from end
			cursor = this.state.queue.length - 1;
		}
		this.setState({ currentTrack: this.state.queue[cursor], queueCursor: cursor });
	}

	/*
		Events are Added and Removed Here
	*/
	componentDidMount() {
		playerDispatcher.addListener('REFRESH_QUEUE', this.refreshQueue);
	}

	componentWillUnmount() {
		playerDispatcher.removeListener('REFRESH_QUEUE', this.refreshQueue);
	}

	render() {
		let details: any;
		if (this.state.currentTrack !== undefined) {
			details =
				<SongDetails
					title={this.state.currentTrack.common.title}
					artist={this.state.currentTrack.common.artist}
					album={this.state.currentTrack.common.album}
				/>;
		} else {
			details = <SongDetails />;
		}
		return (
			<div className='player'>
				{details}
				<PlayerControls
					currentTrack={this.state.currentTrack !== undefined ? this.state.currentTrack : undefined}
					nextTrack={this.nextTrack}
					prevTrack={this.prevTrack}
				/>
			</div>
		);
	}
}
