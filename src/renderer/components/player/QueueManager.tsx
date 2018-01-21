import TrackModel from '../../models/TrackModel';
import * as React from 'react';
import Popover from '../common/Popover';
import { Button } from '../common/Button';
import { Icon } from '../common/Icon';
import { List } from 'immutable';
import { List as ViewList, AutoSizer } from 'react-virtualized';

export interface QueueManagerProps {
	queue: List<TrackModel>;
	index: number;
	readonly deleteFromQueue: (index: number) => void;
	readonly seekToIndex: (index: number) => void;
	readonly clearQueue: () => void;
}

export default class QueueManager extends React.Component<QueueManagerProps, any> {

	constructor(props: QueueManagerProps) {
		super(props);
	}

	handleQueueDelete = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		this.props.deleteFromQueue(index);
	}

	handleDoubleRowClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
		this.props.seekToIndex(index);
	}

	rowRenderer = ({ key, index, isScrolling, isVisible, style}: {key: string, index: number, isScrolling: boolean, isVisible: boolean, style: any}) => {
		let track: TrackModel = this.props.queue.get(index)!;
		let current: boolean = index == this.props.index;
		return (
			<div key={key} style={style} className='queue-row'>
				<div className={ current ? 'details current' : 'details' } onDoubleClick={(e: any) => { this.handleDoubleRowClick(e, index); }}>
					<h6>{track.common.title}</h6>
					<p>{track.common.artist} - {track.common.album}</p>
				</div>
				<Button type={ current ? 'primary' : 'ghost' } onClick={(e: any) => { this.handleQueueDelete(e, index); }} icon={true}>
					<Icon size='21' icon='playlist-remove' />
				</Button>
			</div>
		);
	}

	componentWillReceiveProps(nextProps: QueueManagerProps) {
		if (nextProps.index == this.props.index &&  nextProps.index != -2) {
			//
		}
	}

	render() {
		return (
			<div className='queue'>
				<Popover position='bottom' button={
						<Button type='primary' icon={true}>
							<Icon size='21' icon='filter-variant' />
						</Button>
					}>
						<div className='queue-header'>
							<h6>Currently Playing {this.props.index}/{this.props.queue.size}</h6>
							<Button type='default' onClick={this.props.clearQueue}><Icon size='24' icon='notification-clear-all' /> Clear Queue</Button>
						</div>
						<div className='queue-body'>
							<AutoSizer>
								{({height, width}) => (
									<ViewList
										height={height}
										rowRenderer={this.rowRenderer}
										rowCount={this.props.queue.count()}
										width={width}
										rowHeight={50}
										overscanRowCount={5}
										scrollToAlignment='start'
										scrollToIndex={this.props.index == -2 ? undefined : this.props.index}
									/>
								)}
							</AutoSizer>
						</div>
				</Popover>
			</div>
		);
	}
}
