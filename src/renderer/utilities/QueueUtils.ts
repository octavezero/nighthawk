import { TrackModel } from '../database/TracksDatabase';

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
