import * as React from 'react';

import Songs from '../components/library/Songs';

export interface LibraryContainerProps {}

export default class LibraryContainer extends React.Component<
    LibraryContainerProps,
    any
> {
    constructor(props: LibraryContainerProps) {
        super(props);
    }

    renderSongs = () => {
        return <Songs />;
    };

    render() {
        return (
            <>
                <Songs />
            </>
        );
    }
}
