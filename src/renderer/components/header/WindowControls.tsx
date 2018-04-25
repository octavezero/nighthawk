import * as React from 'react';
import * as os from 'os';
import { ButtonGroup } from '../elements/ButtonGroup';
import { Button } from '../elements/Button';
import { ipcRenderer } from 'electron';

export interface WindowControlsProps {}

export interface WindowControlsState {}

export default class Shell extends React.PureComponent<
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
