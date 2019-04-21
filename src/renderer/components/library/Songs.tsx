import * as React from 'react';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import {
    Table,
    Column,
    RowMouseEventHandlerParams,
} from 'react-virtualized/dist/commonjs/Table';
import AppStore from '../../stores/AppStore';
import { TrackModel } from '../../database/TracksDatabase';
import * as TimeUtils from '../../utilities/TimeUtils';
import { ContextMenu, ContextMenuItem } from '../elements/ContextMenu';
import EmptyState from './EmptyState';
import { Modal } from '../elements/Modal';
import AddTrack from '../playlist/AddTrack';

import * as Moment from 'moment';

export interface SongsProps {
    store: AppStore;
}

interface SongsState {
    contextParams: { x: number; y: number; index: number };
    playlistParams: { open: boolean; songid: number };
}

export default class Songs extends React.Component<SongsProps, SongsState> {
    constructor(props: SongsProps) {
        super(props);

        this.state = {
            contextParams: {
                x: 0,
                y: 0,
                index: -1,
            },
            playlistParams: {
                open: false,
                songid: 0,
            },
        };
    }

    rowGetter = ({ index }: { index: number }) => {
        return this.props.store.state.library[index];
    };

    noRowsRenderer = () => {
        return <EmptyState />;
    };

    rowClassName = ({ index }: { index: number }) => {
        return index % 2 === 0 ? 'even-row' : 'odd-row';
    };

    onRowDoubleClick = (info: RowMouseEventHandlerParams) => {
        this.props.store.player.createPlayerQueue(info.index);
    };

    handleTableSort = ({
        sortBy,
        sortDirection,
    }: {
        sortBy: string;
        sortDirection: 'ASC' | 'DESC';
    }) => {
        this.props.store.library.sortLibrary(sortBy, sortDirection).then(() => {
            this.props.store.settings.setLibrarySort(sortBy, sortDirection);
        });
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
                this.props.store.player.existingQueue(
                    this.state.contextParams.index
                );
                break;
            case 'new':
                this.props.store.player.newQueue(
                    this.state.contextParams.index
                );
                break;
            case 'add':
                this.handleOpenModal(
                    // prettier-ignore
                    this.props.store.state.library[this.state.contextParams.index].id
                );
        }
    };

    handleOpenModal = (id: number) => {
        this.setState({ playlistParams: { open: true, songid: id } });
    };

    handleCloseModal = () => {
        this.setState({ playlistParams: { open: false, songid: 0 } });
    };

    render() {
        const { store } = this.props;
        return (
            <div className="songs">
                <Modal
                    isOpen={this.state.playlistParams.open}
                    onRequestClose={this.handleCloseModal}
                    heading="Add Song to Playlist"
                    body={
                        <AddTrack trackId={this.state.playlistParams.songid} />
                    }
                />
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
                    <ContextMenuItem
                        data="add"
                        onClick={this.handleContextMenuItemClick}>
                        Add Track To Playlist(s)
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
                            rowCount={store.state.library.length}
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
                            {store.state.settings.columns.columns.map(
                                (column, index) => {
                                    if (column[1]) {
                                        if (column[0] === 'Duration') {
                                            return (
                                                <Column
                                                    key={index}
                                                    label="Duration"
                                                    dataKey="duration"
                                                    disableSort={true}
                                                    width={125}
                                                    minWidth={125}
                                                    cellDataGetter={({
                                                        rowData,
                                                    }: {
                                                        rowData: TrackModel;
                                                    }) =>
                                                        TimeUtils.parseToMinutes(
                                                            rowData.format
                                                                .duration !==
                                                            undefined
                                                                ? rowData.format
                                                                      .duration
                                                                : 0
                                                        )
                                                    }
                                                />
                                            );
                                        }
                                        if (column[0] === 'Added At') {
                                            return (
                                                <Column
                                                    key={index}
                                                    label={column[0]}
                                                    dataKey={column[0].toLowerCase()}
                                                    width={125}
                                                    minWidth={125}
                                                    cellDataGetter={({
                                                        rowData,
                                                    }: {
                                                        rowData: TrackModel;
                                                    }) =>
                                                        Moment(
                                                            rowData.stats.ctime
                                                        ).format('DD-MM-YYYY')
                                                    }
                                                />
                                            );
                                        }
                                        if (column[0] === 'Modified At') {
                                            return (
                                                <Column
                                                    key={index}
                                                    label={column[0]}
                                                    dataKey={column[0].toLowerCase()}
                                                    width={125}
                                                    minWidth={125}
                                                    cellDataGetter={({
                                                        rowData,
                                                    }: {
                                                        rowData: TrackModel;
                                                    }) =>
                                                        Moment(
                                                            rowData.stats.mtime
                                                        ).format('DD-MM-YYYY')
                                                    }
                                                />
                                            );
                                        }
                                        return (
                                            <Column
                                                key={index}
                                                label={column[0]}
                                                dataKey={column[0].toLowerCase()}
                                                width={100}
                                                flexGrow={2}
                                                minWidth={100}
                                                cellDataGetter={({
                                                    rowData,
                                                }: {
                                                    rowData: TrackModel;
                                                }) =>
                                                    rowData.common[
                                                        column[0].toLowerCase()
                                                    ]
                                                }
                                            />
                                        );
                                    }
                                }
                            )}
                        </Table>
                    )}
                </AutoSizer>
            </div>
        );
    }
}
