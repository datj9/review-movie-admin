import * as actionTypes from "./action-types";
import jwtDecode from "jwt-decode";
import BaseApi from "../../api";

const api = BaseApi();

const signUpStart = () => ({
    type: actionTypes.SIGN_UP_START,
});

const signUpSuccess = (user) => ({
    type: actionTypes.SIGN_UP_SUCCESS,
    payload: user,
});

const signUpFail = (err) => ({
    type: actionTypes.SIGN_UP_FAILURE,
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
    type: actionTypes.CLEAR_ERRORS,
});

export const clearErrors = () => (dispatch) => {
    dispatch(clearErrorsStart());
};

const saveTutorialStart = () => ({
    type: actionTypes.SAVE_TUTORIAL_START,
});

const saveTutorialSuccess = (savedTutorials) => ({
    type: actionTypes.SAVE_TUTORIAL_SUCCESS,
    payload: savedTutorials,
});

const saveTutorialFail = (err) => ({
    type: actionTypes.SAVE_TUTORIAL_FAILURE,
    payload: err,
});

export const saveTutorial = (tutorialId) => async (dispatch) => {
    dispatch(saveTutorialStart());
    const data = await api.post(`/auth/save-tutorial?tutorialId=${tutorialId}`);

    if (data.token) {
        const decoded = jwtDecode(data.token);
        localStorage.setItem("token", data.token);
        dispatch(saveTutorialSuccess(decoded.savedTutorials));
    } else {
        dispatch(saveTutorialFail(data));
    }
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

const createMentorStart = () => ({
    type: actionTypes.CREATE_MENTOR_START,
});

const createMentorSuccess = (mentor) => ({
    type: actionTypes.CREATE_MENTOR_SUCCESS,
    payload: mentor,
});

const createMentorFail = (errors) => ({
    type: actionTypes.CREATE_MENTOR_FAILURE,
    payload: errors,
});

export const createMentor = (mentorInfo) => async (dispatch) => {
    dispatch(createMentorStart());
    const data = await api.post("/mentors", mentorInfo);

    if (data.id) {
        dispatch(createMentorSuccess(data));
    } else {
        dispatch(createMentorFail(data));
    }
};

const getMentorsListStart = () => ({
    type: actionTypes.GET_MENTORS_START,
});
const getMentorsListSuccess = (mentorsList) => ({
    type: actionTypes.GET_MENTORS_SUCCESS,
    payload: mentorsList,
});
export const getMentorsList = () => async (dispatch) => {
    dispatch(getMentorsListStart());
    const data = await api.get("/mentors");
    if (Array.isArray(data)) {
        dispatch(getMentorsListSuccess(data));
    }
};

const deleteMentorStart = () => ({
    type: actionTypes.DELETE_MENTOR_START,
});
const deleteMentorSuccess = (id) => ({
    type: actionTypes.DELETE_MENTOR_SUCCESS,
    payload: id,
});
export const deleteMentor = (id) => async (dispatch) => {
    dispatch(deleteMentorStart());
    const data = await api.delete(`/mentors/${id}`);
    if (data.message?.includes("success")) {
        dispatch(deleteMentorSuccess(id));
    }
};

const updateActiveOfMentorStart = () => ({
    type: actionTypes.UPDATE_ACTIVE_OF_MENTOR_START,
});
const updateActiveOfMentorSuccess = (mentorId, isActive) => ({
    type: actionTypes.UPDATE_ACTIVE_OF_MENTOR_SUCCESS,
    payload: { isActive, mentorId },
});

export const updateActiveOfMentor = (mentorId, isActive) => async (dispatch) => {
    dispatch(updateActiveOfMentorStart());
    const data = await api.patch(`/mentors/update-active/${mentorId}`, { isActive });
    if (data.message?.includes("success")) {
        dispatch(updateActiveOfMentorSuccess(mentorId, isActive));
    }
};
