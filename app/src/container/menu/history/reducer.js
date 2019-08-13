import * as constants from '../../../../configapp/constants';


const initStateListHistory = {
    isListHistory           : [],
    isGetingList            : false,
    isGetListSuccess        : false,
    isGetListError          : false,
    isGetListDescription    : '',
}

export const isReducerGetListHistory = function (state = initStateListHistory, action){
    switch (action.type) { 
        case constants.START_GET_LIST_HISTORY:
            return {
                ...state,
                isListHistory           : [],
                isGetingList            : true,
                isGetListSuccess        : false,
                isGetListError          : false,
                isGetListDescription    : '',
            };
            break;
        
        case constants.GET_LIST_HISTORY_SUCCESS:
            return {
                ...state,
                isListHistory           : action.data,
                isGetingList            : false,
                isGetListSuccess        : true,
                isGetListError          : false,
                isGetListDescription    : '',
            };
            break;

        case constants.GET_LIST_HISTORY_ERROR:
            return {
                ...state,
                isListHistory           : [],
                isGetingList            : false,
                isGetListSuccess        : false,
                isGetListError          : true,
                isGetListDescription    : action.error,
            };
            break;
        default : return state ; break ; 
    }
}