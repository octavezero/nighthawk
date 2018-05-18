import * as React from 'react';
import Queue from './Queue';
import { ButtonGroup } from '../elements/ButtonGroup';
import { Button } from '../elements/Button';
import { Icon } from '../elements/Icon';
import Slider from '../elements/Slider';
import AppStore from '../../stores/AppStore';
import Player from '../../libraries/Player';
import { parseToMinutes } from '../../utilities/TimeUtils';
import { ipcRenderer } from 'electron';

export interface ControlsProps {
    store: AppStore;
}

interface ControlsState {
    duration: number;
}

export default class Controls extends React.Component<
    ControlsProps,
    ControlsState
> {
    constructor(props: ControlsProps) {
        super(props);

        this.state = {
            duration: 0,
        };
    }

    onPlayerTimeUpdate = () => {
        this.setState({
            duration: Math.floor(Player.getCurrentTime()),
        });
    };

    onPlayerEnded = () => {
        this.props.store.player.nextSong();
    };

    handleDurationChange = (value: number) => {
        Player.setCurrentTime(value);
    };

    handleVolumeChange = (value: number) => {
        Player.setVolume(value / 10);
        this.props.store.settings.setVolume(value / 10);
    };

    handleMuteChange = () => {
        Player.isMuted() ? Player.unmute() : Player.mute();
        this.props.store.settings.setMute(Player.isMuted());
    };

    handleNextTrack = () => {
        this.props.store.player.nextSong();
    };

    handlePrevTrack = () => {
        if (this.state.duration > 15) {
            Player.replay();
        } else {
            this.props.store.player.prevSong();
        }
    };

    handlePlayPause = () => {
        this.props.store.player.togglePlayPause();
    };

    handleShuffle = () => {
        this.props.store.settings.setShuffleMode().then(() => {
            this.props.store.player.shuffleToggle();
        });
    };

    handleRepeat = () => {
        this.props.store.settings.setRepeatMode();
    };

    componentDidMount() {
        Player.getInstance().addEventListener(
            'timeupdate',
            this.onPlayerTimeUpdate
        );
        Player.getInstance().addEventListener('ended', this.onPlayerEnded);

        ipcRenderer.addListener(
            'PLAYER_CONTROLS_TOGGLE_PLAY',
            this.handlePlayPause
        );
        ipcRenderer.addListener(
            'PLAYER_CONTROLS_PREV_TRACK',
            this.handlePrevTrack
        );
        ipcRenderer.addListener(
            'PLAYER_CONTROLS_NEXT_TRACK',
            this.handleNextTrack
        );
    }

    componentWillUnmount() {
        Player.getInstance().removeEventListener(
            'timeupdate',
            this.onPlayerTimeUpdate
        );
        Player.getInstance().removeEventListener('ended', this.onPlayerEnded);
        ipcRenderer.removeListener(
            'PLAYER_CONTROLS_TOGGLE_PLAY',
            this.handlePlayPause
        );
        ipcRenderer.removeListener(
            'PLAYER_CONTROLS_PREV_TRACK',
            this.handlePrevTrack
        );
        ipcRenderer.removeListener(
            'PLAYER_CONTROLS_NEXT_TRACK',
            this.handleNextTrack
        );
    }

    render() {
        return (
            <>
                <div className="controls">
                    <ButtonGroup>
                        <Button
                            data-rh="Previous Track"
                            data-rh-at="bottom"
                            type="primary"
                            icon={true}
                            onClick={this.handlePrevTrack}>
                            <Icon size="21" icon="skip-previous" />
                        </Button>
                        <Button
                            data-rh="Play/Pause"
                            data-rh-at="bottom"
                            type="primary"
                            icon={true}
                            onClick={this.handlePlayPause}>
                            <Icon
                                size="21"
                                icon={
                                    this.props.store.state.player.playing
                                        ? 'pause'
                                        : 'play'
                                }
                            />
                        </Button>
                        <Button
                            data-rh="Next Track"
                            data-rh-at="bottom"
                            type="primary"
                            icon={true}
                            onClick={this.handleNextTrack}>
                            <Icon size="21" icon="skip-next" />
                        </Button>
                    </ButtonGroup>
                    <div className="seekbar">
                        <span>{parseToMinutes(this.state.duration)}</span>
                        <Slider
                            min={0}
                            max={Math.floor(Player.getDuration())}
                            value={this.state.duration}
                            onChange={this.handleDurationChange}
                        />
                        <span>
                            {parseToMinutes(Math.floor(Player.getDuration()))}
                        </span>
                    </div>
                    <ButtonGroup>
                        <Button
                            data-rh={
                                this.props.store.state.settings.player.repeat
                                    ? 'Repeat Once'
                                    : 'Repeat'
                            }
                            data-rh-at="bottom"
                            type="primary"
                            icon={true}
                            onClick={this.handleRepeat}>
                            <Icon
                                size="21"
                                icon={
                                    this.props.store.state.settings.player
                                        .repeat
                                        ? 'repeat-once'
                                        : 'repeat'
                                }
                            />
                        </Button>
                        <Button
                            data-rh="Shuffle"
                            data-rh-at="bottom"
                            type="primary"
                            icon={true}
                            onClick={this.handleShuffle}>
                            <Icon
                                size="21"
                                icon={
                                    this.props.store.state.settings.player
                                        .shuffle
                                        ? 'shuffle'
                                        : 'shuffle-disabled'
                                }
                            />
                        </Button>
                    </ButtonGroup>
                    <Queue store={this.props.store} />
                    <div className="volume">
                        <Button
                            data-rh="Mute/Unmute"
                            data-rh-at="bottom"
                            type="primary"
                            icon={true}
                            onClick={this.handleMuteChange}>
                            <Icon
                                size="21"
                                icon={
                                    Player.isMuted()
                                        ? 'volume-off'
                                        : 'volume-high'
                                }
                            />
                        </Button>
                        <Slider
                            min={0}
                            max={10}
                            value={Player.getVolume() * 10}
                            onChange={this.handleVolumeChange}
                        />
                    </div>
                </div>
            </>
        );
    }
}
