import { app } from 'electron';

import TrayManager from './tray';
import WindowManager from './window';
import IpcManager from './ipc';

// Global reference to mainWindow
// Necessary to prevent win from being garbage collected
let windowManager: WindowManager;
let trayManager: TrayManager;

// Quit application when all windows are closed
app.on('window-all-closed', () => {
	// On macOS it is common for applications to stay open
	// until the user explicitly quits
	if (process.platform !== 'darwin') { app.quit(); }
});

app.on('activate', () => {
	// On macOS it is common to re-create a window
	// even after all windows have been closed
	//if (mainWindow === null) { mainWindow = createMainWindow(); }
});

// Create main BrowserWindow when electron is ready
app.on('ready', () => {
	trayManager = new TrayManager();

	windowManager = new WindowManager();

	windowManager.attachTray(trayManager);
	trayManager.attachWindow(windowManager);

	let ipcManager: IpcManager = new IpcManager(windowManager);
	ipcManager.activeAppEvents();
	ipcManager.activateWindowEvents();
});