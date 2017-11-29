import { IAction } from '../../../commonComponents/interfaces';
import { IAppReducer } from './interfaces';
import { combineReducers } from 'redux';

// Actions

const LOG_IN = 'app/LOG_IN';
const LOG_OUT = 'app/LOG_OUT';

// Reducers

const init = localStorage.getItem('token');

const isLoggin = (state = !!init, action: IAction): boolean => {
    switch(action.type) {
        case LOG_IN:
            return true;
        case LOG_OUT:
            return false;
        default:
            return state;
    }
}

const reducer = combineReducers<IAppReducer>({
    isLoggin
})

export default reducer;

// Action Creators

export const logIn = () => ({
    type: LOG_IN,
    payload: true
})

export const logOut = () => {
    localStorage.clear();
    return (dispatch: Function) => ({
        type: LOG_OUT,
        payload: true
    })
}