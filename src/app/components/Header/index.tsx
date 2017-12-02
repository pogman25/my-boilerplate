import * as React from 'react';

const styles = require('./styles');

interface IHeader {
    userName: string;
    logOut: () => void;
    totalSpace: number;
    usedSpace: number;
}

export default class Header extends React.Component<IHeader, any> {
    render() {
        const {userName, logOut, totalSpace, usedSpace} = this.props;
        return (
            <header className={styles.header}>
                <div className={styles.size}>
                    <p>Размер вашего Яндекс диска</p>
                    <div
                        className={styles.sizeBar}
                    >
                        <div
                            className={styles.sizeBarPrint}
                            style={{
                                width: `${usedSpace*100/totalSpace}%`
                            }}
                        />
                    </div>
                </div>
                <div className={styles.profile}>
                    <p>{userName}</p>
                    <div
                        className={styles.logout}
                        onClick={logOut}
                    >
                        <p>Выход</p>
                    </div>
                </div>
            </header>
        )
    }
}