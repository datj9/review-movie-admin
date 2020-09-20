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

export const fetchNewsList = (pageSize = 9, pageIndex = 1) => async (dispatch) => {
    dispatch(fetchNewsListStart());

    const { data, status } = await api.get(`/news?pageSize=${pageSize}&&pageIndex=${pageIndex}`);

    if (status === 200) {
        dispatch(fetchNewsListSuccess(data));
    } else {
        dispatch(fetchNewsListFailure(data));
    }
};

const fetchNewsStart = () => ({
    type: actionTypes.FETCH_NEWS_START,
});

const fetchNewsSuccess = (news) => ({
    type: actionTypes.FETCH_NEWS_SUCCESS,
    payload: news,
});

export const fetchNews = (newsId) => async (dispatch) => {
    dispatch(fetchNewsStart());
    const { data, status } = await api.get(`/news/${newsId}?reqFromAd=true`);

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

export const createNewsSuccess = (news) => ({
    type: actionTypes.CREATE_NEWS_SUCCESS,
    payload: news,
});

export const createNewsFail = (err) => ({
    type: actionTypes.CREATE_NEWS_FAILURE,
    payload: err,
});

export const createNews = (news) => async (dispatch) => {
    dispatch(createNewsStart());
    const { data, status } = await api.post("/news", news);

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
    const data = await api.put(`/news/${tutorialId}`, updateData);
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
