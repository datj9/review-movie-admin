import {
    FETCH_TUTORIALS_START,
    FETCH_TUTORIALS_SUCCESS,
    FETCH_TUTORIALS_FAILURE,
    UPLOAD_IMAGE_START,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE,
    CREATE_TUTORIAL_START,
    CREATE_TUTORIAL_SUCCESS,
    CREATE_TUTORIAL_FAILURE,
    FETCH_ONE_TUTORIAL_START,
    FETCH_ONE_TUTORIAL_SUCCESS,
    CLEAR_TUTORIAL,
} from "./action-types";
import BaseApi from "../../api";

const api = BaseApi();

const fetchTutorialsStart = () => ({
    type: FETCH_TUTORIALS_START,
});

const fetchTutorialsSuccess = (tutorials) => ({
    type: FETCH_TUTORIALS_SUCCESS,
    payload: tutorials,
});

const fetchTutorialsFailure = (err) => ({
    type: FETCH_TUTORIALS_FAILURE,
    payload: err,
});

export const fetchTutorials = () => async (dispatch) => {
    dispatch(fetchTutorialsStart());
    try {
        const data = await api.get("/tutorials");
        dispatch(fetchTutorialsSuccess(data));
    } catch (error) {
        dispatch(fetchTutorialsFailure(error));
    }
};

const fetchOneTutorialStart = () => ({
    type: FETCH_ONE_TUTORIAL_START,
});

const fetchOneTutorialSuccess = (tutorial) => ({
    type: FETCH_ONE_TUTORIAL_SUCCESS,
    payload: tutorial,
});

export const fetchOneTutorial = (id) => async (dispatch) => {
    dispatch(fetchOneTutorialStart());
    const data = await api.get(`/tutorials/${id}`);
    if (data.id) {
        dispatch(fetchOneTutorialSuccess(data));
    }
};

export const clearTutorialStart = () => ({
    type: CLEAR_TUTORIAL,
});

export const clearTutorial = () => (dispatch) => {
    dispatch(clearTutorialStart());
};

const uploadImageStart = () => ({
    type: UPLOAD_IMAGE_START,
});

const uploadImageSuccess = (url) => ({
    type: UPLOAD_IMAGE_SUCCESS,
    payload: url,
});

const uploadImageFailure = (err) => ({
    type: UPLOAD_IMAGE_FAILURE,
    payload: err,
});

export const uploadImage = (file) => async (dispatch) => {
    dispatch(uploadImageStart());
    const formData = new FormData();
    formData.append("image", file);
    const data = await api.post("/tutorials/upload-image", formData, "formData");
    if (data.linkUrl) {
        dispatch(uploadImageSuccess(data.linkUrl));
    } else {
        dispatch(uploadImageFailure(data));
    }
};

export const createTutorialStart = () => ({
    type: CREATE_TUTORIAL_START,
});

export const createTutorialSuccess = (tutorial) => ({
    type: CREATE_TUTORIAL_SUCCESS,
    payload: tutorial,
});

export const createTutorialFail = (err) => ({
    type: CREATE_TUTORIAL_FAILURE,
    payload: err,
});

export const createTutorial = (tutorial) => async (dispatch) => {
    dispatch(createTutorialStart());
    const data = await api.post("/tutorials", tutorial);
    if (data.id) {
        dispatch(createTutorialSuccess(data));
    } else {
        dispatch(createTutorialFail(data));
    }
};
