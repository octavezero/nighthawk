import * as React from 'react';

import '../styles/app.scss';

import HeaderContainer from './HeaderContainer';
import PlayerContainer from './PlayerContainer';

export interface ShellContainerProps {}

export interface ShellContainerState {}

export default class ShellContainer extends React.Component<
    ShellContainerProps,
    ShellContainerState
> {
    constructor(props: ShellContainerProps) {
        super(props);
    }

    componentDidMount() {
        // All the states that require database or IO are initialized here
    }

    render() {
        return (
            <>
                <HeaderContainer />
                <PlayerContainer />
            </>
        );
    }
}
