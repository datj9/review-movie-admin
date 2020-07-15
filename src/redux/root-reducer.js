import { combineReducers } from "redux";
import tutorial from "./tutorials/reducer";
import user from "./user/reducer";
import tracking from "./trackings/reducer";

export default combineReducers({
    tutorial,
    user,
    tracking,
});
