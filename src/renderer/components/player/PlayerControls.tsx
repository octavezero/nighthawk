import * as React from 'react';
import { ButtonGroup } from '../common/ButtonGroup';
import { Button } from '../common/Button';
import Slider from '../common/Slider';
import { Icon } from '../common/Icon';
import TrackModel from '../../models/TrackModel';

import * as TimeUtils from '../../utilities/TimeUtils';

export interface PlayerControlsProps {
	readonly nextTrack: () => void;
	readonly prevTrack: () => void;
	currentTrack: TrackModel | undefined;
}

export interface PlayerControlsState {
	isPlaying: boolean;
	playButtonIcon: string;
	currentSongDuration: number;
	isMuted: boolean;
	muteButtonIcon: string;
	currentVolume: number;
	repeatMode: 'repeat' | 'repeat-once';
}

/**
 * This Class contains the player element and functions to manage it.
 * Queue actions are bubbled up.
 * @export
 * @class PlayerControls
 * @extends {React.Component<PlayerControlsProps, PlayerControlsState>}
 */
export default class PlayerControls extends React.Component<PlayerControlsProps, PlayerControlsState> {
	static audio: HTMLAudioElement = new Audio();

	constructor(props: PlayerControlsProps) {
		super(props);

		this.state = {
			isPlaying: false,
			playButtonIcon: 'play',
			currentSongDuration: 0,
			isMuted: false,
			muteButtonIcon: 'volume-high',
			currentVolume: 10,
			repeatMode: 'repeat'
		};
	}

	/*
		Player Event Functions
	*/
	onPlayerTimeUpdate = () => {
		this.setState({ currentSongDuration: Math.floor(PlayerControls.audio.currentTime) });
	}

	onPlayerEnded = () => {
		this.handleSkipNext();
	}

	/*
		Player State handling Functions
	*/
	handleSkipPrevious = () => {
		if (this.state.repeatMode === 'repeat-once') {
			this.replayAudio();
			return;
		}

		//Sets audio duration threshhold. If current duration is less than 15 sec, repeat song.
		this.state.currentSongDuration < 15 ? this.props.prevTrack() : this.replayAudio();
	}

	handleSkipNext = () => {
		if (this.state.repeatMode === 'repeat-once') {
			this.replayAudio();
			return;
		}

		this.props.nextTrack();
	}

	handleTogglePlay = () => {
		if (this.props.currentTrack !== undefined) {
			this.state.isPlaying === true ? this.pauseAudio() : this.playAudio();
		}
	}

	handlePlayerSliderChange = (value: number) => {
		PlayerControls.audio.currentTime = value;
	}

	/*
		Volume State handling Functions
	*/
	handleVolumeSliderChange = (value: number) => {
		PlayerControls.audio.volume = (value / 10);
		this.setState({currentVolume: value});
	}

	/*
		Volume Attribute handling Functions
	*/
	muteAudio = () => {
		PlayerControls.audio.muted = true;
		this.setState({isMuted: true, muteButtonIcon: 'volume-off'});
	}

	handleToggleMute = () => {
		this.state.isMuted === true ? this.unmuteAudio() : this.muteAudio();
	}

	/*
		Volume State handling Functions
	*/
	unmuteAudio = () => {
		PlayerControls.audio.muted = false;
		this.setState({isMuted: false, muteButtonIcon: 'volume-high'});
	}

	replayAudio = () => {
		PlayerControls.audio.load();
		this.playAudio();
	}

	playAudio = () => {
		PlayerControls.audio.play();
		this.setState({isPlaying: true, playButtonIcon: 'pause'});
	}

	pauseAudio = () => {
		PlayerControls.audio.pause();
		this.setState({isPlaying: false, playButtonIcon: 'play'});
	}

	/*
		Seek and Repeat Handler Functions
	*/
	toggleRepeatMode = () => {
		this.setState({ repeatMode: this.state.repeatMode === 'repeat' ? 'repeat-once' : 'repeat' });
	}

	/*
		The React Lifecycle Functions
	*/
	componentWillReceiveProps(nextProps: PlayerControlsProps) {
		if (Object.is(this.props.currentTrack, nextProps.currentTrack) || nextProps.currentTrack == undefined) {
			this.pauseAudio();
			return;
		}

		// Track Replaced here with new track
		PlayerControls.audio.src = nextProps.currentTrack.source;
		this.replayAudio();
	}

	componentDidMount() {
		PlayerControls.audio.addEventListener('timeupdate', this.onPlayerTimeUpdate);
		PlayerControls.audio.addEventListener('ended', this.onPlayerEnded);
	}

	componentWillUnmount() {
		PlayerControls.audio.pause();

		PlayerControls.audio.removeEventListener('timeupdate', this.onPlayerTimeUpdate);
		PlayerControls.audio.removeEventListener('ended', this.onPlayerEnded);
	}

	render() {

		let duration: number;

		if (this.props.currentTrack == undefined) {
			duration = 0;
		} else if (this.props.currentTrack.format.duration == undefined) {
			duration = 0;
		} else {
			duration = this.props.currentTrack.format.duration;
		}

		return (
			<div className='player-controls'>
				<ButtonGroup>
					<Button type='default' icon={true} onClick={this.handleSkipPrevious}>
						<Icon size='21' icon='skip-previous' />
					</Button>
					<Button type='default' icon={true} onClick={this.handleTogglePlay}>
						<Icon size='21' icon={this.state.playButtonIcon} />
					</Button>
					<Button type='default' icon={true} onClick={this.handleSkipNext}>
						<Icon size='21' icon='skip-next' />
					</Button>
				</ButtonGroup>

				<div className='seekbar'>
					<span>{TimeUtils.parseToMinutes(this.state.currentSongDuration)}</span>
					<Slider
						min={0} max={duration} value={this.state.currentSongDuration}
						onChange={this.handlePlayerSliderChange}
					/>
					<span>{TimeUtils.parseToMinutes(duration)}</span>
				</div>

				<ButtonGroup>
					<Button type='default' icon={true}>
						<Icon size='21' icon='shuffle' />
					</Button>
					<Button type='default' icon={true} onClick={this.toggleRepeatMode}>
						<Icon size='21' icon={ this.state.repeatMode } />
					</Button>
				</ButtonGroup>

				<div className='volume'>
					<Button type='default' icon={true} onClick={this.handleToggleMute}>
						<Icon size='21' icon={this.state.muteButtonIcon} />
					</Button>
					<Slider min={0} max={10} value={this.state.currentVolume} onChange={this.handleVolumeSliderChange}/>
				</div>
			</div>
		);
	}
}
