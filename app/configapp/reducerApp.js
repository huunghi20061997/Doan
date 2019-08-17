import { combineReducers } from "redux";
import {authenReducer} from '../src/container/Splash/reducer';
import {isReducerOder,isReducerGetList} from '../src/container/menu/oder/reducerOder';
import {registerReducer} from '../src/container/Register/reducer';
import {isReducerGetListPay,isReducerPaid} from '../src/container/menu/pay/reducer';
import {isReducerGetListHistory} from '../src/container/menu/history/reducer';
import {isReducerGetListPromotion} from '../src/container/menu/promotion/reducer';
import {isReducerGetListShop} from '../src/container/menu/search/reducer';
const rootReducer = combineReducers({
    authenReducer,
    isReducerOder,
    isReducerGetList,
    registerReducer,
    isReducerGetListPay,
    isReducerPaid,
    isReducerGetListHistory,
    isReducerGetListPromotion,
    isReducerGetListShop
})

export { rootReducer };