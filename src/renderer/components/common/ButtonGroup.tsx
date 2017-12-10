import * as React from 'react';
import * as classNames from 'classnames';

export interface ButtonGroupProps extends React.HTMLProps<HTMLDivElement> {
}

export class ButtonGroup extends React.Component<ButtonGroupProps, any> {
	render() {
		const {
			className,
			...others
		} = this.props;

		let buildClassNames: string = classNames(
			'btn-group',
			className,
		);
		return (
			<div className={buildClassNames} {...others}>
				{this.props.children}
			</div>
		);
	}
}
