import Dexie from 'dexie';
import TrackModel from './TrackModel';

export default class TracksDatabase extends Dexie {
	// Declare implicit table properties. For Typescript Support.
	tracks: Dexie.Table<TrackModel, number>;

	constructor(dbname: string) {
		super(dbname);

		this.version(1).stores({
			tracks: 'id, source, common, format'
		});
	}
}