import { Tray, nativeImage, Menu, BrowserWindow, MenuItem, app } from 'electron';
import * as os from 'os';
import * as path from 'path';

import * as macImg from '../../static/tray/macTemplate.png';
import * as linuxImg from '../../static/tray/macTemplate@2x.png';
import * as winImg from '../../static/tray/windows.ico';
import WindowManager from './window';

export default class TrayManager {
	tray: Tray;
	windowManager: WindowManager;

	constructor() {
		this.tray = this.createTray();
	}

	createTray() {
		//
		let tempTray: Tray;

		if (os.platform() === 'darwin') {
			let image: nativeImage = nativeImage.createFromPath(path.join(__dirname, macImg));
			image.setTemplateImage(true);
			tempTray = new Tray(image);
		} else if (os.platform() === 'win32') {
			let image: nativeImage = nativeImage.createFromPath(path.join(__dirname, winImg));
			tempTray = new Tray(image);
		} else {
			let image: nativeImage = nativeImage.createFromPath(path.join(__dirname, linuxImg));
			tempTray = new Tray(image);
		}

		const trayMenu: Menu = Menu.buildFromTemplate([
			{ label: 'Show Player', type: 'normal', click: this.handleShowPlayer },
			{ label: 'Hide Player', type: 'normal', click: this.handleHidePlayer },
			{ type: 'separator' },
			{ label: 'Quit Nighthawk', type: 'normal', click: this.onQuit }
		]);

		tempTray.setToolTip('Click to Open');
		tempTray.setContextMenu(trayMenu);

		tempTray.on('click', this.handleTrayClick);

		return tempTray;
	}

	attachWindow(window: WindowManager) {
		this.windowManager = window;
	}

	onQuit = (menuItem: MenuItem, browserWindow: BrowserWindow, event: Event) => {
		app.quit();
	}

	handleShowPlayer = (menuItem: MenuItem, browserWindow: BrowserWindow, event: Event) => {
		this.windowManager.showWindow();
	}

	handleHidePlayer = (menuItem: MenuItem, browserWindow: BrowserWindow, event: Event) => {
		this.windowManager.hideWindow();
	}

	handleTrayClick = (e: any) => {
		if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) {
			return this.windowManager.hideWindow();
		}

		if (this.windowManager.window && this.windowManager.window.isVisible()) {
			return this.windowManager.hideWindow();
		}

		this.windowManager.showWindow();
	}
}