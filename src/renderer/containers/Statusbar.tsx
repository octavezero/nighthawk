import * as React from 'react';
import { backendDispatcher } from '../dispatchers/backendDispatcher';

export interface StatusbarProps {
	trackCount: number;
}

interface StatusbarState {
	refreshStatus: boolean;
}

export default class Statusbar extends React.Component<StatusbarProps, StatusbarState> {
	constructor(props: StatusbarProps) {
		super(props);

		this.state = {
			refreshStatus: false
		};
	}

	showRefreshStatus = () => {
		this.setState({refreshStatus: true});
	}

	hideRefreshStatus = () => {
		this.setState({refreshStatus: false});
	}

	componentDidMount() {
		backendDispatcher.addListener('STATUSBAR_SHOW_REFRESH', this.showRefreshStatus);
		backendDispatcher.addListener('STATUSBAR_HIDE_REFRESH', this.hideRefreshStatus);
	}

	componentWillUnmount() {
		backendDispatcher.removeListener('STATUSBAR_SHOW_REFRESH', this.showRefreshStatus);
		backendDispatcher.removeListener('STATUSBAR_HIDE_REFRESH', this.hideRefreshStatus);
	}

	renderProgressBar = () => {
		if (this.state.refreshStatus == true) {
			return (
				<div className='progress'>
					<p>Refreshing Library</p>
					<progress />
				</div>
			);
		} else {
			return <div />;
		}
	}

	render() {
		return(
			<div className='statusbar' >
				<p>Tracks in Library: {this.props.trackCount}</p>
				{this.renderProgressBar()}
				<p>Currently Browsing Library</p>
			</div>
		);
	}
}
