import * as React from 'react';
import TrackModel from '../models/TrackModel';
import { backendDispatcher } from '../dispatchers/backendDispatcher';
import Songs from '../components/library/Songs';
import { List } from 'immutable';
import { playerDispatcher } from '../dispatchers/playerDispatcher';

export interface LibraryProps {
}

export interface LibraryState {
	tracks: List<TrackModel>;
	originalTracks: List<TrackModel>;
}

export default class Library extends React.Component<LibraryProps, LibraryState> {
	constructor(props: LibraryProps) {
		super(props);

		this.state = {
			tracks: List(),
			originalTracks: List()
		};
	}

	initLibrary = (tracks: List<TrackModel>) => {
		this.setState({ tracks: tracks, originalTracks: tracks });
	}

	refreshLibrary = (tracks: List<TrackModel>) => {
		this.setState({ tracks: tracks, originalTracks: tracks });
	}

	searchLibrary = async (value: string) => {
		//Add Searching Code here
		let tracks = this.state.originalTracks.filter((row: TrackModel) => {
			// Match each of the three columns. Return if true
			if (row.common.title != undefined) { if (row.common.title.toLowerCase().search(value.toLowerCase()) != -1) { return true; } }
			if (row.common.artist != undefined) { if (row.common.artist.toLowerCase().search(value.toLowerCase()) != -1) { return true; } }
			if (row.common.album != undefined) { if (row.common.album.toLowerCase().search(value.toLowerCase()) != -1) { return true; } }

			//If nothing matches
			return false;
		});
		this.setState({tracks: tracks});
	}

	searchClear = async () => {
		this.setState({ tracks: this.state.originalTracks });
	}

	componentDidMount() {
		backendDispatcher.addListener('INIT_LIBRARY', this.initLibrary);
		backendDispatcher.addListener('REFRESH_LIBRARY', this.refreshLibrary);

		playerDispatcher.addListener('SEARCH_LIBRARY', this.searchLibrary);
		playerDispatcher.addListener('SEARCH_LIBRARY_CLEAR', this.searchClear);
	}

	componentWillUnmount() {
		backendDispatcher.removeListener('INIT_LIBRARY', this.initLibrary);
		backendDispatcher.removeListener('REFRESH_LIBRARY', this.refreshLibrary);

		playerDispatcher.removeListener('SEARCH_LIBRARY', this.searchLibrary);
		playerDispatcher.removeListener('SEARCH_LIBRARY_CLEAR', this.searchClear);
	}

	render() {
		return (
			<div className='library'>
				<Songs tracks={this.state.tracks}/>
			</div>
		);
	}
}
