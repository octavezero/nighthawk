import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Shell from './containers/Shell';

const root = document.getElementById('app');
ReactDOM.render(
	<AppContainer>
		<Shell />
	</AppContainer>,
	root
);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./containers/Shell', () => {
		// tslint:disable-next-line:no-require-imports
		const HotShell = require('./containers/Shell').default;
		ReactDOM.render(
			<AppContainer>
				<HotShell />
			</AppContainer>
			, root
		);
	});
}