import * as React from 'react';
import { Button } from '../elements/Button';
import { Icon } from '../elements/Icon';
import { Modal } from '../elements/Modal';
import SettingsContainer from '../../containers/SettingsContainer';

export interface HeaderActionsProps {}

export interface HeaderActionsState {
    isSettingsOpen: boolean;
}

export default class Shell extends React.PureComponent<
    HeaderActionsProps,
    HeaderActionsState
> {
    constructor(props: HeaderActionsProps) {
        super(props);

        this.state = {
            isSettingsOpen: false,
        };
    }

    handleOpenModal = () => {
        this.setState({ isSettingsOpen: true });
    };

    handleCloseModal = () => {
        this.setState({ isSettingsOpen: false });
    };

    render() {
        return (
            <>
                <Modal
                    isOpen={this.state.isSettingsOpen}
                    heading="Settings"
                    onRequestClose={this.handleCloseModal}
                    body={<SettingsContainer />}
                />
                <Button type="link" icon={true} onClick={this.handleOpenModal}>
                    <Icon size="16" icon="settings" />&nbsp; Settings
                </Button>
            </>
        );
    }
}
