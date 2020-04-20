import React from 'react';
import '../Visual/Visual.css';
import '../Bar/Bar.css';

class Visual extends React.Component {
    render() {
        return (
            <div className="visual">
                {this.props.bars.map(bar => <div
                    className={`${bar.mode} bar`}
                    style={{
                        width: 5,
                        height: bar.height
                    }}
                />)}
            </div>
        );
    }
}

export default Visual;