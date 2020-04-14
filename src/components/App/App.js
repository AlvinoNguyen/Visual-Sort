import React from 'react';
import Visual from '../Visual/Visual.js';

class App extends React.Component {
    constructor() {
        super();
        const bars = [];
        for(let i = 0; i < 50; i++) {
            bars.push({
                height: i * 10 + 10,
                mode: 'plain',
                key: i
            });
        };
        this.state = {
            bars
        };

        this.shuffle = this.shuffle.bind(this);
        this.sort = this.sort.bind(this);
        this.syncSetTimeout = this.syncSetTimeout.bind(this);
    }

    syncSetTimeout(func, ms, callback) {
        (function sync(done) {
            if (!done) {
                setTimeout(function() {
                    func.apply(func);
                    sync(true);
                }, ms);
                return;
            }
        })();
    }

    shuffle() {
        const bars = this.state.bars.slice();
        for(let i = 0; i < bars.length; i++) {
            const randIndex = Math.floor(bars.length * Math.random());
            const temp = bars[i];
            bars[i] = bars[randIndex];
            bars[randIndex] = temp;
        }
        this.setState({bars});
    }

    sort() {
        const bars = this.state.bars.slice();
        bars.sort((a, b) => {
            return a.key - b.key;
        });
        this.setState({bars});
    }

    render() {
        return (
            <div className="app-container">
                <Visual bars={this.state.bars}/>
                <button onClick={this.shuffle}>shuffle</button>
                <button onClick={this.sort}>sort</button>
            </div>
        );
    }
}

export default App;