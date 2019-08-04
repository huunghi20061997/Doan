import * as constants from '../../../../configapp/constants';


const initStateListPay = {
    isListPay           : [],
    isGetingList        : false,
    isGetListSuccess    : false,
    isGetListError      : false,
    isGetListDescription: '',
}

const initStatePaid = {
    isPaiding           : false,
    isPaidSuccess       : false,
    isPaidError         : false,
    isPaidDescription   : '',
}
const isReducerGetListPay = function (state = initStateListPay, action){
    switch (action.type) { 
        case constants.START_GET_LIST_PAY:
            return {
                ...state,
                isListPay           : [],
                isGetingList        : true,
                isGetListSuccess    : false,
                isGetListError      : false,
                isGetListDescription: '',
            };
            break;

        case constants.GET_LIST_PAY_SUCCESS:
            return {
                ...state,
                isListPay           : action.data,
                isGetingList        : false,
                isGetListSuccess    : true,
                isGetListError      : false,
                isGetListDescription: '',
            };
            break;

        case constants.GET_LIST_PAY_ERROR:
            return {
                ...state,
                isListPay           : [],
                isGetingList        : false,
                isGetListSuccess    : false,
                isGetListError      : true,
                isGetListDescription: action.error,
            };
            break;
        default : return state ; break ; 
    }
}

const isReducerPaid = function (state = initStatePaid, action){
    switch (action.type) { 
        case constants.START_PAID_PRODUCT:
            return {
                ...state,
                isPaiding : true,
                isPaidSuccess : false,
                isPaidError : false,
                isPaidDescription: '',
            };
            break;

        case constants.PAID_PRODUCT_SUCCESS:
            return {
                ...state,
                isPaiding : false,
                isPaidSuccess : true,
                isPaidError : false,
                isPaidDescription: '',
            };
            break;
        case constants.PAID_PRODUCT_ERROR:
            return {
                ...state,
                isPaiding : false,
                isPaidSuccess : false,
                isPaidError : true,
                isPaidDescription: action.error,
            };
            break;
        default : return state ; break ; 
    }
}

export { isReducerGetListPay,isReducerPaid };
