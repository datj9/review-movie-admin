import actionTypes from "./action-types";

const INITIAL_STATE = {
    trackings: [],
    isLoading: true,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.GET_TRACKINGS_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.GET_TRACKINGS_SUCCESS:
            return {
                ...state,
                trackings: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
}
