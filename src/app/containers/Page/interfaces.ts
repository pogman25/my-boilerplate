export interface IProfileInfo {
    user: {login: string; uid:number;}
    totalSpace: number;
    usedSpace: number;
}

export interface IPageReducer {
    isFetching: boolean;
    profileInfo: IProfileInfo;
    routeFiles: any;
}

export interface IPageState {
    userName: string;
    totalSpace: number;
    usedSpace: number;
    routeFiles: any;
}

export interface IPageDispatch {
    logOut: () => void;
    getMain: () => void;
}