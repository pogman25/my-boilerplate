import {IStore} from '../../../reducers/interfaces';
import {createSelector} from 'reselect';

const get = require('lodash/get');

const profile = (store: IStore) => store.profile.profileInfo;

export const getUserName = createSelector(
    profile,
    i => i.user.login
);

export const getTotalSize = createSelector(
    profile,
    i => i.totalSpace
);

export const getUsedSpace = createSelector(
    profile,
    i => i.usedSpace
);

const folderInfo = (store: IStore) => store.profile.routeFiles;

export const getFolders = createSelector(
    folderInfo,
    i => get(i, 'items', [])
)