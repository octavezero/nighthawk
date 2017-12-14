import * as React from 'react';
import { ReactNode } from 'react';
import { Button } from './Button';
import { Icon } from './Icon';
import * as classNames from 'classnames';

export interface ModalProps {
	className?: string;
	heading: string;
	footer?: ReactNode;
	body: ReactNode;
	isActive: boolean;
}

interface ModalState {
	modalClassNames: string;
}

export class Modal extends React.Component<ModalProps, ModalState> {
	public static defaultProps: Partial<ModalProps> = {
		className: '',
		footer: <div></div>
	};

	constructor(props: ModalProps) {
		super(props);

		this.state = {
			modalClassNames: 'modal'
		};
	}

	componentWillReceiveProps(nextProps: ModalProps) {
		if (nextProps.isActive == true) {
			this.showModal();
		} else {
			this.hideModal();
		}
	}

	hideModal = () => {
		this.setState({modalClassNames: 'modal'});
	}

	showModal = () => {
		this.setState({modalClassNames: 'modal active'});
	}

	render() {
		const {
			className,
			isActive,
			...others
		} = this.props;

		let buildClassNames: string = classNames(
			'modal-container',
			className
		);

		return (
			<div className={this.state.modalClassNames}>
				<div className='modal-overlay' onClick={this.hideModal}></div>
				<div className={buildClassNames}>
					<div className='modal-header' {...others}>
						<h5>{this.props.heading}</h5>
						<Button type='link' icon={true} onClick={this.hideModal}>
							<Icon icon='window-close' />
						</Button>
					</div>
					<div className='modal-body'>
						{this.props.body}
					</div>
					<div className='modal-footer'>
						{this.props.footer}
					</div>
				</div>
			</div>
		);
	}
}
