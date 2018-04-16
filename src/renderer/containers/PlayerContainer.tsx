import * as React from 'react';
import Details from '../components/player/Details';
import Controls from '../components/player/Controls';
import AppStore from '../stores/AppStore';
import { AppStoreConsumer } from '../stores/AppContext';

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
            <AppStoreConsumer>
                {store => (
                    <div className="player">
                        <Details store={store as AppStore} />
                        <Controls store={store as AppStore} />
                    </div>
                )}
            </AppStoreConsumer>
        );
    }
}
