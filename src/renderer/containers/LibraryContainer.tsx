import * as React from 'react';

import Songs from '../components/library/Songs';
import AppStore from '../stores/AppStore';
import { AppStoreConsumer } from '../stores/AppContext';

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
                <AppStoreConsumer>
                    {store => <Songs store={store as AppStore} />}
                </AppStoreConsumer>
            </>
        );
    }
}
