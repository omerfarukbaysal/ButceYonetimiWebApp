import { combineReducers } from "redux";
import gelirReducer from "./gelirReducer"
import hesapReducer from "./hesapReducer"
import giderReducer from "./giderReducer"
import kategoriReducer from "./kategoriReducer"
import authReducer from "./authReducer"
export default combineReducers({ gelirReducer, hesapReducer, giderReducer, kategoriReducer, authReducer });
