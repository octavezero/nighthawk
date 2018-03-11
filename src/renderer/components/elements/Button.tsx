import * as React from 'react';
import * as classNames from 'classnames';

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    type: 'default' | 'primary' | 'link';
    icon?: boolean;
}

export class Button extends React.Component<ButtonProps, any> {
    render() {
        const { type, className, icon, ...others } = this.props;

        const buildClassNames: string = classNames(
            'btn',
            className,
            'btn-' + type,
            { 'btn-icon': icon }
        );

        return (
            <button
                className={buildClassNames}
                onClick={this.props.onClick}
                {...others}>
                {this.props.children}
            </button>
        );
    }
}
