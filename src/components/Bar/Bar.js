import React from 'react';
import '../Bar/Bar.css';

class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.initialMode
        };
        this.setMode = this.setMode.bind(this);
    }

    setMode(newMode) {
        this.setState({
            mode: newMode
        });
    }

    render() {
        return (
            <div
                className={`${this.state.mode} bar`}
                style={{
                    width: 10,
                    height: this.props.barHeight
                }}
            />
        );
    }
}

export default Bar;