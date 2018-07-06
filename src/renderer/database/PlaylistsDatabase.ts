// tslint:disable-next-line:import-name
import Dexie from 'dexie';

export interface PlaylistModel {
    id?: number;
    name: string;
    tracks: number[];
}

export class PlaylistsDatabase extends Dexie {
    folders: Dexie.Table<PlaylistModel, number>
    playlists: Dexie.Table<PlaylistModel, number>

    constructor(dbname: string) {
        super(dbname);

        this.version(1).stores({
            folders: '++id, name',
            playlists: '++id, name',
        });
    }
}
