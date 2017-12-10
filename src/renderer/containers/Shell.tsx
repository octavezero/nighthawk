import * as React from 'react';

import Titlebar from './Titlebar';

//imports stylesheet
import '../styles/app.scss';

export interface ShellProps {
}

export interface ShellState {
}

export default class Shell extends React.Component<ShellProps, ShellState> {
	constructor(props: ShellProps) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<>
				<Titlebar />
			</>
		);
	}
}
