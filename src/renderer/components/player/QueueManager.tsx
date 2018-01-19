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
}

export default class QueueManager extends React.Component<QueueManagerProps, any> {

	constructor(props: QueueManagerProps) {
		super(props);
	}

	rowRenderer = ({ key, index, isScrolling, isVisible, style}: {key: string, index: number, isScrolling: boolean, isVisible: boolean, style: any}) => {
		let track: TrackModel = this.props.queue.get(index)!;
		return (
			<div key={key} style={style} className={ index == this.props.index ? 'queue-row current' : 'queue-row'}>
				<h6>{track.common.title}</h6>
				<p>{track.common.artist} - {track.common.album}</p>
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
							<h6>Currently Playing</h6>
							<Button type='default'>Clear Queue</Button>
						</div>
						<div className='queue-body'>
							<AutoSizer>
								{({height, width}) => (
									<ViewList
										height={height}
										rowRenderer={this.rowRenderer}
										rowCount={this.props.queue.count()}
										width={width}
										rowHeight={40}
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
