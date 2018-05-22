import * as React from 'react';
import { Button } from './Button';

export interface SliderProps {
    min?: number;
    max?: number;
    value?: number;
    step?: number;
    position?: string;
    readonly onChange?: (value: number) => void;
}

interface SliderState {
    value: number;
    displayValue: number;
}

class Slider extends React.Component<SliderProps, SliderState> {
    public static defaultProps: Partial<SliderProps> = {
        step: 1,
        min: 0,
        max: 100,
        value: 0,
        position: 'top',
    };

    constructor(props: SliderProps) {
        super(props);

        this.state = {
            value: this.props.value!,
            displayValue: this.roundValue(
                (this.props.value! - this.props.min!) /
                    (this.props.max! - this.props.min!) *
                    100
            ),
        };
    }

    roundValue = (value: number): number => {
        return Math.round(value);
    };

    roundActualValue = (value: number): number => {
        let v: number =
            value * (this.props.max! - this.props.min!) / 100 + this.props.min!;
        return Math.round(v);
    };

    handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
        let val = e.nativeEvent.offsetX / e.currentTarget.clientWidth * 100;

        this.props.onChange(this.roundActualValue(val));
    };

    handleThumbClick = (e: any) => {
        e.stopPropagation();
    };

    static getDerivedStateFromProps(nextProps: SliderProps) {
        return {
            value: nextProps.value!,
            displayValue: Math.round(
                (nextProps.value! - nextProps.min!) /
                    (nextProps.max! - nextProps.min!) *
                    100
            ),
        };
    }

    render() {
        return (
            <div className="slider" onClick={this.handleTrackClick}>
                <div
                    className="slider-fill"
                    style={{
                        width: isNaN(this.state.displayValue)
                            ? '0px'
                            : `${this.state.displayValue}%`,
                    }}>
                    <Button
                        data-rh={this.state.value}
                        type="default"
                        className="slider-thumb"
                        onClick={this.handleThumbClick}
                    />
                </div>
            </div>
        );
    }
}

export default Slider;
