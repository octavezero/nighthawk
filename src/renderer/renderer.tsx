import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Hello extends React.Component<any, any> {
    render() {
        return <h1>React Works!. Go forth and develop.</h1>;
    }
}

ReactDOM.render(<Hello />, document.getElementById('app'));
