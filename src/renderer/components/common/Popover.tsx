import * as React from 'react';
import * as classNames from 'classnames';
import { Button } from './Button';

export interface PopoverProps {
	position: 'left' | 'right' | 'bottom' | 'top';
	button: React.ReactElement<Button>;
}

export default class Popover extends React.Component<PopoverProps, any> {
	render() {
		const {
			position
		  } = this.props;

		let buildClassNames: string = classNames(
			'popover',
			'popover-' + position,
		);

		return (
			<div className={buildClassNames}>
				{this.props.button}
				<div className='popover-container'>
					<div className='popover-body'>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}
