import * as React from 'react';
import Details from '../components/player/Details';
import Controls from '../components/player/Controls';

export interface PlayerContainerProps {}

export default class PlayerContainer extends React.Component<
    PlayerContainerProps,
    any
> {
    constructor(props: PlayerContainerProps) {
        super(props);
    }

    render() {
        return (
            <div className="player">
                <Details />
                <Controls />
            </div>
        );
    }
}
