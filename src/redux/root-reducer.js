import { combineReducers } from "redux";
import tutorial from "./tutorials/reducer";
import user from "./user/reducer";

export default combineReducers({
    tutorial,
    user,
});
