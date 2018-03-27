import { List } from 'immutable';
import { AppStoreModel, PlayerStoreModel } from '../stores/AppStoreModel';
import Player from '../libraries/Player';
import { shuffleList } from '../utilities/QueueUtils';

export enum PlayerActionEnum {
    TOGGLE_PLAY_PAUSE,
    NEXT_SONG,
    PREV_SONG,
    RESTART_SONG,
    SHUFFLE_TOGGLE,
    REPEAT_TOGGLE,
}

export interface PlayerActionType {
    type: PlayerActionEnum;
    data?: any;
}

export function createPlayerQueue(index: number, store: AppStoreModel) {
    const trackId = store.library.get(index).id;
    if (store.settings.player.shuffle) {
        let shuffled = shuffleList(store.library);
        let newindex = shuffled.findIndex(i => i.id === trackId);
        Player.setAudioSrc(shuffled.get(newindex).source);
        Player.play();
        return {
            queue: shuffled,
            originalQueue: store.library,
            cursor: newindex,
            playing: true,
        };
    }
    Player.setAudioSrc(store.library.get(index).source);
    Player.play();
    return {
        queue: store.library,
        originalQueue: store.library,
        cursor: index,
        playing: true,
    };
}

export function playerControls(action: PlayerActionType, store: AppStoreModel) {
    let cursor;
    switch (action.type) {
        case PlayerActionEnum.TOGGLE_PLAY_PAUSE:
            store.player.playing ? Player.pause() : Player.play();
            return { playing: !store.player.playing };

        case PlayerActionEnum.NEXT_SONG:
            if (store.settings.player.repeat) {
                Player.replay();
                return {};
            }
            cursor = store.player.cursor + 1;
            cursor = cursor === store.player.queue.count() ? 0 : cursor;
            Player.setAudioSrc(store.player.queue.get(cursor).source);
            Player.play();
            return { cursor };

        case PlayerActionEnum.PREV_SONG:
            if (store.settings.player.repeat) {
                Player.replay();
                return {};
            }
            cursor = store.player.cursor - 1;
            cursor = cursor === -1 ? store.player.queue.count() - 1 : cursor;
            Player.setAudioSrc(store.player.queue.get(cursor).source);
            Player.play();
            return { cursor };

        case PlayerActionEnum.SHUFFLE_TOGGLE:
            // Shuffle Code here. Use Fisher-Yates Shuffle Algorithm.
            const trackId = store.player.queue.get(store.player.cursor).id;

            if (store.settings.player.shuffle) {
                const shuffled = shuffleList(store.player.queue);
                return {
                    queue: shuffled,
                    cursor: shuffled.findIndex(i => i.id === trackId),
                };
            }
            return {
                queue: store.player.originalQueue,
                cursor: store.player.originalQueue.findIndex(
                    i => i.id === trackId
                ),
            };
        default:
            break;
    }
}
