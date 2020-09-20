import * as actionTypes from "./action-types";
import jwtDecode from "jwt-decode";
import BaseApi from "../../api";

const api = BaseApi();

const setUserStart = (user) => ({
    type: actionTypes.SET_USER_START,
    payload: user,
});

export const setUser = (user) => (dispatch) => {
    dispatch(setUserStart(user));
};

const signOutStart = () => ({
    type: actionTypes.SIGN_OUT_START,
});

export const signOut = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch(signOutStart());
};

const signInStart = () => ({
    type: actionTypes.SIGN_IN_START,
});

const signInSuccess = (user) => ({
    type: actionTypes.SIGN_IN_SUCCESS,
    payload: user,
});

const signInFail = (err) => ({
    type: actionTypes.SIGN_IN_FAILURE,
    payload: err,
});

export const signIn = (user) => async (dispatch) => {
    dispatch(signInStart());
    try {
        const { data, status } = await api.post("/auth/login", user);

        if (status === 200) {
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
    type: actionTypes.CLEAR_ERRORS,
});

export const clearErrors = () => (dispatch) => {
    dispatch(clearErrorsStart());
};

const searchUserStart = () => ({
    type: actionTypes.SEARCH_USER_START,
});

const searchUserSuccess = (users) => ({
    type: actionTypes.SEARCH_USER_SUCCESS,
    payload: users,
});

const searchUserFail = (errors) => ({
    type: actionTypes.SEARCH_USER_FAILURE,
    payload: errors,
});

export const searchUser = (searchValue, searchBy) => async (dispatch) => {
    dispatch(searchUserStart());
    const reqURL = `/users/search?${searchBy === "email" ? `email=${searchValue}` : `name=${searchValue}`}`;
    const data = await api.get(reqURL);

    if (Array.isArray(data)) {
        dispatch(searchUserSuccess(data));
    } else {
        dispatch(searchUserFail(data));
    }
};
