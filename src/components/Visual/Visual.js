import React from 'react';
import '../Visual/Visual.css';
import '../Bar/Bar.css';

class Visual extends React.Component {
    render() {
        return (
            <div
                className="visual"
                style={{
                    width: this.props.width,
                    height: this.props.height
                }}
            >
                {this.props.bars.map(bar => <div
                    className={`${bar.mode} bar`}
                    style={{
                        width: bar.width,
                        height: bar.height
                    }}
                />)}
            </div>
        );
    }
}

export default Visual;