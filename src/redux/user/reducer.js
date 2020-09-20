import * as actionTypes from "./action-types";

const INITIAL_STATE = {
    isLoading: false,
    isSearching: false,
    currentUser: {},
    savedTutorials: [],
    usersList: [],
    isAuthenticated: false,
    errors: {},
    message: "",
    isDeleting: false,
    isActivating: false,
    isSuccess: false,
};

export default (state = INITIAL_STATE, action) => {
    const { payload } = action;

    switch (action.type) {
        case actionTypes.SET_USER_START:
            return {
                ...state,
                currentUser: payload,
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
                currentUser: payload,
                isAuthenticated: true,
                isSuccess: true,
            };
        case actionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: payload,
            };

        default:
            return state;
    }
};
