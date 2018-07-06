import { TrackModel } from '../database/TracksDatabase';
import { PlaylistModel } from '../database/PlaylistsDatabase';

export interface AppStoreModel {
    settings: SettingsStoreModel;
    originalLibrary: TrackModel[];
    library: TrackModel[];
    player: PlayerStoreModel;
    playlist: PlaylistStoreModel;
}

export interface PlayerStoreModel {
    queue: TrackModel[];
    originalQueue: TrackModel[];
    cursor: number;
    playing: boolean;
}

export interface PlaylistStoreModel {
    currentId: number;
    currentName: string;
    currentTracks: TrackModel[];
    playlists: PlaylistModel[];
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
        volume: number;
        mute: boolean;
    };
    system: {
        unobtrusive: boolean;
    };
    playlist: {
        folder: boolean;
    };
}
