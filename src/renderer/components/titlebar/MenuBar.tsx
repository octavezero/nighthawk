import * as React from 'react';
import { Menu, MenuHeader, MenuItem } from '../common/Menu';
export interface MenuBarProps {
	readonly showSettingsDialog: () => void;
}

export default class MenuBar extends React.Component<MenuBarProps, any> {
	render() {
		return (
			<Menu>
				<MenuHeader headerClass='menu-header-btn'>
					<MenuItem onClick={this.props.showSettingsDialog}>Preferences</MenuItem>
				</MenuHeader>
			</Menu>
		);
	}
}
