import * as React from 'react';
import { TabBar } from '../components/elements/TabBar';
import Library from '../components/settings/Library';
import System from '../components/settings/System';
import AppStore from '../stores/AppStore';
import { AppStoreConsumer } from '../stores/AppContext';
import Playlist from '../components/settings/Playlist';
import Columns from '../components/settings/Columns';

enum TabItemsOrder {
    Library,
    Playlist,
    System,
    Columns,
}

export interface SettingsContainerProps {}

interface SettingsContainerState {
    activeTabIndex: TabItemsOrder;
}

export default class SettingsContainer extends React.Component<
    SettingsContainerProps,
    SettingsContainerState
> {
    constructor(props: SettingsContainerProps) {
        super(props);

        this.state = {
            activeTabIndex: TabItemsOrder.Library,
        };
    }

    handleTabClick = (index: number) => {
        this.setState({ activeTabIndex: index });
    };

    renderActiveTabItem() {
        switch (this.state.activeTabIndex) {
            case TabItemsOrder.Library: {
                return (
                    <AppStoreConsumer>
                        {store => <Library store={store as AppStore} />}
                    </AppStoreConsumer>
                );
            }

            case TabItemsOrder.System: {
                return (
                    <AppStoreConsumer>
                        {store => <System store={store as AppStore} />}
                    </AppStoreConsumer>
                );
            }

            case TabItemsOrder.Playlist: {
                return (
                    <AppStoreConsumer>
                        {store => <Playlist store={store as AppStore} />}
                    </AppStoreConsumer>
                );
            }

            case TabItemsOrder.Columns: {
                return (
                    <AppStoreConsumer>
                        {store => <Columns store={store as AppStore} />}
                    </AppStoreConsumer>
                );
            }
        }
    }

    render() {
        return (
            <>
                <TabBar onTabClicked={this.handleTabClick}>
                    <span>Library</span>
                    <span>Playlists</span>
                    <span>System</span>
                    <span>Columns</span>
                </TabBar>
                {this.renderActiveTabItem()}
            </>
        );
    }
}
