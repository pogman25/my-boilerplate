import { takeLatest } from 'redux-saga/effects';
import reducer, {
    receive, requestSuccess, isFetching,
    actions
} from '../Page/duck';
import fetchThrottle, {fetchInfo, fetchResource} from '../saga';

describe('>>>  Test Page duck.ts action creators <<<', () => {
    test('test receive action creator', () => {
        expect(receive()).toEqual({type: 'app/RECEIVE_INFO'})
    });
    test('test requestSuccess action creator', () => {
        const body = {}
        expect(requestSuccess(body)).toEqual({type: actions.REQUEST_INFO_SUCCESS, payload: body})
    })
})

describe('>>> Test Page duck.ts reducer <<<', () => {
    test('test reducer isFetching', () => {
        expect(isFetching(false, {type: actions.RECEIVE_INFO, payload: ''})).toEqual(true)
    })
    const base = {
        isFetching: false,
        profileInfo: {
            user: {
                login: '',
                uid: null
            },
            totalSpace: 1,
            usedSpace: null
        },
        routeFiles: {}
    };
    
    test('test combineReducers', () => {
        expect(reducer(base, {type: actions.RECEIVE_INFO, payload: ''})).toEqual({
            ...base,
            isFetching: true
        })
        const payload = {
            user: {
                login: 'Pog',
                uid: 123456
            },
            _embeded: {},
            someOtherKeys: [],
            total_space: 1000,
            used_space: 500
        }
        expect(reducer(base, {type: actions.REQUEST_INFO_SUCCESS, payload})).toEqual({
            ...base,
            isFetching: false,
            profileInfo: {
                user: {
                    login: 'Pog',
                    uid: 123456
                },
                totalSpace: 1000,
                usedSpace: 500
            }
        })
    })
})

describe('>>> Test Page saga.ts <<<', () => {
    test('saga test', () => {
        const gen = fetchThrottle();
        expect(gen.next()).toEqual({done: false, value: takeLatest(actions.RECEIVE_INFO, fetchInfo)})
        expect(gen.next()).toEqual({done: false, value: takeLatest(actions.RECEIVE_FOLDER, fetchResource)})
    })
})