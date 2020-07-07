import {
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    SET_USER_START,
    SIGN_OUT_START,
    SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    CLEAR_ERRORS,
} from "./action-types";

const INITIAL_STATE = {
    isLoading: false,
    currentUser: {},
    isAuthenticated: false,
    errors: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_UP_START:
            return {
                ...state,
                isLoading: true,
            };
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
                isAuthenticated: true,
            };
        case SIGN_UP_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        case SET_USER_START:
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: true,
            };
        case SIGN_OUT_START:
            return {
                ...state,
                currentUser: {},
                isAuthenticated: false,
            };
        case SIGN_IN_START:
            return {
                ...state,
                isLoading: true,
            };
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
                isAuthenticated: true,
            };
        case SIGN_IN_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: {},
            };
        default:
            return state;
    }
};
