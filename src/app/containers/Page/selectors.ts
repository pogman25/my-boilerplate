import {IStore} from '../../../reducers/interfaces';
import {createSelector} from 'reselect';

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