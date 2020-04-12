import React from 'react';
import Bar from '../Bar/Bar.js';
import '../Visual/Visual.css';

class Visual extends React.Component {
    constructor(props) {
        super(props);
        this.bars = [];
        for(let i = 0; i < this.props.numBars; i++) {
            this.bars.push(<Bar
                barHeight={10 * i + 10}
                initialMode="plain"
                key={i}
            />);
        };
        this.state = {
            bars: this.bars
        };
        const temp = this.bars[0];
        this.bars[0] = this.bars[1];
        this.bars[1] = temp;
    }

    render() {
        return (
            <div className="visual">
                {this.state.bars}
            </div>
        );
    }
}

export default Visual;