import { TrackModel } from '../database/TracksDatabase';
import orderBy from 'lodash/orderBy';

/**
 * Sorting Function for a List of Tracks
 * Sorts based on any valid parameter
 * @param {TrackModel[]} List
 * @returns {TrackModel[]} Sorted List
 */
export function sortTracks(
    sortBy: string,
    sortDirection: 'ASC' | 'DESC',
    library: TrackModel[]
): TrackModel[] {
    if (!sortBy.localeCompare('title')) {
        let tracks = library.sort((a, b) =>
            a.common.title.localeCompare(b.common.title)
        );

        // Reverse the list
        if (sortDirection === 'DESC') tracks.reverse();
        return tracks;
        // tslint:disable-next-line:no-else-after-return
    } else {
        let tracks = (orderBy(
            library,
            [
                (item: TrackModel) => item.common[sortBy],
                (item: TrackModel) => item.common.title,
            ],
            [sortDirection, 'ASC']
        ) as any) as TrackModel[];
        // This type assertion is a horribly wierd hack.
        // Black Magic copied from some stackoverflow answer.
        // I do not know how it works. It just works.

        // Reverse the list
        if (sortDirection === 'DESC') tracks.reverse();
        return tracks;
    }
}
