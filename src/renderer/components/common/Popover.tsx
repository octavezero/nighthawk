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

		let w = window.innerWidth;
		let h = window.innerHeight;

		//TODO: This is a hack to work around a chromium problem. Will be fixed in the next electron build.
		let transform: string = 'translate(' + -Math.round(h / 2) + 'px, ' + -Math.round(w / 2) + 'px) scale(0)';

		if (this.state.isActive) {
			switch (this.props.position) {
				case 'left':
					transform = 'translate(-100%, ' + -Math.round(w / 2) + 'px) scale(1)';
					break;
				case 'right':
					transform = 'transform: translate(0, ' + -Math.round(w / 2) + 'px) scale(1):';
					break;
				case 'bottom':
					transform = 'translate(' + -Math.round(h / 2) + 'px, 0) scale(1)';
					break;
				case 'top':
					transform = 'transform: translate(' + -Math.round(h / 2) + 'px, -100%) scale(1)';
					break;
				default:
					break;
			}
		}

		let buildClassNames: string = classNames(
			'popover',
			{'active': this.state.isActive},
			'popover-' + position,
		);

		return (
			<div className={buildClassNames}>
				{React.cloneElement(this.props.button as React.ReactElement<any>, {onClick: this.togglePopover})}
				<div className='popover-overlay' onClick={this.togglePopover}></div>
				<div className='popover-container' style={{ transform: transform }}>
					<div className='popover-body'>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}
