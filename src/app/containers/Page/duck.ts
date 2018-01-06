import myFetch from '../../../serviceAPI/index';
import { IAction } from '../../../commonComponents/interfaces';
import { combineReducers } from 'redux';
import { IProfileInfo, IPageReducer } from './interfaces';

const get = require('lodash/get');

// Actions
const prefix = 'app/';
export const actions = {
    RECEIVE_INFO: `${prefix}RECEIVE_INFO`,
    RECEIVE_FOLDER: `${prefix}RECEIVE_FOLDER`,
    REQUEST_INFO_SUCCESS: `${prefix}REQUEST_INFO_SUCCESS`,
    REQUEST_INFO_FAILURE: `${prefix}REQUEST_INFO_FAILURE`,
    REQUEST_FOLDERS: `${prefix}REQUEST_FOLDERS`,
    DOWNLOAD_FILE: `${prefix}DOWNLOAD_FILE`
}

// Reducers

export const isFetching = (state = false, action: IAction): boolean => {
    switch(action.type) {
        case actions.RECEIVE_INFO:
            return true;
        case actions.REQUEST_INFO_SUCCESS:
        case actions.REQUEST_INFO_FAILURE:
        case actions.REQUEST_FOLDERS:
        case actions.DOWNLOAD_FILE:
            return false;
        default:
            return state;
    }
}

const init = {
    user: {
        login: '',
        uid: null
    },
    totalSpace: 1,
    usedSpace: null
}

const profileInfo = (state = init, action: IAction): IProfileInfo => {
    switch(action.type) {
        case actions.REQUEST_INFO_SUCCESS:
            return {
                user: action.payload.user,
                totalSpace: action.payload.total_space,
                usedSpace: action.payload.used_space
            }
        default:
            return state;
    }
}

const routeFiles = (state = {}, action: IAction) => {
    switch(action.type) {
        case actions.REQUEST_FOLDERS:
            return get(action.payload, '_embedded', {});
        default:
            return state;
    }
}

const reducer = combineReducers<IPageReducer>({
    isFetching,
    profileInfo,
    routeFiles
})

export default reducer;

// Action Creators

// export function fetchDisk() {
//     return async (dispatch: Function) => {

//         dispatch(receive());

//         try {
//             const responce = await myFetch.get('/disk');
            
//             if(responce.status === 200) {
//                 dispatch(requestSuccess(responce.data))
//             } else {
//                 dispatch(requestFailure(responce.data))
//             }

//         } catch(e) {
//             dispatch(requestFailure(e))
//             console.log(e);
//         }
//     }
// }

// export function fetchResource(url = '/') {
//     return async (dispatch: Function) => {

//         dispatch(receive());

//         try {
//             const folders = await myFetch.get(`disk/resources?path=disk:${!!url ? url : '/'}`);
            
//             if(folders.status === 200) {
//                 dispatch(requestFolders(folders.data))
//             } else {
//                 dispatch(requestFailure(folders.data))
//             }

//         } catch(e) {
//             dispatch(requestFailure(e))
//             console.log(e);
//         }
//     }
// }

export function preDownLoad(path: string) {
    return async (dispatch: Function) => {

        dispatch(receive());

        try {
            const responce = await myFetch.get(`disk/resources/download?path=${path}`);
            
            if(responce.status === 200) {
                dispatch(downloadFile())
            } else {
                dispatch(requestFailure(responce.data))
            }

            return responce.data;

        } catch(e) {
            dispatch(requestFailure(e))
            console.log(e);
            return e.status;
        }
    }
}

export const receive = () => ({
    type: actions.RECEIVE_INFO
})

export const fetchResource = (url = '/') => ({
    type: actions.RECEIVE_FOLDER,
    url
})

export const requestSuccess = (body) => ({
    type: actions.REQUEST_INFO_SUCCESS,
    payload: body
})

export const requestFolders = (body) => ({
    type: actions.REQUEST_FOLDERS,
    payload: body
})

export const requestFailure = (error) => ({
    type: actions.REQUEST_INFO_FAILURE,
    payload: error
})

const downloadFile = () => ({
    type: actions.DOWNLOAD_FILE
})

export const reset = () => ({
    type: actions.REQUEST_INFO_FAILURE,
    payload: {}
})