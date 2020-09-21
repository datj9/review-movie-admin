import * as actionTypes from "./action-types";

const INITIAL_STATE = {
    isLoading: false,
    newsList: [],
    total: 0,
    news: {},
    linkUrl: "",
    isUploading: false,
    error: {},
    errors: {},
    message: "",
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_NEWS_LIST_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.FETCH_NEWS_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                newsList: action.payload.listNews,
                total: action.payload.total,
            };
        case actionTypes.FETCH_NEWS_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case actionTypes.FETCH_NEWS_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.FETCH_NEWS_SUCCESS:
            return {
                ...state,
                news: action.payload,
                isLoading: false,
            };
        case actionTypes.CLEAR_NEWS:
            return {
                ...state,
                news: {},
            };
        case actionTypes.UPLOAD_IMAGE_START:
            return {
                ...state,
                isUploading: true,
            };
        case actionTypes.UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                isUploading: false,
                linkUrl: action.payload,
            };
        case actionTypes.CLEAR_NEWS_LIST:
            return {
                ...state,
                newsList: [],
            };
        case actionTypes.CREATE_NEWS_START:
            return {
                ...state,
                isLoading: true,
                message: "",
            };
        case actionTypes.CREATE_NEWS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: "success",
            };
        case actionTypes.CREATE_NEWS_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        case actionTypes.DELETE_NEWS_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.DELETE_NEWS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                newsList: state.newsList.filter((tutorial) => tutorial.id !== action.payload),
            };
        case actionTypes.UPDATE_NEWS_START:
            return {
                ...state,
                isLoading: true,
                message: "",
            };
        case actionTypes.UPDATE_NEWS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: "success",
                errors: {},
            };
        case actionTypes.UPDATE_NEWS_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        case actionTypes.CLEAR_ERRORS_AND_LINK:
            return {
                ...state,
                errors: {},
                error: "",
                linkUrl: "",
                message: "",
            };
        case actionTypes.SEARCH_NEWS_LIST_START:
            return {
                ...state,
                isSearching: true,
            };
        case actionTypes.SEARCH_NEWS_LIST_SUCCESS:
            return {
                ...state,
                isSearching: false,
                newsList: action.payload,
            };
        default:
            return state;
    }
};
