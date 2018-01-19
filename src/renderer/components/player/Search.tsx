import { playerDispatcher } from '../../dispatchers/playerDispatcher';
import * as React from 'react';
import { Textbox } from '../common/Textbox';

export interface SearchProps {
}

interface SearchState {
	searchTerm: string;
}

export default class Search extends React.Component<SearchProps, SearchState> {
	constructor(props: SearchProps) {
		super(props);

		this.state = {
			searchTerm: ''
		};
	}

	handleChange = (event: any) => {
		if (event.target.value == '') {
			playerDispatcher.emit('SEARCH_LIBRARY_CLEAR');
			this.setState({searchTerm: event.target.value});
		} else {
			playerDispatcher.emit('SEARCH_LIBRARY', this.state.searchTerm);
			this.setState({searchTerm: event.target.value});
		}
	}

	render() {
		return(
			<div className='search'>
				<Textbox placeholder='Search' value={this.state.searchTerm} onChange={this.handleChange}/>
			</div>
		);
	}
}
