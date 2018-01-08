import { BrowserWindow, NativeImage, nativeImage, ipcMain, screen} from 'electron';
import * as Positioner from 'electron-positioner';
import TrayManager from './tray';
import Store from 'electron-store';

import * as winIcon from '../../static/logo/logo.ico';
import * as macIcon from '../../static/logo/logo.icns';
import * as defaultIcon from '../../static/logo/logo.png';

export default class WindowManager {
	window: Electron.BrowserWindow;
	trayManager: TrayManager;
	positioner: any;
	isDevelopment = process.env.ELECTRON_DEV == 'dev';
	isPinned: boolean;
	store: Store;

	constructor() {
		this.isPinned = false;
		this.store = new Store({ name: 'window-state' });
		this.window = this.createMainWindow();
		this.positioner = new Positioner(this.window);

		ipcMain.on('SET_PINNED_STATE', (event: any, arg: boolean) => {
			//Sends the window level below the dialog and prevents it from loosing focus. Use this only when showing a dialog.
			this.window.setAlwaysOnTop(!arg);
			this.isPinned = arg;
		});
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

		let mainWindowState = this.manageWindowState({width: 992, height: 558});

		let win: BrowserWindow = new BrowserWindow({
			minHeight: 558,	minWidth: 992,
			height: mainWindowState.height, width: mainWindowState.width,
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
			if (this.isPinned != true) {
				this.hideWindow();
			}
		});

		win.webContents.on('devtools-opened', () => {
			win.focus();
			setImmediate(() => {
				win.focus();
			});
		});

		win.setAlwaysOnTop(true);

		mainWindowState.trackResize(win);

		return win;
	}

	manageWindowState(defaults: WindowState) {
		// Grab initial bounds here
		let state: WindowState = this.store.store;

		if (state.displayBounds != undefined) {
			let bounds = screen.getDisplayMatching({ x: state.x!, y: state.y!, width: state.width!, height: state.height! }).bounds;

			if (bounds.height < state.displayBounds.height! || bounds.width < state.width!) {
				state.height = defaults.height;
				state.width = defaults.width;
			} else {
				state.height = state.height == undefined ? defaults.height : state.height;
				state.width = state.width == undefined ? defaults.width : state.width;
			}
		} else {
			state.height = state.height == undefined ? defaults.height : state.height;
			state.width = state.width == undefined ? defaults.width : state.width;
		}

		const trackResize = (win: BrowserWindow) => {
			let stateChangeTimer: NodeJS.Timer;
			win.on('resize', () => {
				clearTimeout(stateChangeTimer);
				stateChangeTimer = setTimeout(() => {
					this.store.store = Object.assign({}, win.getBounds(), {displayBounds : screen.getDisplayMatching(win.getBounds()).bounds} );
				}, 100); //debounce the function for 100ms
			});
		};

		return ({
			width: state.width,
			height: state.height,
			trackResize: trackResize
		});
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

interface WindowState {
	x?: number;
	y?: number;
	width?: number;
	height?: number;

	displayBounds?: Electron.Rectangle;
}