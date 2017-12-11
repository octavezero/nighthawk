import * as React from 'react';

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

			</div>
		);
	}
}
