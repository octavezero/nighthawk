import { AppStoreModel } from '../stores/AppStoreModel';
// tslint:disable-next-line:import-name
import produce from 'immer';
import { TrackModel } from '../database/TracksDatabase';

export async function searchLibrary(value: string, state?: AppStoreModel) {
    if (value === '') {
        return produce(state, draft => {
            draft.library = draft.originalLibrary;
        });
    }
    return produce(state, draft => {
        draft.library = draft.originalLibrary.filter((row: TrackModel) => {
            // Match each of the three columns. Return if true
            if (row.common.title !== undefined) {
                if (
                    row.common.title
                        .toLowerCase()
                        .search(value.toLowerCase()) !== -1
                ) {
                    return true;
                }
            }
            if (row.common.artist !== undefined) {
                if (
                    row.common.artist
                        .toLowerCase()
                        .search(value.toLowerCase()) !== -1
                ) {
                    return true;
                }
            }
            if (row.common.album !== undefined) {
                if (
                    row.common.album
                        .toLowerCase()
                        .search(value.toLowerCase()) !== -1
                ) {
                    return true;
                }
            }

            // If nothing matches
            return false;
        });
    });
}
