import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'unstated';

import ShellContainer from './containers/ShellContainer';

ReactDOM.render(
    <Provider>
        <ShellContainer />
    </Provider>,
    document.getElementById('app')
);
