import * as React from 'react';
import * as classNames from 'classnames';

export interface TabBarProps {
    className?: string;
    onTabClicked: (index: number) => void;
}

interface TabBarState {
    selectedIndex: number;
}

export class TabBar extends React.PureComponent<TabBarProps, TabBarState> {
    constructor(props: TabBarProps) {
        super(props);

        this.state = {
            selectedIndex: 0,
        };
    }

    renderTabItems() {
        const children = this.props.children as ReadonlyArray<
            JSX.Element
        > | null;

        if (!children) {
            return null;
        }

        return children.map((child, index) => {
            const selected: boolean = this.state.selectedIndex === index;
            return (
                <TabItem
                    key={index}
                    onTabClicked={this.onTabClicked}
                    index={index}
                    selected={selected}>
                    {child}
                </TabItem>
            );
        });
    }

    onTabClicked = (index: number) => {
        // Perform Tab Active Swithcing Logic Here
        this.setState({ selectedIndex: index });

        // Callback to parent class
        this.props.onTabClicked(index);
    };

    render() {
        const buildClassNames: string = classNames(
            'tab-bar',
            this.props.className
        );

        return <div className={buildClassNames}>{this.renderTabItems()}</div>;
    }
}

export interface TabItemProps {
    className?: string;
    onTabClicked: (index: number) => void;
    index: number;
    selected: boolean;
}

export class TabItem extends React.PureComponent<TabItemProps, any> {
    handleTabClicked = () => {
        this.props.onTabClicked(this.props.index);
    };
    render() {
        const buildClassNames: string = classNames(
            'tab-bar-item',
            { selected: this.props.selected },
            this.props.className
        );

        return (
            <div className={buildClassNames} onClick={this.handleTabClicked}>
                {this.props.children}
            </div>
        );
    }
}
