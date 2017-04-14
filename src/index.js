import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class Btn extends Component {
    constructor(props) {
        super(props);

        this.determineDate = this.determineDate.bind(this);
    }

    determineDate() {
        import('moment')
            .then(moment => moment().format('LLLL'))
            .then(str => console.log(str))
            .catch(err => console.log('Failed to load moment', err));
    }

    render() {
        return (
            <div>
                <button onClick={this.determineDate}>getDate</button>
            </div>
        )
    }
}
ReactDOM.render(
    <Btn/>,
    document.getElementById('root')
);
