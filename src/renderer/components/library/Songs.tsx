import * as React from 'react';
import TrackModel from '../../models/TrackModel';

import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { Table, Column, RowMouseEventHandlerParams } from 'react-virtualized/dist/commonjs/Table';

import * as TimeUtils from '../../utilities/TimeUtils';
import { playerDispatcher } from '../../dispatchers/playerDispatcher';
import { List } from 'immutable';

export interface SongsProps {
	tracks: List<TrackModel>;
}

interface SongsState {
	tracks: List<TrackModel>;
}

export default class Songs extends React.Component<SongsProps, SongsState> {
	constructor(props: SongsProps) {
		super(props);

		this.state = {
			tracks: props.tracks
		};
	}

	rowGetter = ({ index }: {index: number}) => {
		return this.state.tracks.get(index);
	}

	refreshQueue = (info: RowMouseEventHandlerParams) => {
		//Uses es6 Destructing Assignment
		playerDispatcher.emit('REFRESH_QUEUE', this.state.tracks, info.index);
	}

	componentWillReceiveProps(nextProps: SongsProps) {
		this.setState({ tracks: nextProps.tracks });
	}

	render() {
		return (
			<AutoSizer>
				{({ height, width }) => (
					<Table
						headerHeight={40}
						height={height}
						rowCount={this.state.tracks.count()}
						rowGetter={this.rowGetter}
						rowHeight={40}
						width={width}
						onRowDoubleClick={this.refreshQueue}
					>
						<Column
							label='Name'
							cellDataGetter={({ rowData }: {rowData: TrackModel}) => rowData.common.title}
							dataKey='title'
							width={400} />
						<Column
							label='Artist'
							cellDataGetter={({ rowData }: {rowData: TrackModel}) => rowData.common.artist}
							dataKey='artist'
							width={250} />
						<Column
							label='Album'
							cellDataGetter={({ rowData }: {rowData: TrackModel}) => rowData.common.album}
							dataKey='album'
							width={300} />
						<Column
							label='Duration'
							// tslint:disable-next-line:max-line-length
							cellDataGetter={({ rowData }: {rowData: TrackModel}) => TimeUtils.parseToMinutes(rowData.format.duration !== undefined ? rowData.format.duration : 0)}
							dataKey='duration'
							width={100} />
					</Table>
				)}
			</AutoSizer>
		);
	}
}
