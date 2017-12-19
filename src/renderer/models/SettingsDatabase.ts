import Dexie from 'dexie';
import { LibrarySettingsModel } from './LibrarySettingsModel';

import { remote } from 'electron';
const { app } = remote;

export default class SettingsDatabase extends Dexie {
	// Declare implicit table properties. For Typescript Support.
	library: Dexie.Table<LibrarySettingsModel, number>;

	constructor(dbName: string) {
		super(dbName);

		/*
			TODO: (Important) Increment Version Number with Each Schema Change.
		*/
		this.version(1).stores({
			library: 'id, path'
		});

		this.on('populate', () => {
			this.library.add({id: 1, path: app.getPath('music') });
		});
	}
}