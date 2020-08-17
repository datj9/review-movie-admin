import * as actionTypes from "./action-types";

const INITIAL_STATE = {
    isLoading: false,
    isSearching: false,
    currentUser: {},
    savedTutorials: [],
    usersList: [],
    mentor: {},
    mentorsList: [],
    isAuthenticated: false,
    errors: {},
    message: "",
    isDeleting: false,
    isActivating: false,
};

export default (state = INITIAL_STATE, action) => {
    const mentorsList = state.mentorsList;
    const { payload } = action;

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
                currentUser: payload,
                isAuthenticated: true,
            };
        case actionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: payload,
            };
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
            };
        case actionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: payload,
            };
        case actionTypes.SAVE_TUTORIAL_START:
            return { ...state, isLoading: true };
        case actionTypes.SAVE_TUTORIAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: {
                    ...state.currentUser,
                    savedTutorials: payload,
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
                usersList: payload,
                isSearching: false,
                message: "Search successfully",
            };
        case actionTypes.SEARCH_USER_FAILURE:
            return {
                ...state,
                isSearching: false,
                errors: payload,
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
                mentor: payload,
            };
        case actionTypes.CREATE_MENTOR_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: payload,
            };
        case actionTypes.GET_MENTORS_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.GET_MENTORS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                mentorsList: payload,
            };
        case actionTypes.DELETE_MENTOR_START:
            return {
                ...state,
                isDeleting: true,
            };
        case actionTypes.DELETE_MENTOR_SUCCESS:
            return {
                ...state,
                isDeleting: false,
                mentorsList: mentorsList.filter((mentor) => mentor.id !== payload),
            };
        case actionTypes.UPDATE_ACTIVE_OF_MENTOR_START:
            return {
                ...state,
                isActivating: true,
            };
        case actionTypes.UPDATE_ACTIVE_OF_MENTOR_SUCCESS:
            const indexOfMentorUpdateActive = mentorsList.findIndex((mentor) => mentor.id === payload.mentorId);
            mentorsList[indexOfMentorUpdateActive].isActive = payload.isActive;

            return {
                ...state,
                isActivating: false,
                mentorsList,
            };
        default:
            return state;
    }
};
