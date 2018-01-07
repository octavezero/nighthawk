import { LibrarySettingsModel } from '../models/LibrarySettingsModel';
import * as React from 'react';
import { Modal } from '../components/common/Modal';
import { TabBar } from '../components/common/TabBar';
import LibrarySettings from '../components/settings/LibrarySettings';
import * as SettingsActions from '../actions/SettingsActions';

enum TabItemsOrder {
	Library,
	System
}

export interface SettingsProps {
	isActive: boolean;
}

export interface SettingsState {
	activeTabIndex: TabItemsOrder;
	library: LibrarySettingsModel;
}

export default class Settings extends React.Component<SettingsProps, SettingsState> {
	constructor(props: SettingsProps) {
		super(props);
		let settings = SettingsActions.refreshSettings();

		this.state = {
			activeTabIndex: TabItemsOrder.Library,
			//TODO: Add more settings here as they are added
			//Stuff blank Data. Will be initialized with correct data when shown.
			library: settings[0]
		};
	}

	reloadSettings = () => {
		let settings = SettingsActions.refreshSettings();
		//TODO: Add more settings here as they are added
		this.setState({library: settings[0]});
	}

	handleTabClick = (index: number) => {
		this.setState({ activeTabIndex: index });
	}

	renderActiveTabItem() {
		switch (this.state.activeTabIndex) {
			case TabItemsOrder.Library: {
				return <LibrarySettings library={this.state.library} reloadSettings={this.reloadSettings} />;
			}

			case TabItemsOrder.System: {
				return <div />;
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
