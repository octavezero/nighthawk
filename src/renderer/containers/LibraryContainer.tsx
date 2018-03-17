import * as React from 'react';

import Songs from '../components/library/Songs';
import { Subscribe } from 'unstated';
import AppStore from '../stores/AppStore';

export interface LibraryContainerProps {}

export default class LibraryContainer extends React.Component<
    LibraryContainerProps,
    any
> {
    constructor(props: LibraryContainerProps) {
        super(props);
    }

    render() {
        return (
            <>
                <Subscribe to={[AppStore]}>
                    {store => <Songs store={store as AppStore} />}
                </Subscribe>
            </>
        );
    }
}
