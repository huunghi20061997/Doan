import { combineReducers } from "redux";
import {authenReducer} from '../src/container/Splash/reducer';

const rootReducer = combineReducers({
    authenReducer,
})

export { rootReducer };