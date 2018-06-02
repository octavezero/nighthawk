import * as React from 'react';
import * as classNames from 'classnames';

export interface ContextMenuProps {
    x: number;
    y: number;
}

interface ContextMenuState {
    isActive: boolean;
    x: number;
    y: number;
    prevProps: ContextMenuProps;
}

interface Position {
    top?: number;
    left?: number;
}

export class ContextMenu extends React.Component<
    ContextMenuProps,
    ContextMenuState
> {
    contextMenu: HTMLDivElement | null;

    constructor(props: ContextMenuProps) {
        super(props);

        this.state = {
            isActive: false,
            x: 0,
            y: 0,
            prevProps: props,
        };
    }

    hideMenu = () => {
        this.setState({ isActive: false, x: 0, y: 0 });
        document.removeEventListener('click', this.handleClick);
    };

    showMenu = (style: Position) => {
        this.contextMenu.style.top = `${style.top}px`;
        this.contextMenu.style.left = `${style.left}px`;

        document.addEventListener('click', this.handleClick);
    };

    handleClick = (e: MouseEvent) => {
        if (this.contextMenu != null) {
            this.hideMenu();
        }
    };

    /*
        The Below Lifecycle methods contain the magic to make the context
        menu work.
        This is very dark and obscure magic. Even I do not what it is
        or what it does.
        Please do not interfere wtih this. Or you will loose you soul.
    */
    static getDerivedStateFromProps(
        nextProps: ContextMenuProps,
        prevState: ContextMenuState
    ): any {
        if (
            nextProps.x === prevState.prevProps.x &&
            nextProps.y === prevState.prevProps.y &&
            !prevState.isActive
        ) {
            return null;
        }

        return {
            x: nextProps.x,
            y: nextProps.y,
            isActive: true,
            prevProps: nextProps,
        };
    }

    shouldComponentUpdate(
        nextProps: ContextMenuProps,
        nextState: ContextMenuState
    ) {
        if (
            this.props.x === nextProps.x &&
            this.props.y === nextProps.y &&
            nextState.isActive
        ) {
            return false;
        }

        if (
            nextState.x === this.state.x &&
            nextState.y === this.state.y &&
            !this.state.isActive
        ) {
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        if (this.state.isActive) {
            let w = window.innerWidth;
            let h = window.innerHeight;

            let position: Position = { top: undefined, left: undefined };

            if (this.props.x > w - this.contextMenu.offsetWidth) {
                position.left = this.props.x - this.contextMenu.offsetWidth;
            } else {
                position.left = this.props.x;
            }

            if (this.props.y > h - this.contextMenu.offsetHeight) {
                position.top = this.props.y - this.contextMenu.offsetHeight;
            } else {
                position.top = this.props.y;
            }
            this.showMenu(position);
        }
    }

    render() {
        let buildClassNames: string = classNames('context-menu', {
            active: this.state.isActive,
        });

        return (
            <div
                className={buildClassNames}
                ref={elem => {
                    this.contextMenu = elem;
                }}
                tabIndex={0}>
                {React.Children.map(this.props.children, child => {
                    return React.cloneElement(
                        child as React.ReactElement<any>,
                        { hideContextMenu: this.handleClick }
                    );
                })}
            </div>
        );
    }
}

export interface ContextMenuItemProps {
    readonly data: string;
    readonly onClick: (data: string) => void;
    readonly hideContextMenu?: () => void;
}

export class ContextMenuItem extends React.Component<
    ContextMenuItemProps,
    any
> {
    handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        this.props.onClick(this.props.data);
        if (this.props.hideContextMenu !== undefined) {
            this.props.hideContextMenu();
        }
        event.stopPropagation();
    };

    stopBlurBubbling = (e: React.FocusEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    render() {
        return (
            <div
                className="context-menu-item"
                onBlur={this.stopBlurBubbling}
                onClick={this.handleClick}>
                {this.props.children}
            </div>
        );
    }
}
