import * as constants from '../../../../configapp/constants';
import * as Firebase from '../../../../configapp/configfirebase';

export const start_list_product = ()=> {
    return {
        type : constants.START_GET_LIST_PRODUCT,
    }
}

export const get_list_error = (description)=> {
    return {
        type : constants.GET_LIST_ERROR,
        error : description
    }
}

export const get_list_success = (data)=> {
    return {
        type : constants.GET_LIST_SUCCESS,
        data : data
    }
}


export const getListProduct = (idShop = 1000) => {
    return (dispatch,getState) =>{
        if(getState().isReducerGetList.isGetingList) return ;
        dispatch(start_list_product());

        return Firebase.FirebaseGetListProduct().then((reponse)=>{
            if(!reponse.error){
                dispatch(get_list_success(reponse.data));
            }else {
                dispatch(get_list_error(reponse.description));
            }
        },(reject)=>{
            dispatch(get_list_error(reject.description));
        }).catch((error)=>{
            dispatch(get_list_error('Lỗi hệ thống xử lí'));
        })
    }
}