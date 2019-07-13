import * as constants from '../../../../configapp/constants';


const initStateOder = {
    isListOder          : [],
    isOdering           : false,
    isOderSuccess       : false,
    isOderError         : false,
    isOderDescription   : '',

    
}

const initStateListProduct = {
    isListProduct       : [],
    isGetingList        : false,
    isGetListSuccess    : false,
    isGetListError      : false,
    isGetListDescription: '',
}

const isReducerGetList = function (state = initStateListProduct, action){
    switch (action.type) { 
        case constants.START_GET_LIST_PRODUCT:
            return {
                ...state,
                isListProduct       : [],
                isGetingList        : true,
                isGetListSuccess    : false,
                isGetListError      : false,
                isGetListDescription: '',
            };
            break;

        case constants.GET_LIST_SUCCESS:
            return {
                ...state,
                isListProduct       : action.data,
                isGetingList        : false,
                isGetListSuccess    : true,
                isGetListError      : false,
                isGetListDescription: '',
            };
            break;

        case constants.GET_LIST_ERROR:
            return {
                ...state,
                isListProduct       : [],
                isGetingList        : false,
                isGetListSuccess    : false,
                isGetListError      : true,
                isGetListDescription: action.error,
            };
            break;
        default : return state ; break ; 
    }
}


const isReducerOder = function (state = initStateOder, action){
    switch (action.type) { 
        case constants.ADD_ODER_PRODUCT:
            return {
                ...state,
                isListOder: state.isListOder.push(action.data),
                isOdering : false,
                isOderSuccess : false,
                isOderError : false,
                isOderDescription: '',
            };
            break;

        case constants.REMOVE_ODER_PRODUCT : 
            return {
                ...state,
                isListOder: action.data,//action.data is list removed product
                isOdering : false,
                isOderSuccess : false,
                isOderError : false,
                isOderDescription: '',
            };
            break;
        
        case constants.CHANGE_LIST_ODER_PRODUCT : 
        return {
            ...state,
            isListOder: action.data,//action.data is list removed product
            isOdering : false,
            isOderSuccess : false,
            isOderError : false,
            isOderDescription: '',
        };
        break;
        
        case constants.RESET_ODER_PRODUCT:
            return {
                ...state,
                isListOder : [],
                isOdering : false,
                isOderSuccess : false,
                isOderError : false,
                isOderDescription: '',
            };
            break;
        case constants.START_ODER_PRODUCT:
            return {
                ...state,
                isOdering : true,
                isOderSuccess : false,
                isOderError : false,
                isOderDescription: '',
            };
            break;

        case constants.ODER_PRODUCT_SUCCESS:
            return {
                ...state,
                isOdering : false,
                isOderSuccess : true,
                isOderError : false,
                isOderDescription: '',
            };
            break;
        case constants.ODER_PRODUCT_ERROR:
            return {
                ...state,
                isOdering : false,
                isOderSuccess : false,
                isOderError : true,
                isOderDescription: action.error,
            };
            break;
        default : return state ; break ; 
    }
}

export { isReducerOder,isReducerGetList };
