import * as actionTypes from "./action-types";
import BaseApi from "../../api";

const api = BaseApi();

const fetchNewsListStart = () => ({
    type: actionTypes.FETCH_NEWS_LIST_START,
});

const fetchNewsListSuccess = (tutorials) => ({
    type: actionTypes.FETCH_NEWS_LIST_SUCCESS,
    payload: tutorials,
});

const fetchNewsListFailure = (err) => ({
    type: actionTypes.FETCH_NEWS_LIST_FAILURE,
    payload: err,
});

export const fetchNewsList = (pageIndex = 1, pageSize = 9) => async (dispatch) => {
    dispatch(fetchNewsListStart());

    const { data, status } = await api.get(`/tutorials?pageSize=${pageSize}&&pageIndex=${pageIndex}`);

    if (status === 200) {
        dispatch(fetchNewsListSuccess(data));
    } else {
        dispatch(fetchNewsListFailure(data));
    }
};

const fetchNewsStart = () => ({
    type: actionTypes.FETCH_NEWS_START,
});

const fetchNewsSuccess = (tutorial) => ({
    type: actionTypes.FETCH_NEWS_SUCCESS,
    payload: tutorial,
});

export const fetchNews = (tutorialId) => async (dispatch) => {
    dispatch(fetchNewsStart());
    const { data, status } = await api.get(`/tutorials/${tutorialId}?reqFromAd=true`);

    if (status === 200) {
        dispatch(fetchNewsSuccess(data));
    }
};

const uploadImageStart = () => ({
    type: actionTypes.UPLOAD_IMAGE_START,
});

const uploadImageSuccess = (url) => ({
    type: actionTypes.UPLOAD_IMAGE_SUCCESS,
    payload: url,
});

const uploadImageFailure = (err) => ({
    type: actionTypes.UPLOAD_IMAGE_FAILURE,
    payload: err,
});

export const uploadImage = (file) => async (dispatch) => {
    dispatch(uploadImageStart());
    const formData = new FormData();
    formData.append("image", file);
    const { data, status } = await api.post("/news/upload-image", formData, "formData");

    if (status === 200 || status === 201) {
        dispatch(uploadImageSuccess(data.linkUrl));
    } else {
        dispatch(uploadImageFailure(data));
    }
};

export const createNewsStart = () => ({
    type: actionTypes.CREATE_NEWS_START,
});

export const createNewsSuccess = (tutorial) => ({
    type: actionTypes.CREATE_NEWS_SUCCESS,
    payload: tutorial,
});

export const createNewsFail = (err) => ({
    type: actionTypes.CREATE_NEWS_FAILURE,
    payload: err,
});

export const createNews = (tutorial) => async (dispatch) => {
    dispatch(createNewsStart());
    const { data, status } = await api.post("/tutorials", tutorial);

    if (status === 201) {
        dispatch(createNewsSuccess(data));
    } else {
        dispatch(createNewsFail(data));
    }
};

const deleteNewsStart = () => ({
    type: actionTypes.DELETE_NEWS_START,
});

const deleteNewsSuccess = (tutorialId) => ({
    type: actionTypes.DELETE_NEWS_SUCCESS,
    payload: tutorialId,
});

export const deleteNews = (newsId) => async (dispatch) => {
    dispatch(deleteNewsStart());
    const { status } = await api.delete(`/news/${newsId}`);

    if (status === 200) {
        dispatch(deleteNewsSuccess(newsId));
    }
};

const updateTutorialStart = () => ({
    type: actionTypes.UPDATE_NEWS_START,
});

const updateTutorialSuccess = () => ({
    type: actionTypes.UPDATE_NEWS_SUCCESS,
});

const updateTutorialFail = (err) => ({
    type: actionTypes.UPDATE_NEWS_FAILURE,
    payload: err,
});

export const updateTutorial = (tutorialId, updateData) => async (dispatch) => {
    dispatch(updateTutorialStart());
    const data = await api.put(`/tutorials/${tutorialId}`, updateData);
    if (data?.id) {
        dispatch(updateTutorialSuccess());
    } else {
        dispatch(updateTutorialFail(data));
    }
};

export const clearNews = () => ({
    type: actionTypes.CLEAR_NEWS,
});

export const clearNewsList = () => (dispatch) => {
    dispatch({
        type: actionTypes.CLEAR_NEWS_LIST,
    });
};

const clearErrorsAndLinkStart = () => ({
    type: actionTypes.CLEAR_ERRORS_AND_LINK,
});

export const clearErrorsAndLink = () => (dispatch) => {
    dispatch(clearNews());
    dispatch(clearErrorsAndLinkStart());
};

const searchNewsListStart = () => ({
    type: actionTypes.SEARCH_NEWS_LIST_START,
});
const searchNewsListSuccess = (tutorials) => ({
    type: actionTypes.SEARCH_NEWS_LIST_SUCCESS,
    payload: tutorials,
});
export const searchNewsList = (technologies) => async (dispatch) => {
    dispatch(searchNewsListStart());

    const data = await api.get(`/tutorials?tags=${JSON.stringify(technologies)}`);
    if (Array.isArray(data)) {
        dispatch(searchNewsListSuccess(data));
    }
};
