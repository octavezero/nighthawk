import { LibrarySettingsModel } from '../models/LibrarySettingsModel';
import Store from 'electron-store';

const settingsDatabase = new Store();

export const saveLibrarySettings = (settings: LibrarySettingsModel) => {
	settingsDatabase.set('librarySettings', settings);
};

export const getLibrarySettings = (): LibrarySettingsModel => {
	return settingsDatabase.get('librarySettings');
};

export const refreshSettings = () => {
	return [
		settingsDatabase.get('librarySettings')
	];
};

export const getSettingByKey = (key: string) => {
	return settingsDatabase.get(key);
};