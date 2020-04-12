import React from 'react';
import Visual from '../Visual/Visual.js';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            numBars: 10
        };
    }

    render() {
        return (
            <div className="app-container">
                <Visual numBars="50"/>
            </div>
        );
    }
}

export default App;