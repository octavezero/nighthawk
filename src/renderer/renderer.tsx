import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppStoreProvider } from './stores/AppContext';

import ShellContainer from './containers/ShellContainer';
import { LayoutContext } from './stores/LayoutContext';

ReactDOM.render(
    <AppStoreProvider>
        <LayoutContext>
            <ShellContainer />
        </LayoutContext>
    </AppStoreProvider>,
    document.getElementById('app')
);
