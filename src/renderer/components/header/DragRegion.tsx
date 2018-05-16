import * as React from 'react';

export interface DragRegionProps {
    drag: boolean;
}

export interface DragRegionState {
    drag: boolean | undefined;
}

export default class DragRegion extends React.Component<
    DragRegionProps,
    DragRegionState
> {
    constructor(props: DragRegionProps) {
        super(props);

        this.state = {
            drag: undefined,
        };
    }

    static getDerivedStateFromProps(
        nextProps: DragRegionProps,
        prevState: DragRegionState
    ) {
        if (prevState.drag === undefined) {
            return { drag: nextProps.drag };
        }
        return null;
    }

    shouldComponentUpdate(
        nextProps: DragRegionProps,
        nextState: DragRegionState
    ) {
        if (this.state.drag === undefined) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <>
                <div
                    className={
                        this.state.drag === true ? 'drag window' : 'drag'
                    }
                />
            </>
        );
    }
}
