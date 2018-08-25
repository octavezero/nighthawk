import * as React from 'react';
import classnames from 'classnames';

interface EditableTextboxProps {
    className?: string;
    text: string;
    onChange: (value: string) => void;
    editable?: boolean;
}

interface EditableTextboxState {
    value: string;
    editable: boolean;
}

export class EditableTextbox extends React.PureComponent<
    EditableTextboxProps,
    EditableTextboxState
> {
    constructor(props: EditableTextboxProps) {
        super(props);

        this.state = {
            value: this.props.text,
            editable: false,
        };
    }

    handleEditableDoubleClick = () => {
        this.setState({ editable: true });
    };

    onChange = (e: any) => {
        this.setState({ value: e.target.value });
    };

    handleSubmit = () => {
        this.props.onChange(this.state.value);
        this.setState({ editable: false });
    };

    handleKeyDown = (event: any) => {
        if (event.which === 27) {
            this.setState({ value: this.props.text, editable: false });
        } else if (event.which === 13) {
            this.handleSubmit();
        }
    };

    render() {
        if (this.state.editable && this.props.editable) {
            const buildClassNames: string = classnames(
                'editable-textbox',
                this.props.className
            );
            return (
                <input
                    className={buildClassNames}
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyUp={this.handleKeyDown}
                    onBlur={this.handleSubmit}
                    autoFocus={true}
                />
            );
        }

        return (
            <p
                onDoubleClick={this.handleEditableDoubleClick}
                className={'editable-label ' + this.props.className}>
                {this.state.value}
            </p>
        );
    }
}
