import * as React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../App/duck';
import { fetchDisk, fetchResource } from './duck';
import Header from '../../components/Header';
import Folder from '../../components/Folder';
import { IStore } from '../../../reducers/interfaces';
import { IPageState, IPageDispatch } from './interfaces';
import { getUserName, getTotalSize, getUsedSpace, getFolders } from './selectors';
import {RouteProps} from 'react-router';
import {Route, Switch} from 'react-router-dom';

const styles = require('./styles');

const mapStoreToProps = (store: IStore): IPageState => ({
    userName: getUserName(store),
    totalSpace: getTotalSize(store),
    usedSpace: getUsedSpace(store),
    folders: getFolders(store)
});
    
const mapDispatchToProps = (dispatch: Function): IPageDispatch => ({
    logOut: () => dispatch(logOut()),
    getMain: () => dispatch(fetchDisk()),
    getResource: (url?: string) => dispatch(fetchResource(url))
});

type IPage = IPageState & IPageDispatch & RouteProps;

class Page extends React.Component<IPage, any>{
    componentWillMount() {
        this.props.getMain();
    }
    render() {
        const {
            userName, totalSpace,
            usedSpace, folders,
            logOut, getResource
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
                    <Switch>
                        <Route exact path="/disk" render={props => <Folder {...props} getResource={getResource} folders={folders}/>} />
                        <Route path="/disk/:path" render={props => <Folder {...props} getResource={getResource} folders={folders}/>} />
                    </Switch>
                </main>
            </div>
        )
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Page)