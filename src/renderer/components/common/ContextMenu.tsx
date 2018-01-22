import * as React from 'react';
import * as classNames from 'classnames';

export interface ContextMenuProps {
	x: number;
	y: number;
}

interface ContextMenuState {
	isActive: boolean;
	position: Position;
}

interface Position {
	top?: number;
	left?: number;
}

export class ContextMenu extends React.Component<ContextMenuProps, ContextMenuState> {
	contextMenu: HTMLDivElement | null;

	constructor(props: ContextMenuProps) {
		super(props);

		this.state = {
			isActive: false,
			position: {top: undefined, left: undefined}
		};
	}

	hideMenu = () => {
		this.setState({isActive: false});
		document.removeEventListener('click', this.handleClick);
	}

	showMenu = (style: Position) => {
		this.setState({isActive: true, position: style});
		document.addEventListener('click', this.handleClick);
	}

	handleClick = (e: MouseEvent) => {
		if (this.contextMenu != null) {
			const w: number = this.contextMenu.offsetWidth;
			const h: number = this.contextMenu.offsetHeight;

			if ( (e.clientX < this.state.position.left! || e.clientX > this.state.position.left! + w)
				|| (e.clientY < this.state.position.top! || e.clientY > this.state.position.top! + h) ) {
					this.hideMenu();
			}
		}
	}

	componentWillReceiveProps(nextProps: ContextMenuProps) {
		let w = window.innerWidth;
		let h = window.innerHeight;

		let position: Position = {top: undefined, left: undefined};

		/*
			Important Notes aka Wierd Hacks:
		*/
		if (nextProps.x !== 0 && nextProps.y !== 0 && (this.props.x != nextProps.x)) {
			if (nextProps.x > (w - this.contextMenu!.offsetWidth)) {
				position.left = nextProps.x - this.contextMenu!.offsetWidth;
			} else {
				position.left = nextProps.x;
			}

			if (nextProps.y > (h - this.contextMenu!.offsetHeight)) {
				position.top = nextProps.y - this.contextMenu!.offsetHeight;
			} else {
				position.top = nextProps.y;
			}
			this.showMenu(position);
		}
	}

	componentDidUpdate() {
		if (this.contextMenu != null && this.state.isActive == true) {
			//Replace here with global listeners
		}
	}

	render() {
		let buildClassNames: string = classNames(
			'context-menu',
			{'active': this.state.isActive}
		);

		return (
			<div className={ buildClassNames } ref={(elem) => { this.contextMenu = elem; }} style={this.state.position} tabIndex={0}>
				{
					React.Children.map(this.props.children, (child) => {
						return React.cloneElement(child as React.ReactElement<any>, { hideContextMenu: this.hideMenu });
					})
				}
			</div>
		);
	}
}

export interface ContextMenuItemProps {
	readonly onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
	readonly hideContextMenu?: () => void;
}

export class ContextMenuItem extends React.Component<ContextMenuItemProps, any> {
	handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (this.props.hideContextMenu !== undefined) {
			this.props.hideContextMenu();
		}
		this.props.onClick(event);
	}

	stopBlurBubbling = (e: React.FocusEvent<HTMLDivElement>) => {
		e.stopPropagation();
	}

	render() {
		return (
			<div className='context-menu-item' onBlur={this.stopBlurBubbling} onClick={this.handleClick}>
				{ this.props.children }
			</div>
		);
	}
}
