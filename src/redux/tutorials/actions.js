import {
    FETCH_TUTORIALS_START,
    FETCH_TUTORIALS_SUCCESS,
    FETCH_TUTORIALS_FAILURE,
    UPLOAD_IMAGE_START,
    UPLOAD_IMAGE_SUCCESS,
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
        const data = await api.get("/products");
        dispatch(fetchTutorialsSuccess(data));
    } catch (error) {
        dispatch(fetchTutorialsFailure(error));
    }
};

const uploadImageStart = () => ({
    type: UPLOAD_IMAGE_START,
});

const uploadImageSuccess = (url) => ({
    type: UPLOAD_IMAGE_SUCCESS,
    payload: url,
});

export const uploadImage = (file) => async (dispatch) => {
    dispatch(uploadImageStart());
    const formData = new FormData();
    formData.append("image", file);
    const { linkUrl } = await api.post("/tutorials/upload-image", formData, "formData");
    dispatch(uploadImageSuccess(linkUrl));
};
