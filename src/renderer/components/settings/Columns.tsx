import * as React from 'react';
import AppStore from '../../stores/AppStore';
import { Checkbox } from '../elements/Checkbox';

export interface ColumnsSettingsProps {
    store: AppStore;
}
export interface ColumnsSettingsState {}

export default class ColumnsSettings extends React.Component<
    ColumnsSettingsProps,
    ColumnsSettingsState
> {
    constructor(props: ColumnsSettingsProps) {
        super(props);
    }

    handleColumnCheckedChange = (value: string, checked: boolean) => {
        let map: Map<String, Boolean> = new Map(
            this.props.store.state.settings.columns.columns
        );

        map.set(value, checked);

        this.props.store.settings.setColumns(map);
    };

    render() {
        const { store } = this.props;
        return (
            <div className="columns-settings">
                {store.state.settings.columns.columns.map((column, index) => {
                    return (
                        <Checkbox
                            key={index}
                            handleCheckedState={(checked: boolean) =>
                                this.handleColumnCheckedChange(
                                    column[0],
                                    checked
                                )
                            }
                            checked={column[1]}
                            value={column[0]}
                        />
                    );
                })}
            </div>
        );
    }
}
