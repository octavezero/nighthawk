import * as React from 'react';
import TrackModel from '../models/TrackModel';
import { backendDispatcher } from '../dispatchers/backendDispatcher';
import Songs from '../components/library/Songs';

export interface LibraryProps {
}

export interface LibraryState {
	tracks: TrackModel[];
}

export default class Library extends React.Component<LibraryProps, LibraryState> {
	constructor(props: LibraryProps) {
		super(props);

		this.state = {
			tracks: []
		};
	}

	initLibrary = (tracks: TrackModel[]) => {
		this.setState({ tracks: tracks });
	}

	refreshLibrary = (tracks: TrackModel[]) => {
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

	renderSongs = () => {
		if (Array.isArray(this.state.tracks) && this.state.tracks.length) {
			return <Songs tracks={this.state.tracks}/>;
		} else {
			return <div></div>;
		}
	}

	render() {
		return (
			<div className='library'>
				{ this.renderSongs() }
			</div>
		);
	}
}
