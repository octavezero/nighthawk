import * as fs from 'fs-extra';
import * as mm from 'music-metadata';
import * as path from 'path';

import * as SettingsAction from './SettingsActions';
import TrackModel from '../models/TrackModel';
import TracksDatabase from '../models/TracksDatabase';

const db: TracksDatabase = new TracksDatabase('tracks');

export const refreshLibrary = async () => {
	// Grab the library Path
	let libpath: string = await SettingsAction.getLibrarySetting('path');

	let files: string[] = await fs.readdir(libpath);

	// filter out the unrequired files
	files = files.filter((value) => {
		let file: string = path.join(libpath, value);
		return (path.extname(file) == '.mp3' || path.extname(file) == '.wma' || path.extname(file) == '.ogg');
	});

	//Grab the metadata and exract the required files
	let tracks: TrackModel[] = await Promise.all(files.map(async (value, index) => {
		let fullpath = path.join(libpath, value);
		let data: mm.IAudioMetadata = await mm.parseFile(fullpath, { skipCovers: true });
		return { id: index, source: fullpath, common: data.common, format: data.format};
	}));

	// Clear/Delete all current tracks from the database
	await db.tracks.clear();

	// Write the new tracks into database
	await db.transaction('rw', db.tracks, () => {
		for (let i = 0, n = tracks.length; i < n; i++) {
			db.tracks.add(tracks[i]);
		}
	});
};