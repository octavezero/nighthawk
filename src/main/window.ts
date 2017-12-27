import { BrowserWindow, NativeImage, nativeImage } from 'electron';
import * as Positioner from 'electron-positioner';
import TrayManager from './tray';

import * as winIcon from '../../static/logo/logo.ico';
import * as macIcon from '../../static/logo/logo.icns';
import * as defaultIcon from '../../static/logo/logo.png';

export default class WindowManager {
	window: Electron.BrowserWindow;
	trayManager: TrayManager;
	positioner: any;
	isDevelopment = process.env.ELECTRON_DEV == 'dev';

	constructor() {
		this.window = this.createMainWindow();
		this.positioner = new Positioner(this.window);
	}

	returnIcon(): NativeImage {
		if (process.platform == 'win32') {
			return nativeImage.createFromPath(winIcon);
		} else if (process.platform == 'darwin') {
			return nativeImage.createFromPath(macIcon);
		} else {
			return nativeImage.createFromPath(defaultIcon);
		}
	}

	createMainWindow() {
		// Construct new BrowserWindow
		let win: BrowserWindow = new BrowserWindow({
			minHeight: 671,	minWidth: 1192,
			height: 671, width: 1192,
			icon: this.returnIcon(),
			show: false, frame: false,
			// This disables webSecurity during Development Mode. Prevents Audio src errors. Refer Electron Docs for more.
			webPreferences: { webSecurity: this.isDevelopment === true ? false : true }
		});

		// Set url for `win`
		// points to `webpack-dev-server` in development
		// points to `index.html` in production
		const url = this.isDevelopment
			? `http://localhost:3000`
			: `file://${__dirname}/index.html`;

		if (this.isDevelopment) {
			win.webContents.openDevTools();
		}

		win.loadURL(url);

		win.on('closed', () => {
			//window = null
		});

		win.on('blur', () => {
			this.hideWindow();
		});

		win.webContents.on('devtools-opened', () => {
			win.focus();
			setImmediate(() => {
				win.focus();
			});
		});

		return win;
	}

	attachTray(tray: TrayManager) {
		this.trayManager = tray;
	}

	hideWindow() {
		if (!this.window) {
			return;
		}

		this.window.hide();
	}

	showWindow() {
		let noBoundsPosition: string = (process.platform === 'win32') ? 'bottomRight' : 'topRight';
		let position: any = this.positioner.calculate(noBoundsPosition, this.trayManager.tray.getBounds());

		this.window.setPosition(position.x, position.y);
		this.window.show();
	}

}