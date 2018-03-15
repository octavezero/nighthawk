import * as React from 'react';
import { Button } from './Button';
import { Icon } from './Icon';
// tslint:disable-next-line:import-name
import ReactModal from 'react-modal';

export interface ModalProps {
    isOpen: boolean;
    heading: string;
    body: React.ReactNode;
    footer?: React.ReactNode;
    onRequestClose: () => void;
}

export class Modal extends React.Component<ModalProps, any> {
    constructor(props: ModalProps) {
        super(props);
        ReactModal.setAppElement('#app');
    }

    render() {
        return (
            <ReactModal
                isOpen={this.props.isOpen}
                contentLabel={this.props.heading}
                onRequestClose={this.props.onRequestClose}
                className="modal-container"
                overlayClassName="modal-overlay">
                <div className="modal-header">
                    <h5>{this.props.heading}</h5>
                    <Button
                        type="link"
                        icon={true}
                        onClick={this.props.onRequestClose}>
                        <Icon icon="window-close" />
                    </Button>
                </div>
                <div className="modal-body">{this.props.body}</div>
                <div className="modal-footer">{this.props.footer}</div>
            </ReactModal>
        );
    }
}
