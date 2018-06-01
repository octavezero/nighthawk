import { AppStoreModel, PlayerStoreModel } from '../stores/AppStoreModel';
import Player from '../libraries/Player';
import {
    shuffleList,
    updatePlayerStateCursor,
    updatePlayerState,
} from '../utilities/QueueUtils';
// tslint:disable-next-line:import-name
import produce from 'immer';

export async function togglePlayPause(
    state?: AppStoreModel
): Promise<AppStoreModel> {
    return produce<AppStoreModel>(state, draft => {
        draft.player.playing ? Player.pause() : Player.play();
        draft.player.playing = !draft.player.playing;
    });
}

export async function nextSong(state?: AppStoreModel): Promise<AppStoreModel> {
    return produce<AppStoreModel>(state, draft => {
        let cursor;
        if (draft.settings.player.repeat) {
            Player.replay();
        } else {
            cursor = draft.player.cursor + 1;
            cursor = cursor === draft.player.queue.length ? 0 : cursor;
            Player.setAudioSrc(draft.player.queue[cursor].source);
            Player.play();
            draft.player.cursor = cursor;
            updatePlayerStateCursor(cursor);
        }
    });
}

export async function prevSong(state?: AppStoreModel): Promise<AppStoreModel> {
    return produce<AppStoreModel>(state, draft => {
        let cursor;
        if (draft.settings.player.repeat) {
            Player.replay();
        } else {
            cursor = draft.player.cursor - 1;
            cursor = cursor === -1 ? draft.player.queue.length - 1 : cursor;
            Player.setAudioSrc(draft.player.queue[cursor].source);
            Player.play();
            draft.player.cursor = cursor;
            updatePlayerStateCursor(cursor);
        }
    });
}

export async function shuffleToggle(
    state?: AppStoreModel
): Promise<AppStoreModel> {
    return produce<AppStoreModel>(state, draft => {
        // Shuffle Code here. Use Fisher-Yates Shuffle Algorithm.
        const trackId = draft.player.queue[draft.player.cursor].id;

        if (draft.settings.player.shuffle) {
            const shuffled = shuffleList([...draft.player.queue]);
            draft.player.queue = shuffled;
            draft.player.cursor = shuffled.findIndex(i => i.id === trackId);
        } else {
            draft.player.queue = draft.player.originalQueue;
            draft.player.cursor = draft.player.originalQueue.findIndex(
                i => i.id === trackId
            );
        }
        updatePlayerStateCursor(draft.player.cursor);
    });
}

export async function seekSong(
    index: number,
    state?: AppStoreModel
): Promise<AppStoreModel> {
    return produce<AppStoreModel>(state, draft => {
        Player.setAudioSrc(draft.player.queue[index].source);
        Player.play();
        draft.player.cursor = index;
        updatePlayerStateCursor(index);
    });
}

export async function createPlayerQueue(
    index: number,
    state?: AppStoreModel
): Promise<AppStoreModel> {
    return produce<AppStoreModel>(state, draft => {
        const trackId = draft.library[index].id;
        if (draft.settings.player.shuffle) {
            let shuffled = shuffleList([...draft.library]);
            let newindex = shuffled.findIndex(i => i.id === trackId);
            Player.setAudioSrc(shuffled[newindex].source);
            Player.play();

            // Data Assignments
            draft.player.queue = shuffled;
            draft.player.originalQueue = draft.library;
            draft.player.cursor = newindex;
            draft.player.playing = true;
        } else {
            Player.setAudioSrc(draft.library[index].source);
            Player.play();
            // Data Assignments
            draft.player.queue = draft.library;
            draft.player.originalQueue = draft.library;
            draft.player.cursor = index;
            draft.player.playing = true;
        }

        let queue: number[] = draft.player.queue.map(value => value.id);
        updatePlayerState(queue, draft.player.cursor);
    });
}

export async function newQueue(index: number, state?: AppStoreModel) {
    return produce(state, draft => {
        draft.player.queue = [];
        draft.player.originalQueue = [];

        draft.player.originalQueue.push(draft.library[index]);
        draft.player.queue.push(draft.library[index]);
        draft.player.cursor = 0;
        draft.player.playing = true;

        Player.setAudioSrc(draft.player.queue[0].source);
        Player.play();
        updatePlayerState([draft.player.queue[0].id], 0);
    });
}

export async function existingQueue(index: number, state?: AppStoreModel) {
    return produce(state, draft => {
        draft.player.originalQueue.push(draft.library[index]);
        draft.player.queue.push(draft.library[index]);

        if (draft.settings.player.shuffle && draft.player.queue.length > 1) {
            const trackId = draft.player.queue[draft.player.cursor].id;
            let shuffled = shuffleList([...draft.player.queue]);
            let newindex = shuffled.findIndex(i => i.id === trackId);

            draft.player.queue = shuffled;
            draft.player.cursor = newindex;
        }

        if (draft.player.queue.length === 1) {
            draft.player.cursor = 0;
            draft.player.playing = true;

            Player.setAudioSrc(draft.player.queue[0].source);
            Player.play();
        }

        let queue: number[] = draft.player.queue.map(value => value.id);
        updatePlayerState(queue, draft.player.cursor);
    });
}

export async function removeFromQueue(index: number, state?: AppStoreModel) {
    return produce(state, draft => {
        let ind = draft.player.originalQueue.findIndex(
            element => element.id === draft.player.queue[index].id
        );
        if (index < draft.player.cursor) {
            draft.player.cursor -= 1;
        } else if (index === draft.player.cursor) {
            Player.setAudioSrc(draft.player.queue[index + 1].source);
            Player.play();
        }
        draft.player.originalQueue.splice(ind, 1);
        draft.player.queue.splice(index, 1);

        let queue: number[] = draft.player.queue.map(value => value.id);
        updatePlayerState(queue, draft.player.cursor);
    });
}

export async function clearQueue(state?: AppStoreModel) {
    return produce(state, draft => {
        draft.player.queue = [];
        draft.player.originalQueue = [];
        draft.player.playing = false;
        draft.player.cursor = -2;
        Player.reset();
        updatePlayerState([], -2);
    });
}
