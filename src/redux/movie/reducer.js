import * as actionTypes from "./action-types";

const INITIAL_STATE = {
    isLoading: false,
    isCrawling: false,
    moviesList: [],
    total: 0,
    numberOfNewMovies: 0,
    isSuccess: false,
};

export default function (state = INITIAL_STATE, action) {
    const { payload } = action;

    switch (action.type) {
        case actionTypes.FETCH_MOVIES_LIST_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.FETCH_MOVIES_LIST_SUCCESS:
            const { movies, total } = payload;

            return {
                ...state,
                isLoading: false,
                moviesList: movies,
                total,
            };
        case actionTypes.CRAWL_MOVIE_START:
            return {
                ...state,
                isCrawling: true,
                isSuccess: false,
            };
        case actionTypes.CRAWL_MOVIES_SUCCESS:
            return {
                ...state,
                isCrawling: false,
                moviesList: payload.concat(state.moviesList),
                numberOfNewMovies: payload.length,
                isSuccess: true,
            };
        case actionTypes.CRAWL_MOVIES_FAILURE:
            return {
                ...state,
                isCrawling: false,
            };
        default:
            return state;
    }
}
