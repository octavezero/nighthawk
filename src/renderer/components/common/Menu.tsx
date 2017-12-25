import * as React from 'react';
import { Button } from './Button';

export interface MenuProps {}

export class Menu extends React.Component<MenuProps, any> {
	render() {
		return (
			<div className='menu'>
				{ this.props.children }
			</div>
		);
	}
}

export interface MenuHeaderProps {
	headerClass?: string;
}

export interface MenuHeaderState {
	classes: string;
}

export class MenuHeader extends React.Component<MenuHeaderProps, MenuHeaderState> {
	constructor(props: MenuHeaderProps) {
		super(props);

		this.state = {
			classes: 'menu-header'
		};
	}

	showMenu = () => {
		this.setState({classes: 'menu-header active'});
	}

	hideMenu = () => {
		this.setState({classes: 'menu-header'});
	}

	render() {
		return (
			<div className={ this.state.classes }>
				<Button type='primary' icon={ false } className={this.props.headerClass} onClick={this.showMenu}>Menu</Button>
				<div className='menu-header-overlay' onClick={this.hideMenu}></div>
				<div className='menu-dropdown'>
					{
						React.Children.map(this.props.children, (child) => {
							return React.cloneElement(child as React.ReactElement<any>, { onBlur: this.hideMenu });
						})
					}
				</div>
			</div>
		);
	}
}

export interface MenuItemProps {
	readonly onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
	readonly onBlur?: () => void;
}

export class MenuItem extends React.Component<MenuItemProps, any> {
	handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (this.props.onBlur !== undefined) {
			this.props.onBlur();
		}
		this.props.onClick(event);
	}

	render() {
		return (
			<div className='menu-item' onClick={this.handleClick}>
				{ this.props.children }
			</div>
		);
	}
}
