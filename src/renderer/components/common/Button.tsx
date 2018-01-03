import * as React from 'react';
import * as classNames from 'classnames';

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
	type: 'default' | 'primary' | 'link';
	icon?: boolean;
	tooltip?: string;
	tooltipPosition?: string;
}

export class Button extends React.Component<ButtonProps, any> {
	render() {
		const {
			type,
			className,
			icon,
			tooltip,
			tooltipPosition,
			...others
		  } = this.props;

		let buildClassNames: string = classNames(
			'btn',
			className,
			'btn-' + type,
			{'btn-icon': icon}
		);

		return (
			<button
				className={buildClassNames}
				aria-label={tooltip}
				data-tooltip-position={tooltipPosition}
				role='tooltip'
				onClick={this.props.onClick}
				{...others}>
					{this.props.children}
			</button>
		);
	}
}
