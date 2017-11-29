import { IStore } from '../../../reducers/interfaces';

export const getIsLogged = (store: IStore) => store.app.isLoggin;