import * as React from 'react';
import { Textbox } from '../elements/Textbox';
import { ButtonGroup } from '../elements/buttongroup';
import { Button } from '../elements/button';
import AppStore from '../../stores/AppStore';
import { SettingsActionEnum } from '../../actions/SettingsActions';

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
        this.props.store.settingsActions({
            type: SettingsActionEnum.SET_LIBRARY_PATH,
        });
    };

    handleRefreshLibrary = () => {
        this.props.store.refreshLibrary();
    };

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
