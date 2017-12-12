import * as React from 'react';
import { ButtonGroup } from '../common/ButtonGroup';
import { Button } from '../common/Button';
import { Icon } from '../common/Icon';

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
					<Icon size='18' icon='arrow-left' />
				</Button>
				<Button type='primary' icon={true}>
					<Icon size='18' icon='arrow-right' />
				</Button>
			</ButtonGroup>
		);
	}
}
