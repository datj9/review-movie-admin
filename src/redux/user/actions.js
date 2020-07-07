import {
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    SET_USER_START,
    SIGN_OUT_START,
    SIGN_IN_START,
    SIGN_IN_FAILURE,
    SIGN_IN_SUCCESS,
    CLEAR_ERRORS,
} from "./action-types";
import jwtDecode from "jwt-decode";
import BaseApi from "../../api";

const api = BaseApi();

const signUpStart = () => ({
    type: SIGN_UP_START,
});

const signUpSuccess = (user) => ({
    type: SIGN_UP_SUCCESS,
    payload: user,
});

const signUpFail = (err) => ({
    type: SIGN_UP_FAILURE,
    payload: err,
});

export const signUp = (user) => async (dispatch) => {
    dispatch(signUpStart());
    try {
        const data = await api.post("/auth/sign-up", user);
        if (data.token) {
            const decoded = jwtDecode(data.token);
            localStorage.setItem("token", data.token);
            dispatch(signUpSuccess(decoded));
        } else {
            dispatch(signUpFail(data));
        }
    } catch (error) {
        dispatch(signUpFail(error));
    }
};

const setUserStart = (user) => ({
    type: SET_USER_START,
    payload: user,
});

export const setUser = (user) => (dispatch) => {
    dispatch(setUserStart(user));
};

const signOutStart = () => ({
    type: SIGN_OUT_START,
});

export const signOut = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch(signOutStart());
};

const signInStart = () => ({
    type: SIGN_IN_START,
});

const signInSuccess = (user) => ({
    type: SIGN_IN_SUCCESS,
    payload: user,
});

const signInFail = (err) => ({
    type: SIGN_IN_FAILURE,
    payload: err,
});

export const signIn = (user) => async (dispatch) => {
    dispatch(signInStart());
    try {
        const data = await api.post("/auth/sign-in", user);

        if (data.token) {
            const decoded = jwtDecode(data.token);
            localStorage.setItem("token", data.token);
            dispatch(signInSuccess(decoded));
        } else {
            dispatch(signInFail(data));
        }
    } catch (error) {
        dispatch(signInFail(error));
    }
};

const clearErrorsStart = () => ({
    type: CLEAR_ERRORS,
});

export const clearErrors = () => (dispatch) => {
    dispatch(clearErrorsStart());
};
