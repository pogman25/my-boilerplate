import { delay } from 'redux-saga';
import { takeLatest, put, call } from 'redux-saga/effects';
import myFetch from '../../serviceAPI'
import {
    requestSuccess, requestFailure, requestFolders,
    actions
} from './Page/duck';
import { AxiosResponse } from 'axios';

export function* fetchInfo(action) {
    yield call(delay,1000);
    try {
        const resp: AxiosResponse = yield call(myFetch.get, '/disk');
        yield put(requestSuccess(resp.data));
    } catch(e) {
        yield put(requestFailure(e));
    }
}

export function* fetchResource(action) {
    const { url } = action;
    const fetchUrl = `disk/resources?path=disk:${!!url ? url : '/'}`
    try {
        const resp: AxiosResponse = yield call(myFetch.get, fetchUrl);
        yield put(requestFolders(resp.data));
    } catch(e) {
        yield put(requestFailure(e));
    }
}

export default function* fetchThrottle() {
    yield takeLatest(actions.RECEIVE_INFO, fetchInfo);
    yield takeLatest(actions.RECEIVE_FOLDER, fetchResource);
}