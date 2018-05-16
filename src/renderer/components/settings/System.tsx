import * as React from 'react';
import { Textbox } from '../elements/Textbox';
import { ButtonGroup } from '../elements/ButtonGroup';
import { Button } from '../elements/Button';
import AppStore from '../../stores/AppStore';
import Notifications from '../../libraries/Notifications';
import { Checkbox } from '../elements/Checkbox';

export interface SystemSettingsProps {
    store: AppStore;
}

export interface SystemSettingsState {}

export default class SystemSettings extends React.Component<
    SystemSettingsProps,
    SystemSettingsState
> {
    constructor(props: SystemSettingsProps) {
        super(props);
    }

    handleObtrusiveCheckbox = (checked: boolean) => {
        this.props.store.settings.setUnobtrusiveMode(checked);
    };

    render() {
        const { store } = this.props;
        return (
            <div className="system-settings">
                <div className="settings-banner">
                    <h5>
                        These settings will work only after restarting the app
                    </h5>
                </div>
                <Checkbox
                    handleCheckedState={this.handleObtrusiveCheckbox}
                    checked={store.state.settings.system.unobtrusive}
                    value="Unobtrusive Mode"
                />
            </div>
        );
    }
}
