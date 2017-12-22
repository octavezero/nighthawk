import * as React from 'react';
import TrackModel from '../../models/TrackModel';

import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { Table, Column, RowMouseEventHandlerParams } from 'react-virtualized/dist/commonjs/Table';

import * as TimeUtils from '../../utilities/TimeUtils';
import { playerDispatcher } from '../../dispatchers/playerDispatcher';

export interface SongsProps {
	tracks: TrackModel[];
}

interface SongsState {

}

export default class Songs extends React.Component<SongsProps, SongsState> {
	constructor(props: SongsProps) {
		super(props);

		this.state = {
		};
	}

	rowGetter = ({ index }: {index: number}) => {
		return this.props.tracks[index];
	}

	refreshQueue = (info: RowMouseEventHandlerParams) => {
		//Uses es6 Destructing Assignment
		playerDispatcher.emit('REFRESH_QUEUE', [...this.props.tracks], info.index);
	}

	render() {
		return (
			<AutoSizer>
				{({ height, width }) => (
					<Table
						headerHeight={40}
						height={height}
						rowCount={this.props.tracks.length}
						rowGetter={({ index }: {index: number}) => this.props.tracks[index]}
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
