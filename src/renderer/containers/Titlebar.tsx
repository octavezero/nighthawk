import { Button } from '../components/common/Button';
import * as React from 'react';
import { ipcRenderer } from 'electron';
import WindowControls from '../components/titlebar/WindowControls';
import { Icon } from '../components/common/Icon';

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
				<Button type='primary' className='btn-menu'>
					<Icon size='24' icon='menu' /> Menu
				</Button>
				<WindowControls handleQuit={this.handleQuit} handleMinimize={this.handleMinimize}/>
			</div>
		);
	}
}
