import * as React from 'react';
import {
    Table,
    Column,
    RowMouseEventHandlerParams,
} from 'react-virtualized/dist/es/Table';
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer';
import { TrackModel } from '../../database/TracksDatabase';
import { ContextMenu, ContextMenuItem } from '../elements/ContextMenu';
import AppStore from '../../stores/AppStore';
import * as TimeUtils from '../../utilities/TimeUtils';

interface TracksProps {
    store: AppStore;
}

interface TracksState {
    contextParams: { x: number; y: number; index: number };
}

export default class Tracks extends React.Component<TracksProps, TracksState> {
    constructor(props: TracksProps) {
        super(props);

        this.state = {
            contextParams: {
                x: 0,
                y: 0,
                index: -1,
            },
        };
    }

    rowGetter = ({ index }: { index: number }) => {
        return this.props.store.state.playlist.currentTracks[index];
    };

    noRowsRenderer = () => {
        return <h6>Empty Playlist</h6>;
    };

    rowClassName = ({ index }: { index: number }) => {
        return index % 2 === 0 ? 'even-row' : 'odd-row';
    };

    onRowDoubleClick = (info: RowMouseEventHandlerParams) => {
        this.props.store.player.createPlayerQueueFromPlaylist(info.index);
    };

    handleTableSort = ({
        sortBy,
        sortDirection,
    }: {
        sortBy: string;
        sortDirection: 'ASC' | 'DESC';
    }) => {
        // Sort Playlists Here
    };

    handleRowRightClick = (params: {
        event: React.MouseEvent<any>;
        index: number;
    }) => {
        this.setState({
            contextParams: {
                x: params.event.clientX,
                y: params.event.clientY,
                index: params.index,
            },
        });
    };

    handleContextMenuItemClick = (data: string) => {
        switch (data) {
            case 'existing':
                this.props.store.player.existingQueueFromPlaylist(
                    this.state.contextParams.index
                );
                break;
            case 'new':
                this.props.store.player.newQueueFromPlaylist(
                    this.state.contextParams.index
                );
                break;
        }
    };

    render() {
        const { store } = this.props;
        return (
            <div className="songs">
                <ContextMenu
                    x={this.state.contextParams.x}
                    y={this.state.contextParams.y}>
                    <ContextMenuItem
                        data="existing"
                        onClick={this.handleContextMenuItemClick}>
                        Add Track To Existing Queue
                    </ContextMenuItem>
                    <ContextMenuItem
                        data="new"
                        onClick={this.handleContextMenuItemClick}>
                        Add Track To New Queue
                    </ContextMenuItem>
                </ContextMenu>
                <AutoSizer>
                    {({ height, width }) => (
                        <Table
                            headerHeight={26}
                            rowGetter={this.rowGetter}
                            noRowsRenderer={this.noRowsRenderer}
                            height={height}
                            rowHeight={28}
                            rowCount={store.state.playlist.currentTracks.length}
                            rowClassName={this.rowClassName}
                            onRowDoubleClick={this.onRowDoubleClick}
                            onRowRightClick={this.handleRowRightClick}
                            sort={this.handleTableSort}
                            sortBy={
                                this.props.store.state.settings.library.sortBy
                            }
                            sortDirection={
                                this.props.store.state.settings.library
                                    .sortDirection
                            }
                            width={width}>
                            <Column
                                label="Name"
                                dataKey="title"
                                width={(width - 20) * (31 / 100)}
                                cellDataGetter={({
                                    rowData,
                                }: {
                                    rowData: TrackModel;
                                }) => rowData.common.title}
                            />
                            <Column
                                label="Artist"
                                dataKey="artist"
                                width={(width - 20) * (31 / 100)}
                                cellDataGetter={({
                                    rowData,
                                }: {
                                    rowData: TrackModel;
                                }) => rowData.common.artist}
                            />
                            <Column
                                label="Album"
                                dataKey="album"
                                width={(width - 20) * (31 / 100)}
                                cellDataGetter={({
                                    rowData,
                                }: {
                                    rowData: TrackModel;
                                }) => rowData.common.album}
                            />
                            <Column
                                label="Duration"
                                dataKey="duration"
                                disableSort={true}
                                width={(width - 20) * (7 / 100)}
                                cellDataGetter={({
                                    rowData,
                                }: {
                                    rowData: TrackModel;
                                }) =>
                                    TimeUtils.parseToMinutes(
                                        rowData.format.duration !== undefined
                                            ? rowData.format.duration
                                            : 0
                                    )
                                }
                            />
                        </Table>
                    )}
                </AutoSizer>
            </div>
        );
    }
}
