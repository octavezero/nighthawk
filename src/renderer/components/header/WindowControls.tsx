import * as React from 'react';
import * as os from 'os';
import { ButtonGroup } from '../elements/ButtonGroup';
import { Button } from '../elements/Button';
import { ipcRenderer } from 'electron';

export interface WindowControlsProps {}

export interface WindowControlsState {}

export default class Shell extends React.Component<
    WindowControlsProps,
    WindowControlsState
> {
    constructor(props: WindowControlsProps) {
        super(props);
    }

    handleMinimizeClick = () => {
        ipcRenderer.send('WINDOW_MINIMIZE');
    };

    handleMaximizeClick = () => {
        ipcRenderer.send('WINDOW_MAXIMIZE');
    };

    handleCloseClick = () => {
        ipcRenderer.send('WINDOW_QUIT');
    };

    renderControls = () => {
        if (os.platform() === 'darwin') {
            return <div className="window-controls macos" />;
        }

        return (
            <div className="window-controls">
                <ButtonGroup>
                    <Button
                        type="link"
                        icon={true}
                        className="minimize"
                        onClick={this.handleMinimizeClick}>
                        <svg x="0px" y="0px" viewBox="0 0 10 1">
                            <rect fill="#000000" width="10" height="1" />
                        </svg>
                    </Button>
                    <Button
                        type="link"
                        icon={true}
                        className="resize"
                        onClick={this.handleMaximizeClick}>
                        <svg x="0px" y="0px" viewBox="0 0 10 10">
                            {/* prettier-ignore */}
                            <path fill="#000000" d="M 0 0 L 0 10 L 10 10 L 10 0 L 0 0 z M 1 1 L 9 1 L 9 9 L 1 9 L 1 1 z "/>
                        </svg>
                    </Button>
                    <Button
                        type="link"
                        icon={true}
                        className="close"
                        onClick={this.handleCloseClick}>
                        <svg x="0px" y="0px" viewBox="0 0 10 10">
                            {/* prettier-ignore */}
                            <polygon fill="#000000" points="10,1 9,0 5,4 1,0 0,1 4,5 0,9 1,10 5,6 9,10 10,9 6,5"></polygon>
                        </svg>
                    </Button>
                </ButtonGroup>
            </div>
        );
    };

    render() {
        return this.renderControls();
    }
}
