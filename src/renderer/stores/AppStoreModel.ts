import { List } from 'immutable';
import { TrackModel } from '../database/TracksDatabase';

export interface AppStoreModel {
    settings: SettingsStoreModel;
    library: List<TrackModel>;
    player: PlayerStoreModel;
}

export interface PlayerStoreModel {
    queue: List<TrackModel>;
    originalQueue: List<TrackModel>;
    cursor: number;
    playing: boolean;
}

export interface SettingsStoreModel {
    library: {
        path: string;
        sortBy: string;
        sortDirection: 'ASC' | 'DESC';
    };
    player: {
        shuffle: boolean;
        repeat: boolean;
    };
}
