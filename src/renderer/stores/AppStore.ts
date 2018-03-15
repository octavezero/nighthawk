import { Container } from 'unstated';

export interface AppState {}

export class AppStore extends Container<AppState> {
    state: AppState = {};
}
