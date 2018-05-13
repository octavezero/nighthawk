import * as React from 'react';
import { Textbox, TextboxAddon } from '../elements/Textbox';
import { Icon } from '../elements/Icon';
import AppStore from '../../stores/AppStore';

interface SearchProps {
    store: AppStore;
}

interface SearchState {
    value: string;
}

export default class Search extends React.Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);

        this.state = {
            value: '',
        };
    }

    handleChange = (event: any) => {
        this.setState({ value: event.target.value });
        this.props.store.search.searchLibrary(event.target.value);
    };

    render() {
        return (
            <>
                <Textbox
                    placeholder="Search"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <TextboxAddon data-rh="Type to Search" direction="right">
                    <Icon size="18" icon="magnify" />
                </TextboxAddon>
            </>
        );
    }
}
