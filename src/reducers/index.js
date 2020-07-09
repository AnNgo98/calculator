import {combineReducers} from "redux";
import PhepTinhReducer from "./PhepTinh";

const rootReducer = combineReducers({
    PhepTinh: PhepTinhReducer

});

export default rootReducer;
