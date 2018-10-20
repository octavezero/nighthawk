import * as React from 'react';

import '../styles/app.scss';

import HeaderContainer from './HeaderContainer';
import PlayerContainer from './PlayerContainer';
import LibraryContainer from './LibraryContainer';
import { AppStoreConsumer } from '../stores/AppContext';
import PlaylistContainer from './PlaylistContainer';

// tslint:disable-next-line:import-name
import ReactHintFactory from 'react-hint';
import 'react-hint/css/index.css';
import NotificationContainer from './NotificationContainer';
import { LayoutContextConsumer } from '../stores/LayoutContext';
import { ActionsModel } from '../stores/AppStore';

// tslint:disable-next-line:variable-name
let ReactHint = ReactHintFactory(React);

export interface ShellContainerProps {
    init: ActionsModel['init'];
}

export interface ShellContainerState {}

export default class ShellContainer extends React.Component<
    ShellContainerProps,
    ShellContainerState
> {
    constructor(props: ShellContainerProps) {
        super(props);
    }

    componentDidMount() {
        this.props.init.init();
    }

    render() {
        return (
            <>
                <ReactHint autoPosition events delay={100} />
                <NotificationContainer />
                <HeaderContainer />
                <PlayerContainer />
                <LayoutContextConsumer>
                    {store =>
                        store.activeMainTab === 0 ? (
                            <LibraryContainer />
                        ) : (
                            <PlaylistContainer />
                        )
                    }
                </LayoutContextConsumer>
            </>
        );
    }
}
