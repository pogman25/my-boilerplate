import *as React from 'react';
import {Link} from 'react-router-dom';

const folderPic = require('../../../images/folder.png');
const styles = require('./styles');

export default class FolderItem extends React.Component<any, any>{
    render() {
        const {type, name, preview} = this.props;
        if(type === 'dir') {
            return (
                <div className={styles.folder}>
                    <div className={styles.icon}>
                        <Link
                            to={`/disk/${name}`}
                        >
                            <img src={folderPic} alt="папка"/>
                        </Link>
                    </div>
                    <p>{name}</p>
                </div>
            )
        } else {
            return (
                <div className={styles.file}>
                    <img src={preview} alt="файл"/>
                    {name}
                </div>
            )
        }
    }
}