import {
    BrowserWindow,
    NativeImage,
    nativeImage,
    ipcMain,
    screen,
} from 'electron';

import * as os from 'os';
import * as url from 'url';
import * as path from 'path';

import electronIsDev from 'electron-is-dev';
// tslint:disable-next-line:import-name
import manageWindowState from './winState';

export default function createMainWindow() {
    let mainWindowState = manageWindowState({ width: 992, height: 558 });
    // Construct new BrowserWindow
    let mainWindow: Electron.BrowserWindow;
    // Create the browser window.
    mainWindow = new BrowserWindow({
        frame: os.platform() === 'darwin' ? true : false,
        titleBarStyle: 'hiddenInset',
        maximizable: false,
        minimizable: false,
        show: false,
        minHeight: 558,
        minWidth: 992,
        height: mainWindowState.height,
        width: mainWindowState.width,
    });

    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true,
        })
    );

    if (electronIsDev) {
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    mainWindow.setAlwaysOnTop(true);
    mainWindowState.trackResize(mainWindow);
    return mainWindow;
}
