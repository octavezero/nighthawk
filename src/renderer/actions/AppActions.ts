import * as LibraryActions from './LibraryActions';
import { ipcRenderer } from 'electron';

export const init = () => {
	LibraryActions.init();
};

export const quitApp = () => {
	ipcRenderer.send('APP_QUIT');
};

export const minimizeWindow = () => {
	ipcRenderer.send('WINDOW_MINIMIZE');
};