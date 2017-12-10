import * as React from 'react';
import { ButtonGroup } from '../common/ButtonGroup';
import { Button } from '../common/Button';

export interface NavigationControlsProps {
}

export default class NavigationControls extends React.Component<NavigationControlsProps, any> {
	constructor(props: NavigationControlsProps) {
		super(props);
	}

	render() {
		return (
			<ButtonGroup>
				<Button type='primary' icon={true}>
					<i className='mdi mdi-18px mdi-arrow-left'></i>
				</Button>
				<Button type='primary' icon={true}>
					<i className='mdi mdi-18px mdi-arrow-right'></i>
				</Button>
			</ButtonGroup>
		);
	}
}
