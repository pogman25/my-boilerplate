import * as React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../App/duck';
import { fetchDisk } from './duck';
import Header from '../../components/Header';
import Folder from '../../components/Folder';
import { IStore } from '../../../reducers/interfaces';
import { IPageState, IPageDispatch } from './interfaces';
import { getUserName, getTotalSize, getUsedSpace } from './selectors';
import {RouteProps} from 'react-router';

const get = require('lodash/get');
const styles = require('./styles');

const mapStoreToProps = (store: IStore): IPageState => ({
    userName: getUserName(store),
    totalSpace: getTotalSize(store),
    usedSpace: getUsedSpace(store),
    routeFiles: store.profile.routeFiles
});
    
const mapDispatchToProps = (dispatch: Function): IPageDispatch => ({
    logOut: () => dispatch(logOut()),
    getMain: () => dispatch(fetchDisk())
});

type IPage = IPageState & IPageDispatch & RouteProps;

class Page extends React.Component<IPage, any>{
    componentWillMount() {
        this.props.getMain();
    }
    render() {
        const {
            userName, totalSpace,
            usedSpace, routeFiles,
            logOut
        } = this.props;
        return (
            <div>
                <Header
                    userName={userName}
                    logOut={logOut}
                    totalSpace={totalSpace}
                    usedSpace={usedSpace}
                />
                <main className={styles.main}>
                   <Folder
                        list={get(routeFiles, 'items', [])}
                   />
                </main>
            </div>
        )
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Page)