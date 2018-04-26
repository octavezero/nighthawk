import * as React from 'react';
import * as classNames from 'classnames';

export interface TextboxProps extends React.HTMLProps<HTMLInputElement> {}

export class Textbox extends React.PureComponent<TextboxProps, any> {
    render() {
        const { className, ...others } = this.props;

        const buildClassNames: string = classNames('textbox', className);

        return <input className={buildClassNames} {...others} />;
    }
}

export interface TextboxAddonProps extends React.HTMLProps<HTMLDivElement> {
    direction: 'left' | 'right';
}

export class TextboxAddon extends React.PureComponent<TextboxAddonProps, any> {
    render() {
        const { className, direction, children, ...others } = this.props;

        const buildClassNames: string = classNames(
            'textbox-addon',
            className,
            direction
        );

        return (
            <div className={buildClassNames} {...others}>
                {children}
            </div>
        );
    }
}
