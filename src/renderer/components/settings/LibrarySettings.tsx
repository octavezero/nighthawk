import * as React from 'react';
import { Textbox } from '../common/Textbox';
import { Button } from '../common/Button';
import { ButtonGroup } from '../common/ButtonGroup';

import * as SettingsActions from '../../actions/SettingsActions';

import { remote } from 'electron';
import { LibrarySettingsModel } from '../../models/LibrarySettingsModel';
const { dialog } = remote;

export interface LibrarySettingsProps {
	library: LibrarySettingsModel;
}

export interface LibrarySettingsState {}

export default class LibrarySettings extends React.Component<LibrarySettingsProps, LibrarySettingsState> {
	constructor(props: LibrarySettingsProps) {
		super(props);

		this.state = {};
	}

	handlePathSelect = () => {
		let path = dialog.showOpenDialog({title: 'Select Music Library Folder', properties: ['openDirectory'] });
		SettingsActions.saveLibrarySettings({ path: path[0] });
	}

	render() {
		return (
			<div className='library-settings'>
				<label>Library Path</label>
				<Textbox onClick={this.handlePathSelect} value={this.props.library.path} readOnly={true}></Textbox>
				<ButtonGroup className='library-settings-group'>
					<Button type='primary'>Refresh Library Now</Button>
				</ButtonGroup>
			</div>
		);
	}
}
