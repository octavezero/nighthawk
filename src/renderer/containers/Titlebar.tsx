import * as React from 'react';
import { ipcRenderer } from 'electron';
import WindowControls from '../components/titlebar/WindowControls';
import Settings from './Settings';
import MenuBar from '../components/titlebar/MenuBar';

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
		ipcRenderer.send('app-quit');
	}

	handleMinimize = () => {
		ipcRenderer.send('window-minimize');
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
