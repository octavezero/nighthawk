import {
    Tray,
    nativeImage,
    Menu,
    BrowserWindow,
    MenuItem,
    app,
} from 'electron';
import * as os from 'os';
import * as path from 'path';

import * as macImg from '../../static/tray/mac.png';
import * as macRetinaImg from '../../static/tray/mac@2x.png';
import * as winImg from '../../static/tray/windows.ico';

export default function createTray(window: BrowserWindow) {
    let tempTray: Tray;

    if (os.platform() === 'darwin') {
        // Weird and Horrific Hack to get the mac retina images loaded by webpack without triggering typescript not used errors.
        const image: nativeImage = nativeImage.createFromPath(
            true
                ? path.join(__dirname, macImg)
                : path.join(__dirname, macRetinaImg)
        );
        image.setTemplateImage(true);
        tempTray = new Tray(image);
    } else if (os.platform() === 'win32') {
        const image: nativeImage = nativeImage.createFromPath(
            path.join(__dirname, winImg)
        );
        tempTray = new Tray(image);
    } else {
        const image: nativeImage = nativeImage.createFromPath(
            path.join(__dirname, macImg)
        );
        tempTray = new Tray(image);
    }

    const onQuit = (
        menuItem: MenuItem,
        browserWindow: BrowserWindow,
        event: Event
    ) => {
        app.quit();
    };

    const handlePlayPause = () => {
        window.webContents.send('PLAYER_CONTROLS_TOGGLE_PLAY');
    };

    const handlePrevTrack = () => {
        window.webContents.send('PLAYER_CONTROLS_PREV_TRACK');
    };

    const handleNextTrack = () => {
        window.webContents.send('PLAYER_CONTROLS_NEXT_TRACK');
    };

    const handleShowPlayer = (
        menuItem: MenuItem,
        browserWindow: BrowserWindow,
        event: Event
    ) => {
        window.show();
    };

    const handleHidePlayer = (
        menuItem: MenuItem,
        browserWindow: BrowserWindow,
        event: Event
    ) => {
        window.hide();
    };

    const handleTrayClick = (e: any) => {
        if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) {
            return window.hide();
        }

        if (window && window.isVisible()) {
            return window.hide();
        }

        window.show();
    };

    const trayMenu: Menu = Menu.buildFromTemplate([
        { label: 'Show Player', type: 'normal', click: handleShowPlayer },
        { label: 'Hide Player', type: 'normal', click: handleHidePlayer },
        { type: 'separator' },
        { label: 'Play/Pause', type: 'normal', click: handlePlayPause },
        { label: 'Prev Track', type: 'normal', click: handlePrevTrack },
        { label: 'Next Track', type: 'normal', click: handleNextTrack },
        { type: 'separator' },
        { label: 'Quit Nighthawk', type: 'normal', click: onQuit },
    ]);

    tempTray.setToolTip('Click to Open');
    tempTray.setContextMenu(trayMenu);

    tempTray.on('click', handleTrayClick);

    return tempTray;
}
