import { List } from 'immutable';
import { TrackModel } from '../database/TracksDatabase';

export interface AppStoreModel {
    settings: SettingsStoreModel;
    library: List<TrackModel>;
}

export interface SettingsStoreModel {
    library?: {
        path: string;
        sortBy: string;
        sortDirection: 'ASC' | 'DESC';
    };
}
