import PlayerControls from '../components/player/PlayerControls';
import SongDetails from '../components/player/SongDetails';
import * as React from 'react';
import TrackModel from '../models/TrackModel';
import { playerDispatcher } from '../dispatchers/playerDispatcher';
import { List } from 'immutable';
import * as QueueUtils from '../utilities/QueueUtils';
import Search from '../components/player/Search';
import QueueManager from '../components/player/QueueManager';

export interface PlayerProps {
}

export interface PlayerState {
	originalQueue: List<TrackModel>;
	queue: List<TrackModel>;
	queueCursor: number;
	currentTrack: TrackModel | undefined;
	isShuffleEnabled: boolean;
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
			originalQueue: List(),
			queue: List(),
			queueCursor: -2,
			currentTrack: undefined,
			isShuffleEnabled: false
		};
	}

	/*
		The Queue Control Functions
	*/
	refreshQueue = (queue: List<TrackModel>, playIndex: number = 0) => {
		//TODO: Implement Current Track Logic.
		if (this.state.isShuffleEnabled) {
			this.shuffleQueue(queue, playIndex, true);
		} else {
			this.setState({ queue: queue, queueCursor: playIndex, currentTrack: queue.get(playIndex) });
		}
		this.setState({ originalQueue: queue });
	}

	deleteFromQueue = (index: number) => {
		//TODO: write code that removes song from original list also
		if (index == this.state.queueCursor) {
			this.nextTrack();
			this.setState({queue: this.state.queue.remove(index), queueCursor: index});
		} else {
			this.setState({queue: this.state.queue.remove(index)});
		}
	}

	clearQueue = () => {
		this.setState({
			queue: this.state.originalQueue.clear(),
			originalQueue: this.state.originalQueue.clear(),
			queueCursor: -2,
			currentTrack: undefined
		});
	}

	nextTrack = () => {
		if (this.state.currentTrack == undefined) {
			return;
		}

		let cursor: number = this.state.queueCursor + 1;
		if (cursor === this.state.queue.count()) {
			//start queue from beginning
			cursor = 0;
		}
		this.setState({ currentTrack: this.state.queue.get(cursor), queueCursor: cursor });
	}

	prevTrack = () => {
		if (this.state.currentTrack == undefined) {
			return;
		}

		let cursor: number = this.state.queueCursor - 1;
		if (cursor === -1) {
			//start queue from end
			cursor = this.state.queue.count() - 1;
		}
		this.setState({ currentTrack: this.state.queue.get(cursor), queueCursor: cursor });
	}

	shuffleQueue = (queue: List<TrackModel>, playIndex: number = 0, initial: boolean = false) => {
		//Shuffles Code here. Use Fisher-Yates Shuffle Algorithm.
		let trackid = initial ? queue.get(playIndex)!.id : this.state.currentTrack!.id;

		let shuffledQueue = QueueUtils.shuffleList(queue);
		let newIndex = shuffledQueue.findIndex(i => i.id === trackid);

		if (initial) {
			this.setState({ queue: shuffledQueue, queueCursor: newIndex, currentTrack: shuffledQueue.get(newIndex) });
		} else {
			this.setState({ queue: shuffledQueue, queueCursor: newIndex });
		}
	}

	toggleShuffleState = () => {
		if (this.state.currentTrack === undefined) {
			this.setState({isShuffleEnabled: !this.state.isShuffleEnabled});
			return;
		}
		if (this.state.isShuffleEnabled) {
			let trackid = this.state.currentTrack!.id;
			let newIndex = this.state.originalQueue.findIndex(i => i.id === trackid);
			this.setState({isShuffleEnabled: false, queue: this.state.originalQueue, queueCursor: newIndex });
		} else {
			this.shuffleQueue(this.state.queue, this.state.queueCursor);
			this.setState({isShuffleEnabled: true});
		}
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
				<QueueManager queue={this.state.queue} index={this.state.queueCursor} clearQueue={this.clearQueue} deleteFromQueue={this.deleteFromQueue}/>
				<Search />
				<PlayerControls
					currentTrack={this.state.currentTrack !== undefined ? this.state.currentTrack : undefined}
					nextTrack={this.nextTrack}
					prevTrack={this.prevTrack}
					toggleShuffleState={this.toggleShuffleState}
				/>
			</div>
		);
	}
}
