import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import {AppearItem} from '../../../commonComponents/Appear';
import FolderItem from '../FolderItem'

const styles = require('./styles');

export default class Folder extends React.Component<any, any> {

    componentWillMount() {
        const {getResource, location: {pathname} } = this.props;
        getResource(pathname.replace(/^\/disk/, ''));
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location.pathname !== nextProps.location.pathname) {
            this.props.getResource(location.pathname.replace(/^\/disk/, ''));
        }
    }

    render() {
        const {folders, preDownLoad} = this.props;
        
        return (
            <TransitionGroup
                component='ul'
                className={styles.list}
            >
                {folders.map( (i, index) => (
                    <AppearItem
                        key={i.resource_id || 0}
                        index={index}
                        className={styles.item}
                    >
                        <FolderItem
                            data={i}
                            preDownLoad={preDownLoad}
                        />
                    </AppearItem>
                ))
                }
            </TransitionGroup>
        )
    }
}