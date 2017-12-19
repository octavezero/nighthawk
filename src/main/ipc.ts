import { ipcMain, app } from 'electron';
import WindowManager from './window';

export default class IpcManager {

	windowManager: WindowManager;

	constructor(win: WindowManager) {
		this.windowManager = win;
	}

	activeAppEvents() {
		ipcMain.on('APP_QUIT', () => {
			app.quit();
		});
	}

	activateWindowEvents() {
		ipcMain.on('WINDOW_MINIMIZE', () => {
			this.windowManager.hideWindow();
		});
	}
}