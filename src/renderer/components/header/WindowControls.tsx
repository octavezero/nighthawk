import * as React from 'react';
import * as os from 'os';
import { ButtonGroup } from '../elements/ButtonGroup';
import { Button } from '../elements/Button';
import { ipcRenderer } from 'electron';

export interface WindowControlsProps {
    unobtrusive: boolean;
}

export interface WindowControlsState {
    unobtrusive: boolean | undefined;
}

export default class Shell extends React.Component<
    WindowControlsProps,
    WindowControlsState
> {
    constructor(props: WindowControlsProps) {
        super(props);
        this.state = {
            unobtrusive: undefined,
        };
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

    static getDerivedStateFromProps(
        nextProps: WindowControlsProps,
        prevState: WindowControlsState
    ) {
        if (prevState.unobtrusive === undefined) {
            return { unobtrusive: nextProps.unobtrusive };
        }
        return null;
    }

    shouldComponentUpdate() {
        if (os.platform() === 'darwin') {
            return false;
        }
        return true;
    }

    renderControls = () => {
        if (os.platform() === 'darwin') {
            return <div className="window-controls macos" />;
        }

        return (
            <div className="window-controls">
                <ButtonGroup>
                    {this.state.unobtrusive && (
                        <Button
                            type="link"
                            className="minimize"
                            onClick={this.handleMinimizeClick}>
                            <svg x="0px" y="0px" viewBox="0 0 10 1">
                                <rect fill="#000000" width="10" height="1" />
                            </svg>
                        </Button>
                    )}
                    {this.state.unobtrusive && (
                        <Button
                            type="link"
                            className="resize"
                            onClick={this.handleMaximizeClick}>
                            <svg x="0px" y="0px" viewBox="0 0 10 10">
                                {/* prettier-ignore */}
                                <mask id="Mask">
                                        <rect fill="#FFFFFF" width="10" height="10"></rect>
                                        <path fill="#000000" d="M 3 1 L 9 1 L 9 7 L 8 7 L 8 2 L 3 2 L 3 1 z"/>
                                        <path fill="#000000" d="M 1 3 L 7 3 L 7 9 L 1 9 L 1 3 z"/>
                                    </mask>
                                {/* prettier-ignore */}
                                <path fill="#000000" d="M 2 0 L 10 0 L 10 8 L 8 8 L 8 10 L 0 10 L 0 2 L 2 2 L 2 0 z" mask="url(#Mask)"/>
                            </svg>
                        </Button>
                    )}
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
