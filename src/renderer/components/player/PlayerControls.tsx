import * as React from 'react';
import { ButtonGroup } from '../common/ButtonGroup';
import { Button } from '../common/Button';
import Slider from '../common/Slider';

export interface PlayerControlsProps {
}

export interface PlayerControlsState {
}

export default class PlayerControls extends React.Component<PlayerControlsProps, PlayerControlsState> {
	constructor(props: PlayerControlsProps) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div className='player-controls'>
				<ButtonGroup>
					<Button type='default' icon={true}>
						<i className='mdi mdi-24px mdi-skip-previous'></i>
					</Button>
					<Button type='default' icon={true}>
						<i className='mdi mdi-24px mdi-play'></i>
					</Button>
					<Button type='default' icon={true}>
						<i className='mdi mdi-24px mdi-skip-next'></i>
					</Button>
				</ButtonGroup>
				<div className='seekbar'>
					<Slider />
				</div>
				<ButtonGroup>
					<Button type='default' icon={true}>
						<i className='mdi mdi-21px mdi-shuffle'></i>
					</Button>
					<Button type='default' icon={true}>
						<i className='mdi mdi-21px mdi-repeat'></i>
					</Button>
				</ButtonGroup>
				<div className='volume'>
					<Button type='default' icon={true}>
						<i className='mdi mdi-21px mdi-volume-high'></i>
					</Button>
					<Slider />
				</div>
			</div>
		);
	}
}
