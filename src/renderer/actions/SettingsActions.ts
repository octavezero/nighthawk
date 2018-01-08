import { LibrarySettingsModel } from '../models/LibrarySettingsModel';
import Store from 'electron-store';
import { PlayerSettingsModel } from '../models/PlayerSettingsModel';

const settingsDatabase = new Store();

export const saveLibrarySettings = async (settings: LibrarySettingsModel) => {
	Object.keys(settings).map(key => {
		settingsDatabase.set('librarySettings.' + key, settings[key]);
	});
};

export const getLibrarySettings = (): LibrarySettingsModel => {
	return settingsDatabase.get('librarySettings');
};

export const savePlayerSettings = async (settings: PlayerSettingsModel) => {
	Object.keys(settings).map(key => {
		settingsDatabase.set('PlayerSettings.' + key, settings[key]);
	});
};

export const getPlayerSettings = (): PlayerSettingsModel => {
	return settingsDatabase.get('PlayerSettings');
};

export const refreshSettings = () => {
	return [
		settingsDatabase.get('librarySettings')
	];
};

export const getSettingByKey = (key: string) => {
	return settingsDatabase.get(key);
};