import * as React from 'react';
import { Button } from './Button';
import { Icon } from './Icon';
// tslint:disable-next-line:import-name
import ReactModal from 'react-modal';
import { ButtonGroup } from './ButtonGroup';

interface MessageBoxProps {
    heading: string;
    message: string;
    actionPerformed: (action: string) => void;
}

interface MessageBoxState {
    isOpen: boolean;
}

export class MessageBox extends React.Component<
    MessageBoxProps,
    MessageBoxState
> {
    constructor(props: MessageBoxProps) {
        super(props);
        ReactModal.setAppElement('#app');

        this.state = {
            isOpen: false,
        };
    }

    open = () => {
        this.setState({ isOpen: true });
    };

    private close = (action: string) => {
        this.setState({ isOpen: false });
        this.props.actionPerformed(action);
    };

    render() {
        return (
            <ReactModal
                isOpen={this.state.isOpen}
                shouldCloseOnOverlayClick={false}
                contentLabel={this.props.heading}
                onRequestClose={() => this.close('no')}
                className="message-box-container"
                overlayClassName="message-box-overlay">
                <div className="message-box-header">
                    <h5>{this.props.heading}</h5>
                    <Button
                        type="link"
                        icon={true}
                        onClick={() => this.close('no')}>
                        <Icon icon="window-close" />
                    </Button>
                </div>
                <div className="message-box-body">
                    <p>{this.props.message}</p>
                </div>
                <div className="message-box-footer">
                    <div />
                    <ButtonGroup>
                        <Button
                            type="default"
                            onClick={() => this.close('yes')}>
                            Yes
                        </Button>
                        <Button type="default" onClick={() => this.close('no')}>
                            No
                        </Button>
                    </ButtonGroup>
                </div>
            </ReactModal>
        );
    }
}
