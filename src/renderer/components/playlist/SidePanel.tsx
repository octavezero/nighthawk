import * as React from 'react';

interface SidePanelProps {}

interface SidePanelState {}

export default class SidePanel extends React.Component<
    SidePanelProps,
    SidePanelState
> {
    render() {
        return (
            <div className="details">
                <div className="panel" />
                <div className="list" />
            </div>
        );
    }
}
