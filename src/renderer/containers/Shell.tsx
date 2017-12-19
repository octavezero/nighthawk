import Player from './Player';
import * as React from 'react';
import * as AppActions from '../actions/AppActions';

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

	componentDidMount() {
		// All the states that require database or IO are initialized here
		AppActions.init();
	}

	render() {
		return (
			<>
				<Titlebar />
				<Player />
			</>
		);
	}
}
