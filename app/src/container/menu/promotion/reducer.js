import * as constants from '../../../../configapp/constants';


const initStateListPromotion = {
    isListPromotion             : [],
    isGetingList                : false,
    isGetListSuccess            : false,
    isGetListError              : false,
    isGetListDescription        : '',
}

export const isReducerGetListPromotion = function (state = initStateListPromotion, action){
    switch (action.type) {
        case constants.START_GET_LIST_PROMOTION:
            return {
                ...state,
                isListPromotion             : [],
                isGetingList                : true,
                isGetListSuccess            : false,
                isGetListError              : false,
            isGetListDescription            : '',
            };
            break;

        case constants.GET_LIST_PROMOTION_SUCCESS:
            return {
                ...state,
                isListPromotion             : action.data,
                isGetingList                : false,
                isGetListSuccess            : true,
                isGetListError              : false,
                isGetListDescription        : '',
            };
            break;

        case constants.GET_LIST_PROMOTION_ERROR:
            return {
                ...state,
                isListPromotion             : [],
                isGetingList                : false,
                isGetListSuccess            : false,
                isGetListError              : true,
                isGetListDescription        : action.error,
            };
            break;

        default : return state ; break ; 
    }
}
