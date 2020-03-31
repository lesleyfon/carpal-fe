import api from "../../Utils/Api";
export const REQUEST_START = "REQUEST_START";
export const REQUEST_SUCCESS = "REQUEST_SUCCESS";
export const REQUEST_ERROR = "REQUEST_ERROR";
export const SET_USER = "SET_USER";
export const SET_EDITING = "SET_EDITING";
export const SET_PROFILE_UPDATE = "SET_PROFILE_UPDATE";

export function SignUpAction(user, props) {
    return dispatch => {
        dispatch({ type: REQUEST_START });
        console.log(user);
        api()
            .post("/auth/login", user)
            .then(res => {
                dispatch({ type: REQUEST_SUCCESS });
                localStorage.setItem("token", res.data.token);
                dispatch({ type: SET_USER, payload: res.data });
                props.history.push("/");
            })
            .catch(err => {
                dispatch({ type: REQUEST_ERROR, payload: err });
            });
    };
}

export function LogInAction(user, props) {
    return dispatch => {
        dispatch({ type: REQUEST_START });
        api()
            .post("/auth/login", user)
            .then(res => {
                dispatch({ type: REQUEST_SUCCESS });
                localStorage.setItem("token", res.data.token);
                dispatch({ type: SET_USER, payload: res.data });
                props.props.history.push("/");
            })
            .catch(err => {
                dispatch({ type: REQUEST_ERROR, payload: err });
            });
        console.log(user);
    };
}

export function SetUserAction() {
    return dispatch => {
        dispatch({ type: REQUEST_START });
        api()
            .get("/auth")
            .then(res => {
                dispatch({ type: REQUEST_SUCCESS });
                dispatch({ type: SET_USER, payload: res.data });
            })
            .catch(err => dispatch({ type: REQUEST_ERROR, payload: err }));
    };
}

export function EditProfileAction() {
    return dispatch => {
        dispatch({ type: SET_EDITING });
    };
}

export function SetProfileUpdate(user) {
    return dispatch => {
        dispatch({ type: REQUEST_START });
        api()
            .put("/auth/update", user)
            .then(res => {
                console.log(res.data);
                dispatch({ type: SET_USER, payload: res.data });
                dispatch({ type: REQUEST_SUCCESS });
            })
            .catch(err => {
                dispatch({ type: REQUEST_ERROR, payload: err });
            });
    };
}