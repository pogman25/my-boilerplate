import { IAppReducer } from "../app/containers/App/interfaces";
import { IPageReducer } from "../app/containers/Page/interfaces";

export interface IStore {
    app: IAppReducer;
    profile: IPageReducer;
}