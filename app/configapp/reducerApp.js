import { combineReducers } from "redux";
import {authenReducer} from '../src/container/Splash/reducer';
import {isReducerOder,isReducerGetList} from '../src/container/menu/oder/reducerOder';

const rootReducer = combineReducers({
    authenReducer,
    isReducerOder,
    isReducerGetList,
})

export { rootReducer };