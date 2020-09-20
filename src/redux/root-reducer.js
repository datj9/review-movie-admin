import { combineReducers } from "redux";
import news from "./news/reducer";
import movie from "./movie/reducer";
import user from "./user/reducer";
import tracking from "./trackings/reducer";

export default combineReducers({
    news,
    movie,
    user,
    tracking,
});
