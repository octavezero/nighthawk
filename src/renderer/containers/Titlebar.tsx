import * as React from 'react';
import WindowControls from '../components/titlebar/WindowControls';
import Settings from './Settings';
import MenuBar from '../components/titlebar/MenuBar';

import * as AppActions from '../actions/AppActions';

export interface TitleBarProps {
}

export interface TitleBarState {
	showSettings: boolean;
}

export default class Titlebar extends React.Component<TitleBarProps, TitleBarState> {
	constructor(props: TitleBarProps) {
		super(props);

		this.state = {
			showSettings: false
		};
	}

	handleQuit = () => {
		AppActions.quitApp();
	}

	handleMinimize = () => {
		AppActions.minimizeWindow();
	}

	showSettingsDialog = () => {
		this.setState({ showSettings: true });
	}

	render() {
		return (
			<div className='titlebar'>
				<MenuBar showSettingsDialog={this.showSettingsDialog}/>
				<Settings isActive={this.state.showSettings} />
				<WindowControls handleQuit={this.handleQuit} handleMinimize={this.handleMinimize}/>
			</div>
		);
	}
}
