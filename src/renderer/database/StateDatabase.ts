// tslint:disable-next-line:import-name
import Dexie from 'dexie';

interface QueueModel {
    id: number;
    queue: number[];
    originalQueue: number[];
    cursor: number;
}

export class StateDatabase extends Dexie {
    queue: Dexie.Table<QueueModel, number>;

    constructor(dbname: string) {
        super(dbname);

        /*
            Version 1 of the database. Adds player queue persistance.
        */
        this.version(1).stores({
            queue: 'id, cursor',
        });

        /*
            Populates the database with default values
        */
        this.on('populate', () => {
            this.queue.add({ id: 1, queue: [], originalQueue: [], cursor: -2 });
        });
    }
}
