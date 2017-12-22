import * as React from 'react';
import { Button } from './Button';

export interface SliderProps {
	min?: number;
	max?: number;
	value?: number;
	step?: number;
	position?: string;
	readonly onChange: (value: number) => void;
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
		position: 'top'
	};

	constructor(props: SliderProps) {
		super(props);

		this.state = {
			value: this.props.value!,
			displayValue: this.roundValue(((this.props.value! - this.props.min!) / (this.props.max! - this.props.min!)) * 100)
		};
	}

	roundValue = (value: number): number => {
		return Math.round(value);
	}

	roundActualValue = (value: number): number => {
		let v: number = (value * (this.props.max! - this.props.min!) / 100) + this.props.min!;
		return Math.round(v);
	}

	handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
		let val = (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * 100;

		//this.setState({ displayValue: this.roundValue(val) });
		//this.setState({ value: this.roundActualValue(val) });
		this.props.onChange(this.roundActualValue(val));
	}

	handleThumbClick = (e: any) => {
		e.stopPropagation();
	}

	componentWillReceiveProps(nextProps: SliderProps) {
		this.setState({
			value: nextProps.value!,
			displayValue: this.roundValue(((nextProps.value! - nextProps.min!) / (nextProps.max! - nextProps.min!)) * 100)
		});
	}

	render() {
		return (
			<div className='slider' onClick={this.handleTrackClick} >
				<div className='slider-fill' style={{ width: this.state.displayValue + '%' }}>
					<Button type='default' className='slider-thumb' onClick={this.handleThumbClick}></Button>
				</div>
			</div>
		);
	}
}

export default Slider;
