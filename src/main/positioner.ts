import { BrowserWindow, Rectangle, screen } from 'electron';

export default function positioner(
    window: BrowserWindow,
    trayBounds: Rectangle
) {
    let position = calculate(window.getSize(), window.getBounds(), trayBounds);
    window.setPosition(position.x, position.y);
}

function calculate(
    windowSize: number[],
    windowBounds: Rectangle,
    trayBounds: Rectangle
) {
    let screenSize = getScreenSize();
    let taskbarPosition = getTaskbarPosition();
    let x: number;
    let y: number;

    switch (taskbarPosition) {
        case 'left':
            x = screenSize.x;
            y = Math.floor(screenSize.height - (windowSize[1] - screenSize.y));
            break;

        case 'right':
            x = Math.floor(screenSize.x + (screenSize.width - windowSize[0]));
            y = Math.floor(screenSize.height - (windowSize[1] - screenSize.y));
            break;

        case 'bottom':
            x = Math.floor(screenSize.x + (screenSize.width - windowSize[0]));
            y = Math.floor(screenSize.height - (windowSize[1] - screenSize.y));
            break;

        case 'top':
            x = Math.floor(screenSize.x + (screenSize.width - windowSize[0]));
            y = screenSize.y;
            break;
    }

    return { x, y };
}

function getTaskbarPosition(): string {
    const display = screen.getDisplayNearestPoint(
        screen.getCursorScreenPoint()
    );
    let retval: string;
    if (display.workArea.y > 0) {
        retval = 'top';
    } else if (display.workArea.x > 0) {
        retval = 'left';
    } else if (display.workArea.width === display.bounds.width) {
        retval = 'bottom';
    } else {
        retval = 'right';
    }

    return retval;
}

function getScreenSize() {
    return screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
        .workArea;
}
