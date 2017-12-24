import * as React from 'react';
import TrackModel from '../models/TrackModel';
import { backendDispatcher } from '../dispatchers/backendDispatcher';
import Songs from '../components/library/Songs';
import { List } from 'immutable';

export interface LibraryProps {
}

export interface LibraryState {
	tracks: List<TrackModel>;
}

export default class Library extends React.Component<LibraryProps, LibraryState> {
	constructor(props: LibraryProps) {
		super(props);

		this.state = {
			tracks: List()
		};
	}

	initLibrary = (tracks: List<TrackModel>) => {
		this.setState({ tracks: tracks });
	}

	refreshLibrary = (tracks: List<TrackModel>) => {
		this.setState({ tracks: tracks });
	}

	componentDidMount() {
		backendDispatcher.addListener('INIT_LIBRARY', this.initLibrary);
		backendDispatcher.addListener('REFRESH_LIBRARY', this.refreshLibrary);
	}

	componentWillUnmount() {
		backendDispatcher.removeListener('INIT_LIBRARY', this.initLibrary);
		backendDispatcher.removeListener('REFRESH_LIBRARY', this.refreshLibrary);
	}

	render() {
		return (
			<div className='library'>
				<Songs tracks={this.state.tracks}/>
			</div>
		);
	}
}
