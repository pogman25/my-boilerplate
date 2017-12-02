import {combineReducers} from 'redux';
import app from '../app/containers/App/duck';
import profile from '../app/containers/Page/duck';
import { IStore } from './interfaces';

const reducer = combineReducers<IStore>({
    app,
    profile
});

export default reducer;