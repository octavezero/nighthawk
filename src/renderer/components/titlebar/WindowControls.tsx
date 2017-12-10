import * as React from 'react';

import { Button } from '../common/Button';
import { ButtonGroup } from '../common/ButtonGroup';

export interface WindowControlsProps {
	readonly handleQuit: (event: React.MouseEvent<HTMLButtonElement>) => void;
	readonly handleMinimize: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default class WindowControls extends React.Component<WindowControlsProps, any> {
	constructor(props: WindowControlsProps) {
		super(props);
	}

	render() {
		return (
			<ButtonGroup>
				<Button type='primary' onClick={this.props.handleMinimize} icon={true}>
					<i className='mdi mdi-16px mdi-window-minimize'></i>
				</Button>
				<Button type='primary' onClick={this.props.handleQuit} icon={true}>
					<i className='mdi mdi-18px mdi-window-close'></i>
				</Button>
			</ButtonGroup>
		);
	}
}
