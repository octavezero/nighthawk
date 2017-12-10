import * as React from 'react';
import { ipcRenderer } from 'electron';
import NavigationControls from '../components/titlebar/NavigationControls';
import WindowControls from '../components/titlebar/WindowControls';

export interface TitleBarProps {
}

export interface TitleBarState {
}

export default class Titlebar extends React.Component<TitleBarProps, TitleBarState> {
	constructor(props: TitleBarProps) {
		super(props);

		this.state = {
		};
	}

	handleQuit = () => {
		ipcRenderer.send('app-quit');
	}

	handleMinimize = () => {
		ipcRenderer.send('window-minimize');
	}

	render() {
		return (
			<div className='titlebar'>
				<NavigationControls />
				<WindowControls handleQuit={this.handleQuit} handleMinimize={this.handleMinimize}/>
			</div>
		);
	}
}
