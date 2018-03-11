import * as React from 'react';
import HeaderContainer from './HeaderContainer';
import '../styles/app.scss';

export interface ShellContainerProps {}

export interface ShellContainerState {}

export default class Shell extends React.Component<
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
            </>
        );
    }
}
