// tslint:disable-next-line:import-name
import produce from 'immer';
import electronLog from 'electron-log';
import { sortTracks } from '../utilities/LibraryUtils';

import { AppStoreModel } from '../stores/AppStoreModel';
import { TrackModel, TracksDatabase } from '../database/TracksDatabase';
import { StateDatabase } from '../database/StateDatabase';
import Player from '../libraries/Player';
import Notifications from '../libraries/Notifications';

export async function init(state?: AppStoreModel) {
    const db: TracksDatabase = new TracksDatabase('library');
    const statedb: StateDatabase = new StateDatabase('state');

    try {
        let data = await db.library.toArray();
        db.close();

        let queueState = await statedb.queue.get(1);
        statedb.close();

        return produce<AppStoreModel>(state, draft => {
            draft.originalLibrary = data;
            draft.library = sortTracks(
                state.settings.library.sortBy,
                state.settings.library.sortDirection,
                draft.originalLibrary
            );

            draft.player.queue = queueState.queue.map(value => {
                return draft.library.find(x => x.id === value);
            });

            draft.player.originalQueue = queueState.originalQueue.map(value => {
                return draft.library.find(x => x.id === value);
            });

            if (queueState.cursor !== -2) {
                Player.setAudioSrc(
                    draft.player.queue[queueState.cursor].source
                );
            }

            draft.player.cursor = queueState.cursor;
        });
    } catch (error) {
        electronLog.error(error);
        Notifications.addNotification(
            'initerror',
            'Encountered an Error While Initializing Data. Please check the logs.',
            true
        );
        db.close();
        statedb.close();
        return state;
    }
}
