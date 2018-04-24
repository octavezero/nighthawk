import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron';
import * as os from 'os';
import * as path from 'path';
import * as url from 'url';
// tslint:disable-next-line:import-name
import createTray from './tray';
// tslint:disable-next-line:import-name
import createMainWindow from './window';
// tslint:disable-next-line:import-name
import registerShortcuts from './shortcuts';

let mainWindow: Electron.BrowserWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = createMainWindow();

    // attach tray to window
    createTray(mainWindow);
    // Register Global Shortcuts
    registerShortcuts(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Unregister media key shortcuts.
app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

app.on('activate', () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('WINDOW_QUIT', () => {
    app.quit();
});

ipcMain.on('WINDOW_MINIMIZE', () => {
    if (mainWindow) {
        mainWindow.minimize();
    }
});

ipcMain.on('WINDOW_MAXIMIZE', () => {
    if (mainWindow) {
        mainWindow.isMaximized()
            ? mainWindow.unmaximize()
            : mainWindow.maximize();
    }
});
