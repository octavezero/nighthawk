import * as React from 'react';
import { Modal } from '../components/common/Modal';
import { TabBar } from '../components/common/TabBar';
import LibrarySettings from '../components/settings/LibrarySettings';

enum TabItemsOrder {
	Library,
	System
}

export interface SettingsProps {
	isActive: boolean;
}

export interface SettingsState {
	activeTabIndex: TabItemsOrder;
}

export default class Settings extends React.Component<SettingsProps, SettingsState> {
	constructor(props: SettingsProps) {
		super(props);

		this.state = {
			activeTabIndex: TabItemsOrder.Library
		};
	}

	handleTabClick = (index: number) => {
		this.setState({ activeTabIndex: index });
	}

	renderActiveTabItem() {
		switch (this.state.activeTabIndex) {
			case TabItemsOrder.Library: {
				return (
					<LibrarySettings />
				);
			}

			case TabItemsOrder.System: {
				return (
					<div />
				);
			}
		}
	}

	render() {
		return (
			<Modal
				heading='Settings'
				isActive={this.props.isActive}
				body={
					<>
						<TabBar onTabClicked={this.handleTabClick}>
							<span>Library</span>
							<span>System</span>
						</TabBar>
						{ this.renderActiveTabItem() }
					</>
				}
			/>
		);
	}
}
