import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppStoreProvider } from './stores/AppContext';

import ShellContainer from './containers/ShellContainer';

ReactDOM.render(
    <AppStoreProvider>
        <ShellContainer />
    </AppStoreProvider>,
    document.getElementById('app')
);
