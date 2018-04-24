import { BrowserWindow, screen } from 'electron';
// tslint:disable-next-line:import-name
import Store from 'electron-store';
import debounce from 'lodash/debounce';

export default function manageWindowState(defaults: WindowState) {
    // Grab initial bounds here
    let store = new Store<WindowState>({ name: 'window-state' });
    let state: WindowState = store.store;

    if (state.displayBounds !== undefined) {
        let bounds = screen.getDisplayMatching({
            x: state.x!,
            y: state.y!,
            width: state.width!,
            height: state.height!,
        }).bounds;

        if (
            bounds.height < state.displayBounds.height! ||
            bounds.width < state.width!
        ) {
            state.height = defaults.height;
            state.width = defaults.width;
        } else {
            state.height =
                state.height === undefined ? defaults.height : state.height;
            state.width =
                state.width === undefined ? defaults.width : state.width;
        }
    } else {
        state.height =
            state.height === undefined ? defaults.height : state.height;
        state.width = state.width === undefined ? defaults.width : state.width;
    }

    const trackResize = (win: BrowserWindow) => {
        let stateChangeTimer: NodeJS.Timer;
        win.on(
            'resize',
            debounce(() => {
                store.store = Object.assign({}, win.getBounds(), {
                    displayBounds: screen.getDisplayMatching(win.getBounds())
                        .bounds,
                });
            }, 1000)
        );
    };

    return {
        trackResize,
        width: state.width,
        height: state.height,
    };
}

export interface WindowState {
    x?: number;
    y?: number;
    width?: number;
    height?: number;

    displayBounds?: Electron.Rectangle;
}
