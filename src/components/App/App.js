import React from 'react';
import Visual from '../Visual/Visual.js';
import './App.css';

class App extends React.Component {
    constructor() {
        const numBars = 100;
        const barWidth = 3;

        super();
        const bars = [];
        for(let i = 0; i < numBars; i++) {
            bars.push({
                width: barWidth,
                height: i * barWidth + barWidth,
                mode: 'plain',
            });
        };
        this.state = {bars};

        this.shuffle = this.shuffle.bind(this);
        this.sort = this.sort.bind(this);
        this.selectionSort = this.selectionSort.bind(this);
        this.insertionSort = this.insertionSort.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
        this.merge = this.merge.bind(this);
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
            bars[minIndex].mode = 'selected';
            bars[i].mode = 'current';
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

    async mergeSort(bars, start, end) {
        if(end - start <= 1) return;
        const mid = Math.floor((start + end) / 2);
        await this.mergeSort(bars, start, mid);
        await this.mergeSort(bars, mid, end);
        await this.merge(bars, start, mid, end);
        this.setState({bars});
    }

    async merge(bars, start, mid, end) {
        let i = start, j = mid, subBars = [];
        while(i < mid || j < end) {
            if(i !== end) bars[i].mode = 'current';
            if(j !== end) bars[j].mode = 'current';
            this.setState({bars});
            if(i === mid) {
                subBars.push(bars[j]);
                j++;
            } else if(j === end) {
                subBars.push(bars[i]);
                i++;
            } else if(bars[i].height > bars[j].height) {
                subBars.push(bars[j]);
                j++;
            } else {
                subBars.push(bars[i]);
                i++;
            }
            if(i !== end && i !== start) bars[i-1].mode = 'plain';
            if(j !== end && j !== start) bars[j-1].mode = 'plain';
            this.setState({bars});
        }
        for(let i = 0; i < subBars.length; i++) {
            subBars[i].mode = 'selected';
            bars[start+i] = subBars[i];
            this.setState({bars});
            subBars[i].mode = 'plain';
            await this.resolveLater(1500 / bars.length);
        }
        bars[end - 1].mode = 'plain';
    }

    async quickSort(bars, start, end) {
        if(start < end) {
            const p = await this.partition(bars, start, end);
            await this.quickSort(bars, start, p-1);
            await this.quickSort(bars, p+1, end);
        }
    }

    async partition(bars, start, end) {
        let pivot = bars[end].height;
        let i = start;
        bars[i].mode = 'selected';
        for(let j = start; j < end; j++) {
            if(bars[j].height < pivot) {
                const temp = bars[i];
                bars[i] = bars[j];
                bars[j] = temp;
                bars[i].mode = 'plain';
                i++;
                bars[i].mode = 'selected';
            }
            bars[j].mode = 'current';
            this.setState({bars});
            await this.resolveLater(1500 / bars.length);
            bars[j].mode = 'plain';
        }
        const temp = bars[i];
        bars[i] = bars[end];
        bars[end] = temp;
        bars[i].mode = 'plain';
        bars[end].mode = 'plain';
        this.setState({bars});
        return i;
    }

    render() {
        return (
            <div className="app-container">
                <header className="test-border">
                    <h1>Visual Sort</h1>
                    <div className="corner top-left"></div>
                    <div className="corner top-right"></div>
                    <div className="corner bottom-left"></div>
                    <div className="corner bottom-right"></div>
                </header>
                <div className="test-border">
                    <Visual
                        bars={this.state.bars}
                        width={this.state.bars[0].width * this.state.bars.length}
                        height={this.state.bars[0].width * this.state.bars.length}
                    />
                    <div className="corner top-left"></div>
                    <div className="corner top-right"></div>
                    <div className="corner bottom-left"></div>
                    <div className="corner bottom-right"></div>
                </div>
                <button onClick={this.shuffle}>shuffle</button>
                <button onClick={this.selectionSort}>selection sort</button>
                <button onClick={this.insertionSort}>insertion sort</button>
                <button onClick={this.bubbleSort}>bubble sort</button>
                <button onClick={() => this.mergeSort(this.state.bars.slice(), 0, this.state.bars.length)}>mergesort</button>
                <button onClick={() => this.quickSort(this.state.bars.slice(), 0, this.state.bars.length - 1)}>quicksort</button>
            </div>
        );
    }
}

export default App;