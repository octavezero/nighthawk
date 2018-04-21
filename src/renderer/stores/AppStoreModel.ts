import { TrackModel } from '../database/TracksDatabase';

export interface AppStoreModel {
    settings: SettingsStoreModel;
    library: TrackModel[];
    player: PlayerStoreModel;
}

export interface PlayerStoreModel {
    queue: TrackModel[];
    originalQueue: TrackModel[];
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
