// tslint:disable-next-line:import-name
import produce from 'immer';
import { sortTracks } from '../utilities/LibraryUtils';

import { AppStoreModel } from '../stores/AppStoreModel';
import { TrackModel, TracksDatabase } from '../database/TracksDatabase';
import { StateDatabase } from '../database/StateDatabase';
import Player from '../libraries/Player';

export async function init(state?: AppStoreModel) {
    const db: TracksDatabase = new TracksDatabase('library');
    let data = await db.library.toArray();
    db.close();

    const statedb: StateDatabase = new StateDatabase('state');
    let queueState = await statedb.queue.get(1);
    statedb.close();

    data = sortTracks(
        state.settings.library.sortBy,
        state.settings.library.sortDirection,
        data
    );

    let queue = queueState.queue.map(value => {
        return data.find(x => x.id === value);
    });

    if (queueState.cursor !== -2) {
        Player.setAudioSrc(queue[queueState.cursor].source);
    }

    return produce<AppStoreModel>(state, draft => {
        draft.library = data;
        draft.originalLibrary = data;
        draft.player.queue = queue;
        draft.player.originalQueue = queue;
        draft.player.cursor = queueState.cursor;
    });
}
