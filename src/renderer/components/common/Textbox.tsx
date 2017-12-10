import * as React from 'react';
import * as classNames from 'classnames';

export interface TextboxProps extends React.HTMLProps<HTMLInputElement> {
}

export class Textbox extends React.Component<TextboxProps, any> {
	render() {
		const {
			className,
			...others
		  } = this.props;

		let buildClassNames: string = classNames(
			'textbox',
			className,
		);

		return (
			<input className={buildClassNames} {...others}>
			</input>
		);
  }
}
