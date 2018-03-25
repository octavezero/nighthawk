import { List } from 'immutable';
import { AppStoreModel, PlayerStoreModel } from '../stores/AppStoreModel';
import Player from '../libraries/Player';

export enum PlayerActionEnum {
    TOGGLE_PLAY_PAUSE,
    NEXT_SONG,
    PREV_SONG,
    RESTART_SONG,
}

export interface PlayerActionType {
    type: PlayerActionEnum;
    data?: any;
}

export function createPlayerQueue(index: number, store: AppStoreModel) {
    Player.setAudioSrc(store.library.get(index).source);
    Player.play();
    return { queue: store.library, cursor: index, playing: true };
}

export function playerControls(action: PlayerActionType, store: AppStoreModel) {
    let cursor;
    switch (action.type) {
        case PlayerActionEnum.TOGGLE_PLAY_PAUSE:
            store.player.playing ? Player.pause() : Player.play();
            return { playing: !store.player.playing };
        case PlayerActionEnum.NEXT_SONG:
            cursor = store.player.cursor + 1;
            cursor = cursor === store.player.queue.count() ? 0 : cursor;
            Player.setAudioSrc(store.library.get(cursor).source);
            Player.play();
            return { cursor };
        case PlayerActionEnum.PREV_SONG:
            cursor = store.player.cursor - 1;
            cursor = cursor === -1 ? store.player.queue.count() - 1 : cursor;
            Player.setAudioSrc(store.library.get(cursor).source);
            Player.play();
            return { cursor };
        default:
            break;
    }
}
