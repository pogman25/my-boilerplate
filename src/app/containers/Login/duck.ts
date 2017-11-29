import {authURL} from '../../../serviceAPI';
import {logIn} from '../App/duck';

// Actions

// Reducers

// Action Creators

export const authLogin = () => {
    return (dispatch: Function): void => {
        const left = ((window.innerWidth / 2) - 320) + window.screenLeft;
        const top = ((window.innerHeight / 2) - 250) + window.screenTop;

        window.open(authURL, "OAuth", `left=${left},top=${top},width=640,height=500`);

        const authorize = function (event: any) {
            const eventData = JSON.parse(event.data);
            if (eventData.type == "token") {
                localStorage.setItem("token", eventData.token);
                dispatch(logIn())
                window.removeEventListener("message", authorize, false);
            }
        };

        window.addEventListener("message", authorize, false);
    }
};
