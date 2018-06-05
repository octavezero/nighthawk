import { TrackModel } from '../database/TracksDatabase';
import { StateDatabase } from '../database/StateDatabase';

/**
 * Fisher-Yates-shuffle for Arrays
 * @param {TrackModel[]} List
 * @returns {TrackModel[]} Shuffled List
 */
export function shuffleList(list: TrackModel[]): TrackModel[] {
    let current: number = list.length;
    let temp: TrackModel;
    let swap: number;

    while (current) {
        swap = Math.floor(Math.random() * current--);

        // Swap with random element
        temp = list[current];
        list[current] = list[swap];
        list[swap] = temp;
    }

    return list;
}

export function updatePlayerState(
    queue: number[],
    originalQueue: number[],
    cursor: number
) {
    let db: StateDatabase = new StateDatabase('state');
    db.queue
        .put({ queue, originalQueue, cursor, id: 1 })
        .then(() => db.close());
}

export function updatePlayerStateCursor(cursor: number) {
    let db: StateDatabase = new StateDatabase('state');
    db.queue.update(1, { cursor }).then(() => db.close());
}

export function updatePlayerStateQueue(
    queue: number[],
    originalQueue: number[]
) {
    let db: StateDatabase = new StateDatabase('state');
    db.queue.update(1, { queue, originalQueue });
    db.close();
}
