import * as React from 'react';
import { Textbox } from '../elements/Textbox';
import { ButtonGroup } from '../elements/buttongroup';
import { Button } from '../elements/button';

export interface LibrarySettingsProps {}

export interface LibrarySettingsState {}

export default class LibrarySettings extends React.Component<
    LibrarySettingsProps,
    LibrarySettingsState
> {
    constructor(props: LibrarySettingsProps) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="library-settings">
                <label>Library Path</label>
                <Textbox />
                <ButtonGroup className="library-settings-group">
                    <Button type="primary">Refresh Library Now</Button>
                </ButtonGroup>
            </div>
        );
    }
}
