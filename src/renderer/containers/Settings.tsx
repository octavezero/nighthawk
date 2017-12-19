import { LibrarySettingsModel } from '../models/LibrarySettingsModel';
import * as React from 'react';
import { Modal } from '../components/common/Modal';
import { TabBar } from '../components/common/TabBar';
import LibrarySettings from '../components/settings/LibrarySettings';
import { backendDispatcher } from '../dispatchers/backendDispatcher';

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

		this.state = {
			activeTabIndex: TabItemsOrder.Library,
			//Stuff blank Data. Will be initialized with correct data when mounted.
			library: { path: '' }
		};
	}

	handleTabClick = (index: number) => {
		this.setState({ activeTabIndex: index });
	}

	updateLibrarySettings = (library: LibrarySettingsModel) => {
		this.setState({library: library});
	}

	initSettings = (settings: any[]) => {
		//to be changed as per new tables
		this.setState({library: settings[0]});
	}

	renderActiveTabItem() {
		switch (this.state.activeTabIndex) {
			case TabItemsOrder.Library: {
				return <LibrarySettings library={this.state.library} />;
			}

			case TabItemsOrder.System: {
				return <div />;
			}
		}
	}

	componentDidMount() {
		backendDispatcher.addListener('UPDATE_SETTINGS_LIBRARY', this.updateLibrarySettings);
		backendDispatcher.addListener('INIT_SETTINGS', this.initSettings);
	}

	componentWillUnmount() {
		backendDispatcher.removeListener('UPDATE_SETTINGS_LIBRARY', this.updateLibrarySettings);
		backendDispatcher.addListener('INIT_SETTINGS', this.initSettings);
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
