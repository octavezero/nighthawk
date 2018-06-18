import * as React from 'react';
import { TabBar } from '../elements/TabBar';
import AppStore from '../../stores/AppStore';

interface ModeTabsProps {
    changeMainTab: (activeMainTab: number) => void;
}

interface ModeTabsState {}

export default class ModeTabs extends React.Component<
    ModeTabsProps,
    ModeTabsState
> {
    constructor(props: ModeTabsProps) {
        super(props);
    }

    handleTabClick = (index: number) => {
        this.props.changeMainTab(index);
    };

    render() {
        return (
            <TabBar className="mode-tabs" onTabClicked={this.handleTabClick}>
                <label>LIBRARY MODE</label>
                <label>PLAYLISTS MODE</label>
            </TabBar>
        );
    }
}
