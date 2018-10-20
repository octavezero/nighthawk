import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppStoreProvider, AppStoreConsumer } from './stores/AppContext';

import ShellContainer from './containers/ShellContainer';
import { LayoutContext } from './stores/LayoutContext';

ReactDOM.render(
    <AppStoreProvider>
        <LayoutContext>
            <AppStoreConsumer>
                {store => <ShellContainer init={store.init} />}
            </AppStoreConsumer>
        </LayoutContext>
    </AppStoreProvider>,
    document.getElementById('app')
);
