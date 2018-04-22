import * as React from 'react';
import * as classNames from 'classnames';

export interface IconProps {
    size?: string;
    className?: string;
    icon: string;
}

export class Icon extends React.PureComponent<IconProps, any> {
    public static defaultProps: Partial<IconProps> = {
        size: '16',
        className: '',
    };
    constructor(props: IconProps) {
        super(props);
    }
    render() {
        const buildClassNames: string = classNames(
            'mdi',
            'mdi-' + this.props.size + 'px',
            'mdi-' + this.props.icon,
            this.props.className
        );

        return <i className={buildClassNames} />;
    }
}
