import * as React from 'react';
// tslint:disable-next-line:import-name
import Popover from 'react-tiny-popover';
import AppStore from '../../stores/AppStore';
import { ButtonGroup } from '../elements/ButtonGroup';
import { Button } from '../elements/Button';
import { Icon } from '../elements/Icon';
import { TrackModel } from '../../database/TracksDatabase';
import { AutoSizer, List, ListRowProps } from 'react-virtualized';

export interface QueueProps {
    store: AppStore;
}

interface QueueState {
    isPopoverOpen: boolean;
}

export default class Queue extends React.Component<QueueProps, QueueState> {
    constructor(props: QueueProps) {
        super(props);

        this.state = {
            isPopoverOpen: false,
        };
    }

    handleDoubleRowClick = (
        e: React.MouseEvent<HTMLDivElement>,
        index: number
    ) => {
        this.props.store.player.seekSong(index);
    };

    rowRenderer = ({
        key,
        index,
        isScrolling,
        isVisible,
        style,
    }: ListRowProps) => {
        let track: TrackModel = this.props.store.state.player.queue[index];
        let current: boolean = index === this.props.store.state.player.cursor;
        return (
            <div key={key} style={style} className="queue-row">
                <div
                    className={current ? 'details current' : 'details'}
                    onDoubleClick={(e: any) => {
                        this.handleDoubleRowClick(e, index);
                    }}>
                    <h6>{track.common.title}</h6>
                    <p>
                        {track.common.artist} - {track.common.album}
                    </p>
                </div>
                <Button
                    type={current ? 'primary' : 'link'}
                    icon={true}
                    onClick={e =>
                        this.props.store.player.removeFromQueue(index)
                    }>
                    <Icon size="21" icon="playlist-remove" />
                </Button>
            </div>
        );
    };

    render() {
        return (
            <Popover
                isOpen={this.state.isPopoverOpen}
                position="bottom"
                containerClassName="popover"
                onClickOutside={() => this.setState({ isPopoverOpen: false })}
                content={
                    <div className="popover-queue">
                        <div className="queue-header">
                            <h6>Currently Playing</h6>
                            <Button
                                type="link"
                                onClick={e =>
                                    this.props.store.player.clearQueue()
                                }>
                                <Icon size="24" icon="notification-clear-all" />{' '}
                                Clear Queue
                            </Button>
                        </div>
                        <div className="queue-body">
                            <AutoSizer>
                                {({ height, width }) => (
                                    <List
                                        height={height}
                                        rowRenderer={this.rowRenderer}
                                        rowCount={
                                            this.props.store.state.player.queue
                                                .length
                                        }
                                        width={width}
                                        rowHeight={50}
                                        overscanRowCount={5}
                                        scrollToAlignment="start"
                                        scrollToIndex={
                                            this.props.store.state.player
                                                .cursor === -2
                                                ? undefined
                                                : this.props.store.state.player
                                                      .cursor
                                        }
                                    />
                                )}
                            </AutoSizer>
                        </div>
                    </div>
                }>
                <ButtonGroup>
                    <Button
                        type="default"
                        icon={true}
                        onClick={() =>
                            this.setState({
                                isPopoverOpen: !this.state.isPopoverOpen,
                            })
                        }>
                        <Icon size="21" icon="filter-variant" />
                    </Button>
                </ButtonGroup>
            </Popover>
        );
    }
}
