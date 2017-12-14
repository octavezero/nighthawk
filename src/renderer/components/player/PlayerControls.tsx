import * as React from 'react';
import { ButtonGroup } from '../common/ButtonGroup';
import { Button } from '../common/Button';
import Slider from '../common/Slider';
import { Icon } from '../common/Icon';

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
						<Icon size='21' icon='skip-previous' />
					</Button>
					<Button type='default' icon={true}>
						<Icon size='21' icon='play' />
					</Button>
					<Button type='default' icon={true}>
						<Icon size='21' icon='skip-next' />
					</Button>
				</ButtonGroup>
				<div className='seekbar'>
					<Slider />
				</div>
				<ButtonGroup>
					<Button type='default' icon={true}>
						<Icon size='21' icon='shuffle' />
					</Button>
					<Button type='default' icon={true}>
						<Icon size='21' icon='repeat' />
					</Button>
				</ButtonGroup>
				<div className='volume'>
					<Button type='default' icon={true}>
						<Icon size='21' icon='volume-high' />
					</Button>
					<Slider />
				</div>
			</div>
		);
	}
}
