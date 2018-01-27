import * as React from 'react';
import * as classNames from 'classnames';
import { Button } from './Button';

export interface PopoverProps {
	position: 'left' | 'right' | 'bottom' | 'top';
	button: React.ReactElement<Button>;
}

interface PopoverState {
	isActive: boolean;
}

export default class Popover extends React.Component<PopoverProps, PopoverState> {

	constructor(props: PopoverProps) {
		super(props);

		this.state = {
			isActive: false,
		};
	}

	togglePopover = (event: React.MouseEvent<HTMLDivElement>) => {
		this.setState({ isActive: this.state.isActive ? false : true });
	}

	render() {
		const {
			position
		} = this.props;

		let buildClassNames: string = classNames(
			'popover',
			{'active': this.state.isActive},
			'popover-' + position,
		);

		return (
			<div className={buildClassNames}>
				{React.cloneElement(this.props.button as React.ReactElement<any>, {onClick: this.togglePopover})}
				<div className='popover-overlay' onClick={this.togglePopover}></div>
				<div className='popover-container'>
					<div className='popover-body'>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}
