import React from 'react';
import Visual from '../Visual/Visual.js';
import './App.css';

class App extends React.Component {
    constructor() {
        const numBars = 100;
        const barWidth = window.innerWidth > 600 ? 3 : 2;

        super();
        const bars = [];
        for(let i = 0; i < numBars; i++) {
            bars.push({
                width: barWidth,
                height: i * barWidth + barWidth,
                mode: 'plain',
            });
        };
        this.state = {
            bars,
            running: false
        };

        this.shuffle = this.shuffle.bind(this);
        this.selectionSort = this.selectionSort.bind(this);
        this.insertionSort = this.insertionSort.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
        this.merge = this.merge.bind(this);
        this.quickSort = this.quickSort.bind(this);
        this.heapSort = this.heapSort.bind(this);
    }

    resolveLater(n) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, n);
        });
    }

    async shuffle() {
        if(this.state.running) return;
        this.setState({running: true});
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
        this.setState({
            bars,
            running: false
        });
    }

    async selectionSort() {
        if(this.state.running) return;
        this.setState({running: true});
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
        this.setState({
            bars,
            running: false
        });
    }

    async insertionSort() {
        if(this.state.running) return;
        this.setState({running: true});
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
        this.setState({
            bars,
            running: false
        });
    }

    async bubbleSort() {
        if(this.state.running) return;
        this.setState({running: true});
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
        this.setState({
            bars,
            running: false
        });
    }

    async mergeSort(bars, start, end) {
        if(start === 0 && end === this.state.bars.length) {
            if(this.state.running) return;
            this.setState({running: true});
        }
        if(end - start <= 1) return;
        const mid = Math.floor((start + end) / 2);
        await this.mergeSort(bars, start, mid);
        await this.mergeSort(bars, mid, end);
        await this.merge(bars, start, mid, end);
        this.setState({bars});
        if(start === 0 && end === this.state.bars.length) this.setState({running: false});
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
        if(start === 0 && end === this.state.bars.length - 1) {
            if(this.state.running) return;
            this.setState({running: true});
        }
        if(start < end) {
            const p = await this.partition(bars, start, end);
            await this.quickSort(bars, start, p-1);
            await this.quickSort(bars, p+1, end);
        }
        if(start === 0 && end === this.state.bars.length - 1) this.setState({running: false});
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

    async heapSort() {
        if(this.state.running) return;
        this.setState({running: true});
        const bars = this.state.bars.slice();
        for(let i = 0; i < bars.length; i++) {
            let cur = i;
            let j = Math.floor((cur - 1) / 2);
            while(j > -1 && bars[j].height < bars[cur].height) {
                const temp = bars[cur];
                bars[cur] = bars[j];
                bars[j] = temp;
                cur = j;
                j = Math.floor((cur - 1) / 2);
                await this.resolveLater(1500 / bars.length);
                this.setState({bars});
            }
        }

        for(let i = bars.length - 1; i >= 0; i--) {
            const temp = bars[i];
            bars[i] = bars[0];
            bars[0] = temp;
            this.setState({bars});
            let cur = 0;
            let ch1 = 2 * cur + 1;
            let ch2 = 2 * cur + 2;
            while(ch1 < i) {
                const height1 = bars[ch1].height;
                const height2 = ch2 < i ? bars[ch2].height : -1;
                if(bars[cur].height < height1 || bars[cur].height < height2) {
                    const temp = bars[height1 > height2 ? ch1 : ch2];
                    bars[height1 > height2 ? ch1 : ch2] = bars[cur];
                    bars[cur] = temp;
                    cur = height1 > height2 ? ch1 : ch2;
                    ch1 = 2 * cur + 1;
                    ch2 = 2 * cur + 2;
                    this.setState({bars});
                    await this.resolveLater(1500 / bars.length);
                } else break;
            }
        }

        this.setState({
            bars,
            running: false
        });
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
                    <div className="column left">
                        <button onClick={this.shuffle}>Shuffle</button>
                        <button onClick={this.selectionSort}>Selection Sort</button>
                        <button onClick={this.insertionSort}>Insertion Sort</button>
                        <button onClick={this.bubbleSort}>Bubble Sort</button>
                    </div>
                    <div className="visual-container test-border">
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
                    <div className="column right">
                        <button onClick={() => this.mergeSort(this.state.bars.slice(), 0, this.state.bars.length)}>Mergesort</button>
                        <button onClick={() => this.quickSort(this.state.bars.slice(), 0, this.state.bars.length - 1)}>Quicksort</button>
                        <button onClick={this.heapSort}>Heapsort</button>
                    </div>
            </div>
        );
    }
}

export default App;