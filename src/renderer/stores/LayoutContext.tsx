import * as React from 'react';

const context = React.createContext({
    activeMainTab: 0,
    changeMainTab: undefined,
});

// tslint:disable-next-line:variable-name
export const LayoutContextConsumer = context.Consumer;

interface LayoutContextState {
    activeMainTab: number;
}

export class LayoutContext extends React.Component<any, LayoutContextState> {
    constructor(props: any) {
        super(props);

        this.state = {
            activeMainTab: 0,
        };
    }

    changeMainTab = (activeMainTab: number) => {
        this.setState({ activeMainTab });
    };

    render() {
        return (
            <context.Provider
                value={{
                    activeMainTab: this.state.activeMainTab,
                    changeMainTab: this.changeMainTab,
                }}>
                {this.props.children}
            </context.Provider>
        );
    }
}
