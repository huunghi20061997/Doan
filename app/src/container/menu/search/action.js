import {showBlockUI, hideBlockUI} from '../../../component/block-ui';
import {AsyncStorage} from 'react-native';
import * as Firebase from '../../../../configapp/configfirebase';
import * as constants from '../../../../configapp/constants';



export const start_list_product = ()=> {
    return {
        type : constants.START_GET_LIST_SHOP,
    }
}

export const get_list_error = (description)=> {
    return {
        type : constants.GET_LIST_SHOP_ERROR,
        error : description
    }
}

export const get_list_success = (data)=> {
    return {
        type : constants.GET_LIST_SHOP_SUCCESS,
        data : data
    }
}

export const getListShopDistrict = (id_District) => {
    return (dispath,getState)=>{
        if(getState().isReducerGetListShop.isGetingList) return ;
        //showBlockUI();
        dispath(start_list_product());
        Firebase.FirebaseGetShopInDistrict(id_District)
        .then((reponse)=>{
            dispath(get_list_success(reponse.data));
            hideBlockUI();
        },(error)=>{
            dispath(get_list_error(error.description))
            hideBlockUI(constants.RESULT_BLOCK_ERROR,'Thất bại vui lòng thử lại');
        })
        .catch((error)=>{
            dispath(get_list_error(error.description))
            hideBlockUI(constants.RESULT_BLOCK_ERROR,'Thất bại vui lòng thử lại');
        })
    }
}