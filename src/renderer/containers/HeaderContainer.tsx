import * as React from 'react';
import WindowControls from '../components/header/WindowControls';
import HeaderActions from '../components/header/HeaderActions';
import Search from '../components/header/Search';
import { AppStoreConsumer } from '../stores/AppContext';
import DragRegion from '../components/header/DragRegion';

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
            <AppStoreConsumer>
                {store => (
                    <div className="header">
                        <DragRegion
                            drag={!store.state.settings.system.unobtrusive}
                        />
                        <div className="search">
                            <Search store={store} />
                        </div>
                        <div className="content">
                            <HeaderActions />
                        </div>
                        <WindowControls unobtrusive={!store.state.settings.system.unobtrusive} />
                    </div>
                )}
            </AppStoreConsumer>
        );
    }
}
