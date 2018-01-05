import { delay } from 'redux-saga';
import { takeLatest, put, call } from 'redux-saga/effects';
import myFetch from '../../serviceAPI'
import { requestSuccess, requestFailure, RECEIVE_INFO } from './Page/duck';
import { AxiosResponse } from 'axios';

function* fetchInfo() {
    yield delay(1000);
    try {
        const resp: AxiosResponse = yield call(myFetch.get, '/disk');
        yield put(requestSuccess(resp.data));
    } catch(e) {
        yield put(requestFailure(e));
    }
}

export default function* fetchThrottle() {
    yield takeLatest(RECEIVE_INFO, fetchInfo);
}