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
} from "./action-types";

const INITIAL_STATE = {
    isLoading: false,
    tutorials: [],
    tutorial: {},
    linkUrl: "",
    isUploading: false,
    error: {},
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
            };
        case CREATE_TUTORIAL_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
