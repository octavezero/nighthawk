import { TrackModel } from '../database/TracksDatabase';
import orderBy from 'lodash/orderBy';
import { DraftArray } from 'immer';

/**
 * Sorting Function for a List of Tracks
 * Sorts based on any valid parameter
 * @param {TrackModel[]} List
 * @returns {TrackModel[]} Sorted List
 */
export function sortTracks(
    sortBy: string,
    sortDirection: 'ASC' | 'DESC',
    library: DraftArray<TrackModel>
): DraftArray<TrackModel> {
    if (!sortBy.localeCompare('title')) {
        let tracks = library.sort((a, b) =>
            a.common.title.localeCompare(b.common.title)
        );

        // Reverse the list
        if (sortDirection === 'DESC') tracks.reverse();
        return tracks;
        // tslint:disable-next-line:no-else-after-return
    } else if (
        !sortBy.localeCompare('Added At') ||
        !sortBy.localeCompare('Modified At')
    ) {
        let tracks = (orderBy(
            library,
            [
                (item: TrackModel) =>
                    sortBy.localeCompare('Added At')
                        ? item.stats.ctimeMs
                        : item.stats.mtimeMs,
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
