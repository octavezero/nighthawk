import * as React from 'react';
import WindowControls from '../components/header/WindowControls';
import HeaderActions from '../components/header/HeaderActions';
import Search from '../components/header/Search';
import { AppStoreConsumer } from '../stores/AppContext';

export interface HeaderContainerProps {}

export interface HeaderContainerState {}

export default class HeaderContainer extends React.Component<
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
                <div className="drag" />
                <div className="search">
                    <AppStoreConsumer>
                        {store => <Search store={store} />}
                    </AppStoreConsumer>
                </div>
                <div className="content">
                    <HeaderActions />
                </div>
                <WindowControls />
            </div>
        );
    }
}
