import * as actionTypes from "./action-types";

const INITIAL_STATE = {
    isLoading: false,
    isSearching: false,
    currentUser: {},
    savedTutorials: [],
    usersList: [],
    mentor: {},
    isAuthenticated: false,
    errors: {},
    message: "",
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.SIGN_UP_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
                isAuthenticated: true,
            };
        case actionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        case actionTypes.SET_USER_START:
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: true,
            };
        case actionTypes.SIGN_OUT_START:
            return {
                ...state,
                currentUser: {},
                isAuthenticated: false,
            };
        case actionTypes.SIGN_IN_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
                isAuthenticated: true,
            };
        case actionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        case actionTypes.SAVE_TUTORIAL_START:
            return { ...state, isLoading: true };
        case actionTypes.SAVE_TUTORIAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: {
                    ...state.currentUser,
                    savedTutorials: action.payload,
                },
                message: "success",
            };
        case actionTypes.SAVE_TUTORIAL_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                errors: {},
                message: "",
            };
        case actionTypes.SEARCH_USER_START:
            return {
                ...state,
                isSearching: true,
            };
        case actionTypes.SEARCH_USER_SUCCESS:
            return {
                ...state,
                usersList: action.payload,
                isSearching: false,
                message: "Search successfully",
            };
        case actionTypes.SEARCH_USER_FAILURE:
            return {
                ...state,
                isSearching: false,
                errors: action.payload,
            };
        case actionTypes.CREATE_MENTOR_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.CREATE_MENTOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                mentor: action.payload,
            };
        case actionTypes.CREATE_MENTOR_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        default:
            return state;
    }
};
