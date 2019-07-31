import { combineReducers } from "redux";
import {authenReducer} from '../src/container/Splash/reducer';
import {isReducerOder,isReducerGetList} from '../src/container/menu/oder/reducerOder';
import {registerReducer} from '../src/container/Register/reducer';

const rootReducer = combineReducers({
    authenReducer,
    isReducerOder,
    isReducerGetList,
    registerReducer
})

export { rootReducer };