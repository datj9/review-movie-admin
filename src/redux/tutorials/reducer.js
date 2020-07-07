import {
    FETCH_TUTORIALS_START,
    FETCH_TUTORIALS_SUCCESS,
    FETCH_TUTORIALS_FAILURE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_START,
    CREATE_TUTORIAL_START,
    CREATE_TUTORIAL_SUCCESS,
    CREATE_TUTORIAL_FAILURE,
} from "./action-types";

const INITIAL_STATE = {
    isLoading: false,
    tutorials: [],
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
