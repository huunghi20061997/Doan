import {showBlockUI, hideBlockUI} from '../../../component/block-ui';
import {AsyncStorage} from 'react-native';
import * as Firebase from '../../../../configapp/configfirebase';
import * as constants from '../../../../configapp/constants';


export const get_list_success = (data)=> {
    return {
        type : constants.GET_LIST_HISTORY_SUCCESS,
        data : data
    }
}

export const get_list_error = (description)=> {
    return {
        type : constants.GET_LIST_HISTORY_ERROR,
        error : description
    }
}

export const getListHistory = () => {
    return (dispatch,getState) =>{
        if(getState().isReducerGetListPay.isGetingList) return ;
        showBlockUI();
        AsyncStorage.getItem(constants.TOKEN_AUTHEN).then((value)=>{
            if(value !== null){
                Firebase.FirebaseGetListHistory(value)
                .then((reponse)=>{
                    if(!reponse.error){
                        dispatch(get_list_success(reponse.data));
                    }else{
                        dispatch(get_list_error(constants.ERROR_SYSTEM_GET_DATA));
                        hideBlockUI(constants.RESULT_BLOCK_ERROR,constants.ERROR_SYSTEM_GET_DATA);
                        return ; 
                    }
                    hideBlockUI(constants.RESULT_BLOCK_SUCCESS,constants.FINISHED);
                })
                .catch((error)=>{
                    dispatch(get_list_error(constants.ERROR_SYSTEM_GET_DATA));
                    hideBlockUI(constants.RESULT_BLOCK_ERROR,constants.ERROR_SYSTEM_GET_DATA);
                })
            }else{
                dispatch(get_list_error(constants.ERROR_GET_TOKEN));
                hideBlockUI(constants.RESULT_BLOCK_ERROR,constants.ERROR_GET_TOKEN);
            }
        }).catch((error)=>{
            dispatch(get_list_error(constants.ERROR_GET_TOKEN));
            hideBlockUI(constants.RESULT_BLOCK_ERROR,constants.ERROR_GET_TOKEN);
        })
    }
}