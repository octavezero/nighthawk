import * as React from 'react';
import * as classNames from 'classnames';
import { Icon } from './Icon';

export interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
    handleCheckedState: (checked: boolean) => void;
    checked: boolean;
}

export interface CheckboxState {
    checked: boolean;
}

export class Checkbox extends React.PureComponent<
    CheckboxProps,
    CheckboxState
> {
    constructor(props: CheckboxProps) {
        super(props);

        this.state = {
            checked: props.checked,
        };
    }

    handleChange = () => {
        this.setState({ checked: !this.state.checked }, () => {
            this.props.handleCheckedState(this.state.checked);
        });
    };

    render() {
        return (
            <div className="checkbox-container">
                <input
                    className="checkbox"
                    type="checkbox"
                    checked={this.state.checked}
                    onChange={this.handleChange}
                />
                <label onClick={this.handleChange}>{this.props.value}</label>
            </div>
        );
    }
}
