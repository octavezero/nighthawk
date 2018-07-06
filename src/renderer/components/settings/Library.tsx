import * as React from 'react';
import { Textbox } from '../elements/Textbox';
import { ButtonGroup } from '../elements/ButtonGroup';
import { Button } from '../elements/Button';
import AppStore from '../../stores/AppStore';

export interface LibrarySettingsProps {
    store: AppStore;
}

export interface LibrarySettingsState {}

export default class LibrarySettings extends React.Component<
    LibrarySettingsProps,
    LibrarySettingsState
> {
    constructor(props: LibrarySettingsProps) {
        super(props);
    }

    handlePathChange = () => {
        this.props.store.settings.setLibraryPath();
    };

    handleRefreshLibrary = () => {
        this.props.store.library
            .refreshLibrary()
            .then(() => this.props.store.playlist.createFolderPlaylists());
    };

    shouldComponentUpdate(
        nextProps: LibrarySettingsProps,
        nextState: LibrarySettingsState
    ) {
        return (
            this.props.store.state.settings.library !==
            nextProps.store.state.settings.library
        );
    }

    render() {
        const { store } = this.props;
        return (
            <div className="library-settings">
                <label>Library Path</label>
                <Textbox
                    onClick={this.handlePathChange}
                    value={store.state.settings.library.path}
                    readOnly
                />
                <ButtonGroup className="library-settings-group">
                    <Button onClick={this.handleRefreshLibrary} type="primary">
                        Refresh Library Now
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
}
