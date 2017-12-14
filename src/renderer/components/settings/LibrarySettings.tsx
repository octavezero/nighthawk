import * as React from 'react';
import { Textbox } from '../common/Textbox';
import { Button } from '../common/Button';
import { ButtonGroup } from '../common/ButtonGroup';

export interface LibrarySettingsProps {}

export interface LibrarySettingsState {}

export default class LibrarySettings extends React.Component<LibrarySettingsProps, LibrarySettingsState> {
	constructor(props: LibrarySettingsProps) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className='library-settings'>
				<label>Library Path</label>
				<Textbox></Textbox>
				<ButtonGroup className='library-settings-group'>
					<Button type='primary'>Save and Refresh Library</Button>
					<Button type='default'>Discard Changes</Button>
				</ButtonGroup>
			</div>
		);
	}
}
