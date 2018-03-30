import { globalShortcut, BrowserWindow } from 'electron';

export default function registerShortcuts(window: BrowserWindow) {
    globalShortcut.register('MediaPlayPause', () => {
        window.webContents.send('PLAYER_CONTROLS_TOGGLE_PLAY');
    });

    globalShortcut.register('MediaPreviousTrack', () => {
        window.webContents.send('PLAYER_CONTROLS_PREV_TRACK');
    });

    globalShortcut.register('MediaNextTrack', () => {
        window.webContents.send('PLAYER_CONTROLS_NEXT_TRACK');
    });
}
