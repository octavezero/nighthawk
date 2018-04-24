import { AppStoreModel, PlayerStoreModel } from '../stores/AppStoreModel';
import Player from '../libraries/Player';
import { shuffleList } from '../utilities/QueueUtils';
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
        }
    });
}

export async function shuffleToggle(
    state?: AppStoreModel
): Promise<AppStoreModel> {
    return produce<AppStoreModel>(state, draft => {
        let cursor;
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
    });
}

export function newQueue(index: number, state?: AppStoreModel) {
    return produce(state, draft => {
        draft.player.queue = [];
        draft.player.originalQueue = [];

        draft.player.originalQueue.push(draft.library[index]);
        draft.player.queue.push(draft.library[index]);
        draft.player.cursor = 0;
        draft.player.playing = true;

        Player.setAudioSrc(draft.player.queue[0].source);
        Player.play();
    });
}

export function existingQueue(index: number, state?: AppStoreModel) {
    return produce(state, draft => {
        draft.player.originalQueue.push(draft.library[index]);
        draft.player.queue.push(draft.library[index]);

        if (draft.player.queue.length === 1) {
            draft.player.cursor = 0;
            draft.player.playing = true;

            Player.setAudioSrc(draft.player.queue[0].source);
            Player.play();
        }
    });
}
