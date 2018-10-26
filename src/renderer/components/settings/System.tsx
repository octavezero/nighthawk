import * as React from 'react';
import { Textbox } from '../elements/Textbox';
import { ButtonGroup } from '../elements/ButtonGroup';
import { Button } from '../elements/Button';
import AppStore from '../../stores/AppStore';
import Notifications from '../../libraries/Notifications';
import { Checkbox } from '../elements/Checkbox';
import { Icon } from '../elements/Icon';
import { webFrame } from 'electron';

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

    handleZoomPlus = () => {
        if (webFrame.getZoomFactor() < 4) {
            let value = parseFloat((webFrame.getZoomFactor() + 0.1).toFixed(1));
            webFrame.setZoomFactor(value);
            this.props.store.settings.setZoomFactor(value);
        }
    };

    handleZoomMinus = () => {
        if (webFrame.getZoomFactor() > 0) {
            let value = parseFloat((webFrame.getZoomFactor() - 0.1).toFixed(1));
            webFrame.setZoomFactor(value);
            this.props.store.settings.setZoomFactor(value);
        }
    };

    handleResetZoom = () => {
        webFrame.setZoomFactor(1);
    };

    render() {
        const { store } = this.props;
        return (
            <div className="system-settings">
                <label>User Interface Zoom</label>
                <div className="settings-zoom">
                    <Button
                        type="link"
                        icon={true}
                        onClick={this.handleZoomMinus}>
                        <Icon size="16" icon="minus" />
                    </Button>
                    <Textbox
                        value={`${(
                            store.state.settings.system.zoomFactor * 100
                        ).toFixed()}%`}
                        readOnly
                    />
                    <Button
                        type="link"
                        icon={true}
                        onClick={this.handleZoomPlus}>
                        <Icon size="16" icon="plus" />
                    </Button>
                    <Button type="default" onClick={this.handleResetZoom}>
                        Reset Zoom
                    </Button>
                </div>
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
