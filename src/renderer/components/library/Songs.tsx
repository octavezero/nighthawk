import * as React from 'react';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { Table, Column } from 'react-virtualized/dist/commonjs/Table';

export interface SongsProps {}

export default class Songs extends React.Component<SongsProps, any> {
    constructor(props: SongsProps) {
        super(props);
    }

    rowGetter = () => {};

    noRowsRenderer = () => {
        return <div>Empty State</div>;
    };

    render() {
        return (
            <div className="songs">
                <AutoSizer>
                    {({ height, width }) => (
                        <Table
                            headerHeight={26}
                            rowGetter={this.rowGetter}
                            noRowsRenderer={this.noRowsRenderer}
                            height={height}
                            rowHeight={26}
                            rowCount={0}
                            width={width}>
                            <Column
                                label="Name"
                                dataKey="title"
                                width={(width - 20) * (31 / 100)}
                            />
                            <Column
                                label="Artist"
                                dataKey="artist"
                                width={(width - 20) * (31 / 100)}
                            />
                            <Column
                                label="Album"
                                dataKey="album"
                                width={(width - 20) * (31 / 100)}
                            />
                            <Column
                                label="Duration"
                                dataKey="duration"
                                disableSort={true}
                                width={(width - 20) * (7 / 100)}
                            />
                        </Table>
                    )}
                </AutoSizer>
            </div>
        );
    }
}
