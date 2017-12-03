import *as React from 'react';
import {Link} from 'react-router-dom';

const folderPic = require('../../../images/folder.png');
const styles = require('./styles');

export default class FolderItem extends React.Component<any, any>{
    state = {
        chosenFile: ''
    }

    downLoad = () => {
        const {data, preDownLoad} = this.props;
        preDownLoad(data.path || '')
            .then((res) => this.setState({
                chosenFile: res.href 
            })
        )
    }

    resetDownLoad = () => {
        this.setState({
            chosenFile: ''
        })
    }

    render() {
        const {data} = this.props;
        const { chosenFile } = this.state;
        if(data.type === 'dir') {
            return (
                <div className={styles.folder}>
                    <div className={styles.icon}>
                        <Link
                            to={`/disk/${data.path.replace(/^disk:\//, '')}`}
                        >
                            <img src={folderPic} alt="папка"/>
                        </Link>
                    </div>
                    <p>{data.name}</p>
                </div>
            )
        } else {
            return (
                <div
                    className={styles.file}
                >
                    {!!chosenFile ?
                        <div>
                            <img
                                src={data.preview}
                                alt="файл"
                                onClick={this.resetDownLoad}
                            />
                            <a href={chosenFile}>Скачать</a>
                        </div>
                        
                        :
                        <img
                            src={data.preview}
                            alt="файл"
                            onClick={this.downLoad}
                        />
                    }
                    <p>{data.name}</p>
                </div>
            )
        }
    }
}