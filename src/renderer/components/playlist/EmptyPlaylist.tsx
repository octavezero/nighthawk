import * as React from 'react';
import * as emptyState from '../../../../static/vectors/emptyState.svg';

export default class EmptyPlaylist extends React.Component<any, any> {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">
                    <img src={emptyState} />
                </div>
                <h3 className="empty-state-title">Your Playlist is Empty.</h3>
                <h5 className="empty-state-subtitle">
                    Please Goto To Your Libary, Right Click on the Track and
                    Select 'Add to Playlist'.
                </h5>
            </div>
        );
    }
}
