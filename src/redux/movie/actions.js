import * as actionTypes from "./action-types";
import BaseAPI from "../../api";

const api = BaseAPI();

export const fetchMoviesList = (pageSize = 10, pageIndex = 1) => async (dispatch) => {
    dispatch({
        type: actionTypes.FETCH_MOVIES_LIST_START,
    });

    const { data, status } = await api.get(`/movies?pageSize=${pageSize}&&pageIndex=${pageIndex}`);

    if (status === 200) {
        dispatch({
            type: actionTypes.FETCH_MOVIES_LIST_SUCCESS,
            payload: data,
        });
    } else {
        dispatch({
            type: actionTypes.FETCH_MOVIES_LIST_FAILURE,
        });
    }
};

export const crawlMovies = () => async (dispatch) => {
    dispatch({
        type: actionTypes.CRAWL_MOVIE_START,
    });

    const { data, status } = await api.get("/movies/crawl-movies");
    if (status === 200 || status === 201) {
        dispatch({ type: actionTypes.CRAWL_MOVIES_SUCCESS, payload: data });
    } else {
        dispatch({ type: actionTypes.CRAWL_MOVIES_FAILURE });
    }
};
