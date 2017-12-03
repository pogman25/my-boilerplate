import ServiceAPI from '../../../serviceAPI/index';
import { IAction } from '../../../commonComponents/interfaces';
import { combineReducers } from 'redux';
import { IProfileInfo, IPageReducer } from './interfaces';

const get = require('lodash/get');

// Actions
const prefix = 'app/';
const RECEIVE_INFO = `${prefix}RECEIVE_INFO`;
const REQUEST_INFO_SUCCESS = `${prefix}REQUEST_INFO_SUCCESS`;
const REQUEST_INFO_FAILURE = `${prefix}REQUEST_INFO_FAILURE`;
const REQUEST_FOLDERS = `${prefix}REQUEST_FOLDERS`;
const DOWNLOAD_FILE = `${prefix}DOWNLOAD_FILE`;

// Reducers

const isFetching = (state = false, action: IAction): boolean => {
    switch(action.type) {
        case RECEIVE_INFO:
            return true;
        case REQUEST_INFO_SUCCESS:
        case REQUEST_INFO_FAILURE:
        case REQUEST_FOLDERS:
        case DOWNLOAD_FILE:
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

const profileInfo = (state=init, action: IAction): IProfileInfo => {
    switch(action.type) {
        case REQUEST_INFO_SUCCESS:
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
        case REQUEST_FOLDERS:
            return get(action.payload, '_embedded', {});
        default:
            return state;
    }
}

const chosenFile = (state = {}, action: IAction) => {
    switch(action.type) {
        case DOWNLOAD_FILE:
            return action.payload;
        default:
            return state;
    }
}

const reducer = combineReducers<IPageReducer>({
    isFetching,
    profileInfo,
    routeFiles,
    chosenFile
})

export default reducer;

// Action Creators

export function fetchDisk() {
    return async (dispatch: Function) => {
        const reFetch = new ServiceAPI;

        dispatch(receive());

        try {
            const responce = await reFetch.fetch().get('/disk');
            
            if(responce.status === 200) {
                dispatch(requestSuccess(responce.data))
            } else {
                dispatch(requestFailure(responce.data))
            }

        } catch(e) {
            dispatch(requestFailure(e))
            console.log(e);
        }
    }
}

export function fetchResource(url = '/') {
    return async (dispatch: Function) => {
        const reFetch = new ServiceAPI;

        dispatch(receive());

        try {
            const folders = await reFetch.fetch().get(`disk/resources?path=disk:${!!url ? url : '/'}`);
            
            if(folders.status === 200) {
                dispatch(requestFolders(folders.data))
            } else {
                dispatch(requestFailure(folders.data))
            }

        } catch(e) {
            dispatch(requestFailure(e))
            console.log(e);
        }
    }
}

export function preDownLoad(path: string) {
    return async (dispatch: Function) => {
        const reFetch = new ServiceAPI;

        dispatch(receive());

        try {
            const responce = await reFetch.fetch().get(`disk/resources/download?path=${path}`);
            
            if(responce.status === 200) {
                dispatch(downloadFile(responce.data))
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

const receive = () => ({
    type: RECEIVE_INFO
})

const requestSuccess = (body) => ({
    type: REQUEST_INFO_SUCCESS,
    payload: body
})

const requestFolders = (body) => ({
    type: REQUEST_FOLDERS,
    payload: body
})

const requestFailure = (error) => ({
    type: REQUEST_INFO_FAILURE,
    payload: error
})

const downloadFile = (answer: any) => ({
    type: DOWNLOAD_FILE,
    payload: answer
})