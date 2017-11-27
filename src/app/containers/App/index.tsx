import * as React from 'react';

const styles = require('./styles.scss');

export class App extends React.Component<any, any> {
    render() {
        return (
        <div className={styles.main}>
            <h1>Начало положено</h1>
        </div>
        )
    }
}