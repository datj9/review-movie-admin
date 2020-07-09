import {
    FETCH_TUTORIALS_START,
    FETCH_TUTORIALS_SUCCESS,
    FETCH_TUTORIALS_FAILURE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_START,
    CREATE_TUTORIAL_START,
    CREATE_TUTORIAL_SUCCESS,
    CREATE_TUTORIAL_FAILURE,
    FETCH_ONE_TUTORIAL_START,
    FETCH_ONE_TUTORIAL_SUCCESS,
    CLEAR_TUTORIAL,
    DELETE_TUTORIAL_START,
    DELETE_TUTORIAL_SUCCESS,
    UPDATE_TUTORIAL_START,
    UPDATE_TUTORIAL_SUCCESS,
    UPDATE_TUTORIAL_FAILURE,
    CLEAR_ERRORS_AND_LINK,
    GET_SAVED_TUTORIALS_START,
    GET_SAVED_TUTORIALS_SUCCESS,
    SEARCH_TUTORIALS_START,
    SEARCH_TUTORIALS_SUCCESS,
} from "./action-types";

const INITIAL_STATE = {
    isLoading: false,
    isSearching: false,
    loaded: false,
    tutorials: [],
    tutorial: {},
    linkUrl: "",
    isUploading: false,
    error: {},
    errors: {},
    message: "",
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_TUTORIALS_START:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_TUTORIALS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tutorials: action.payload,
            };
        case FETCH_TUTORIALS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case FETCH_ONE_TUTORIAL_START:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_ONE_TUTORIAL_SUCCESS:
            return {
                ...state,
                tutorial: action.payload,
                isLoading: false,
            };
        case CLEAR_TUTORIAL:
            return {
                ...state,
                tutorial: {},
            };
        case UPLOAD_IMAGE_START:
            return {
                ...state,
                isUploading: true,
            };
        case UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                isUploading: false,
                linkUrl: action.payload,
            };
        case CREATE_TUTORIAL_START:
            return {
                ...state,
                isLoading: true,
            };
        case CREATE_TUTORIAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tutorials: state.tutorials.concat([action.payload]),
                message: "success",
            };
        case CREATE_TUTORIAL_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        case DELETE_TUTORIAL_START:
            return {
                ...state,
                isLoading: true,
            };
        case DELETE_TUTORIAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tutorials: state.tutorials.filter((tutorial) => tutorial.id !== action.payload),
            };
        case UPDATE_TUTORIAL_START:
            return {
                ...state,
                isLoading: true,
            };
        case UPDATE_TUTORIAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: "success",
                errors: {},
            };
        case UPDATE_TUTORIAL_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        case CLEAR_ERRORS_AND_LINK:
            return {
                ...state,
                errors: {},
                error: "",
                linkUrl: "",
                message: "",
            };
        case GET_SAVED_TUTORIALS_START:
            return {
                ...state,
                isLoading: true,
            };
        case GET_SAVED_TUTORIALS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tutorials: action.payload,
                loaded: true,
            };
        case SEARCH_TUTORIALS_START:
            return {
                ...state,
                isSearching: true,
            };
        case SEARCH_TUTORIALS_SUCCESS:
            return {
                ...state,
                isSearching: false,
                tutorials: action.payload,
            };
        default:
            return state;
    }
};
