import * as React from 'react';
import { ButtonGroup } from '../elements/buttongroup';
import { Button } from '../elements/button';
import { Icon } from '../elements/Icon';
import Slider from '../elements/Slider';
import AppStore from '../../stores/AppStore';
import Player from '../../libraries/Player';
import { parseToMinutes } from '../../utilities/TimeUtils';
import { PlayerActionEnum } from '../../actions/PlayerActions';
import { SettingsActionEnum } from '../../actions/SettingsActions';

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
        this.props.store.playerActions({
            type: PlayerActionEnum.NEXT_SONG,
        });
    };

    handleDurationChange = (value: number) => {
        Player.setCurrentTime(value);
    };

    handleVolumeChange = (value: number) => {
        Player.setVolume(value / 10);
    };

    handleNextTrack = () => {
        this.props.store.playerActions({
            type: PlayerActionEnum.NEXT_SONG,
        });
    };

    handlePrevTrack = () => {
        if (this.state.duration > 15) {
            Player.replay();
        } else {
            this.props.store.playerActions({
                type: PlayerActionEnum.PREV_SONG,
            });
        }
    };

    handleShuffle = () => {
        this.props.store.settingsActions({
            type: SettingsActionEnum.SET_SHUFFLE_MODE,
        });
        this.props.store.playerActions({
            type: PlayerActionEnum.SHUFFLE_TOGGLE,
        });
    };
    handleRepeat = () => {
        this.props.store.settingsActions({
            type: SettingsActionEnum.SET_REPEAT_MODE,
        });
    };

    componentDidMount() {
        Player.getInstance().addEventListener(
            'timeupdate',
            this.onPlayerTimeUpdate
        );
        Player.getInstance().addEventListener('ended', this.onPlayerEnded);
    }

    componentWillUnmount() {
        Player.getInstance().removeEventListener(
            'timeupdate',
            this.onPlayerTimeUpdate
        );
        Player.getInstance().removeEventListener('ended', this.onPlayerEnded);
    }

    render() {
        return (
            <>
                <div className="controls">
                    <ButtonGroup>
                        <Button
                            type="default"
                            icon={true}
                            onClick={this.handlePrevTrack}>
                            <Icon size="21" icon="skip-previous" />
                        </Button>
                        <Button
                            type="default"
                            icon={true}
                            onClick={e =>
                                this.props.store.playerActions({
                                    type: PlayerActionEnum.TOGGLE_PLAY_PAUSE,
                                })
                            }>
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
                            type="default"
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
                            type="default"
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
                            type="default"
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
                    <div className="volume">
                        <Button type="default" icon={true}>
                            <Icon size="21" icon="volume-high" />
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
