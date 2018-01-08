import * as React from 'react';
import TrackModel from '../../models/TrackModel';
import * as SettingsActions from '../../actions/SettingsActions';

import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { Table, Column, RowMouseEventHandlerParams } from 'react-virtualized/dist/commonjs/Table';

import * as TimeUtils from '../../utilities/TimeUtils';
import { playerDispatcher } from '../../dispatchers/playerDispatcher';
import { List } from 'immutable';
import EmptyState from './EmptyState';

export interface SongsProps {
	tracks: List<TrackModel>;
}

interface SongsState {
	tracks: List<TrackModel>;
	sortBy: string;
	sortDirection: 'ASC' | 'DESC';
}

export default class Songs extends React.Component<SongsProps, SongsState> {
	constructor(props: SongsProps) {
		super(props);
		let settings = SettingsActions.getLibrarySettings();

		this.state = {
			tracks: this.sortList(props.tracks, 'title', 'ASC'),
			sortBy: settings == undefined || settings.sortBy == undefined ? 'title' : settings.sortBy,
			sortDirection: settings == undefined || settings.sortDirection == undefined ? 'ASC' : settings.sortDirection
		};
	}

	noRowsRenderer = () => {
		return <EmptyState />;
	}

	rowGetter = ({ index }: {index: number}) => {
		return this.state.tracks.get(index);
	}

	handleTableSort = ({sortBy, sortDirection}: {sortBy: string, sortDirection: 'ASC'|'DESC'}) => {
		// Sort List based on parameters provided by table
		this.setState({
			tracks: this.sortList(this.state.tracks, sortBy, sortDirection),
			sortBy: sortBy,
			sortDirection: sortDirection
		});
		SettingsActions.saveLibrarySettings({ sortBy: sortBy, sortDirection: sortDirection });
	}

	sortList = (tracks: List<TrackModel>, sortBy: string, sortDirection: 'ASC'|'DESC') => {
		if (!sortBy.localeCompare('title')) {
			return tracks
			.sortBy(item => item.common['title'])
			.update(list => (sortDirection === 'DESC' ? list.reverse() : list));
		} else {
			/*
				Sorting the list based on compound attributes such as Artists, Lists, etc.
				Divides the lists into chunks based on sortBy, sorts the list according to title
				then merges the list.
			*/
			let list: List<TrackModel> = List();

			//Group the list into individual lists on sortBy attribute
			tracks.groupBy((value) => value.common[sortBy])
			.sort((a: List<TrackModel>, b: List<TrackModel>) => {
				//Sort the groups based on the sortBy attribute
				return a.get(0)!.common[sortBy].localeCompare(b.get(0)!.common[sortBy]);
			})
			.forEach((value, key) => {
				// Merge the individual lists into one
				list = list.concat(value.toList().sortBy(item => item.common['title']));
			});

			return list.update(list => (sortDirection === 'DESC' ? list.reverse() : list));
		}
	}

	refreshQueue = (info: RowMouseEventHandlerParams) => {
		//Uses es6 Destructing Assignment
		playerDispatcher.emit('REFRESH_QUEUE', this.state.tracks, info.index);
	}

	componentWillReceiveProps(nextProps: SongsProps) {
		this.setState({tracks: this.sortList(nextProps.tracks, this.state.sortBy, this.state.sortDirection)});
	}

	render() {
		return (
			<AutoSizer>
				{({ height, width }) => (
					<Table
						headerHeight={34}
						height={height}
						rowCount={this.state.tracks.count()}
						rowGetter={this.rowGetter}
						rowHeight={30}
						width={width}
						noRowsRenderer={this.noRowsRenderer}
						onRowDoubleClick={this.refreshQueue}
						sort={this.handleTableSort}
						sortBy={this.state.sortBy}
						sortDirection={this.state.sortDirection}
					>
						<Column
							label='Name'
							cellDataGetter={({ rowData }: {rowData: TrackModel}) => rowData.common.title}
							dataKey='title'
							width={( width - 20 ) * (31 / 100)} />
						<Column
							label='Artist'
							cellDataGetter={({ rowData }: {rowData: TrackModel}) => rowData.common.artist}
							dataKey='artist'
							width={( width - 20 ) * (31 / 100)} />
						<Column
							label='Album'
							cellDataGetter={({ rowData }: {rowData: TrackModel}) => rowData.common.album}
							dataKey='album'
							width={( width - 20 ) * (31 / 100)} />
						<Column
							label='Duration'
							// tslint:disable-next-line:max-line-length
							cellDataGetter={({ rowData }: {rowData: TrackModel}) => TimeUtils.parseToMinutes(rowData.format.duration !== undefined ? rowData.format.duration : 0)}
							dataKey='duration'
							disableSort={true}
							width={( width - 20 ) * (7 / 100)} />
					</Table>
				)}
			</AutoSizer>
		);
	}
}
