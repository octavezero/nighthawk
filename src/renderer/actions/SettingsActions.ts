import SettingsDatabase from '../models/SettingsDatabase';
import { LibrarySettingsModel } from '../models/LibrarySettingsModel';
import { backendDispatcher } from '../dispatchers/backendDispatcher';

const db: SettingsDatabase = new SettingsDatabase('settings');

export const saveLibrarySettings = async (settings: LibrarySettingsModel) => {
	db.library.update(1, settings).then((updated) => {
		if (updated) {
			refreshLibrarySettings();
		}
	});
};

export const init = () => {
	//As More Settings Tables are added, add them here to resolve
	Promise.all([
		db.library.where('id').equals(1).first()
	]).then( settings => {
		backendDispatcher.emit('INIT_SETTINGS', settings);
	}).catch(error => {
		console.log(error);
	});
};

export const refreshLibrarySettings = () => {
	db.library.where('id').equals(1).first().then( settings => {
		backendDispatcher.emit('UPDATE_SETTINGS_LIBRARY', settings);
	});
};

export const getLibrarySetting = async (key: string) => {
	let settings = await db.library.where('id').equals(1).first();

	//To bypass the strictNullCheck because the db will always contain a non null key
	return settings == undefined ? '' : settings[key];
};