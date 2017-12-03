import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import {AppearItem} from '../../../commonComponents/Appear';
import FolderItem from '../FolderItem'

const styles = require('./styles');

export default class Folder extends React.Component<any, any> {

    componentWillMount() {
        const {getResource, match: {params}} = this.props;
        getResource(params.path);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.match.params.path !== nextProps.match.params.path) {
            this.props.getResource(nextProps.match.params.path);
        }
    }

    render() {
        const {folders, match: {params}} = this.props;
        console.log(folders, params.path);
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
                            type={i.type}
                            name={i.name}
                            preview={i.preview}
                        />
                    </AppearItem>
                ))
                }
            </TransitionGroup>
        )
    }
}