import * as constants from '../../../../configapp/constants';


const initStateListShop = {
    isListShop                  : [],
    isGetingList                : false,
    isGetListSuccess            : false,
    isGetListError              : false,
    isGetListDescription        : '',
}

export const isReducerGetListShop = function (state = initStateListShop, action){
    switch (action.type) {
        case constants.START_GET_LIST_SHOP:
            return {
                ...state,
                isListShop                  : [],
                isGetingList                : true,
                isGetListSuccess            : false,
                isGetListError              : false,
            isGetListDescription            : '',
            };
            break;

        case constants.GET_LIST_SHOP_SUCCESS:
            return {
                ...state,
                isListShop                  : action.data,
                isGetingList                : false,
                isGetListSuccess            : true,
                isGetListError              : false,
                isGetListDescription        : '',
            };
            break;

        case constants.GET_LIST_SHOP_ERROR:
            return {
                ...state,
                isListShop                  : [],
                isGetingList                : false,
                isGetListSuccess            : false,
                isGetListError              : true,
                isGetListDescription        : action.error,
            };
            break;

        default : return state ; break ; 
    }
}
