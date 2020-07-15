import actionTypes from "./action-types";
import BaseApi from "../../api";

const api = BaseApi();

const getTrackingsStart = () => ({
    type: actionTypes.GET_TRACKINGS_START,
});

const getTrackingsSuccess = (trackings) => ({
    type: actionTypes.GET_TRACKINGS_SUCCESS,
    payload: trackings,
});

export const getTrackings = () => async (dispatch) => {
    dispatch(getTrackingsStart());
    const data = await api.get("/trackings");
    if (Array.isArray(data)) {
        dispatch(getTrackingsSuccess(data));
    }
};
