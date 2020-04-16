import React from 'react';
import Visual from '../Visual/Visual.js';

class App extends React.Component {
    constructor() {
        super();
        const bars = [];
        for(let i = 0; i < 100; i++) {
            bars.push({
                height: i * 5 + 5,
                mode: 'plain',
                key: i
            });
        };
        this.state = {bars};

        this.shuffle = this.shuffle.bind(this);
        this.sort = this.sort.bind(this);
        this.selectionSort = this.selectionSort.bind(this);
        this.insertionSort = this.insertionSort.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
    }

    resolveLater(n) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, n);
        });
    }

    async shuffle() {
        const bars = this.state.bars.slice();
        for(let i = 0; i < bars.length; i++) {
            const randIndex = Math.floor(bars.length * Math.random());
            bars[i].mode = 'current';
            bars[randIndex].mode = 'selected';
            await this.resolveLater(1000 / bars.length);
            this.setState({bars});
            const temp = bars[i];
            bars[i] = bars[randIndex];
            bars[randIndex] = temp;
            bars[i].mode = 'plain';
            bars[randIndex].mode = 'plain';
        }
        this.setState({bars});
    }

    async sort() {
        function resolveLater(n) { 
            return new Promise(resolve => {
              setTimeout(() => {
                console.log('test');
                resolve();
              }, n);
            });
        }  
        const bars = this.state.bars.slice();
        bars.sort(async (a, b) => {
            await resolveLater(100);
            return a.key - b.key;
        });
        this.setState({bars});
    }

    async selectionSort() {
        const bars = this.state.bars.slice();
        for(let i = 0; i < bars.length; i++) {
            let minIndex = i, minHeight = bars[i].height;
            for(let j = i + 1; j < bars.length; j++) {
                if(minHeight > bars[j].height) {
                    minHeight = bars[j].height;
                    minIndex = j;
                }
            }
            const temp = bars[i];
            bars[i] = bars[minIndex];
            bars[minIndex] = temp;
            bars[i].mode = 'current';
            bars[minIndex].mode = 'selected';
            this.setState({bars});
            bars[i].mode = 'plain';
            bars[minIndex].mode = 'plain';
            await this.resolveLater(5000 / bars.length);
            this.setState({bars});
        }
    }

    async insertionSort() {
        const bars = this.state.bars.slice();
        for(let i = 0; i < bars.length; i++) {
            for(let j = i; j > 0; j--) {
                bars[i].mode = 'current';
                if(bars[j].height > bars[j-1].height) {
                    bars[0].mode = 'plain';
                    bars[j].mode = 'plain';
                    this.setState({bars});
                    break;
                } else {
                    bars[j].mode = 'selected';
                    this.setState({bars});
                    const temp = bars[j];
                    bars[j] = bars[j-1];
                    bars[j-1] = temp;
                    await this.resolveLater(1 / bars.length);
                    bars[j].mode = 'plain';
                }
            }
            bars[i].mode = 'plain';
        }
        this.setState({bars});
    }

    async bubbleSort() {
        const bars = this.state.bars.slice();
        let swapped = true;
        while(swapped) {
            swapped = false;
            for(let i = 0; i < bars.length - 1; i++) {
                bars[i].mode = 'current';
                bars[i+1].mode = 'selected';
                if(bars[i].height > bars[i+1].height) {
                    const temp = bars[i];
                    bars[i] = bars[i+1];
                    bars[i+1] = temp;
                    swapped = true;
                    this.setState({bars});
                    await this.resolveLater(1 / bars.length);
                }
                bars[i].mode = 'plain';
                bars[i+1].mode = 'plain';
            }
        }
        this.setState({bars});
    }

    render() {
        return (
            <div className="app-container">
                <Visual bars={this.state.bars}/>
                <button onClick={this.shuffle}>shuffle</button>
                <button onClick={this.selectionSort}>selection sort</button>
                <button onClick={this.insertionSort}>insertion sort</button>
                <button onClick={this.bubbleSort}>bubble sort</button>
            </div>
        );
    }
}

export default App;