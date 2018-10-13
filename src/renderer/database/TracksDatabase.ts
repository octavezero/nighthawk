// tslint:disable-next-line:import-name
import Dexie from 'dexie';
import { IFormat, ICommonTagsResult } from 'music-metadata/lib/type';

// Specifically created so that typescript behaves sorting;
interface ExtendedCommonTagsResult extends ICommonTagsResult {
    [key: string]: any;
}

export interface TrackModel {
    id: number;
    source: string;
    common: ExtendedCommonTagsResult;
    format: IFormat;
}

export class TracksDatabase extends Dexie {
    library: Dexie.Table<TrackModel, number>;

    constructor(dbname: string) {
        super(dbname);

        this.version(1).stores({
            tracks: 'id, source, common, format',
        });

        /*
            Version 2 of the database. Renames the table to delete the old version of 
            the data due to changes in music-metadata data structures.
        */
        this.version(2).stores({
            tracks: null,
            library: 'id, source, common, format',
        });
    }
}
