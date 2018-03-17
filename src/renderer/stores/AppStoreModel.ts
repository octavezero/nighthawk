export interface AppStoreModel {
    settings: SettingsStoreModel;
}

export interface SettingsStoreModel {
    library?: {
        path: string;
        sortBy: string;
        sortDirection: 'ASC' | 'DESC';
    };
}
