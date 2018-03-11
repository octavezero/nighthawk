import * as React from 'react';
import WindowControls from '../components/header/WindowControls';

export interface HeaderContainerProps {}

export interface HeaderContainerState {}

export default class Header extends React.Component<
    HeaderContainerProps,
    HeaderContainerState
> {
    constructor(props: HeaderContainerProps) {
        super(props);
    }

    componentDidMount() {
        // All the states that require database or IO are initialized here
    }

    render() {
        return (
            <div className="header">
                <div className="content" />
                <WindowControls />
            </div>
        );
    }
}
