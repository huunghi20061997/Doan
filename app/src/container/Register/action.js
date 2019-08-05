import * as constants from '../../../configapp/constants';
import * as Firebase from '../../../configapp/configfirebase';
import {AsyncStorage} from 'react-native';
import {showBlockUI,hideBlockUI} from '../../component/block-ui';

export const actionStartRegister = () => {
    return {
        type : constants.START_REGISTER_PRODUCT,
    }
}

export const actionRegisterSuccess = () => {
    return {
        type : constants.ODER_REGISTER_SUCCESS,
    }
}

export const actionRegisterError = (error) => {
    return {
        type : constants.ODER_REGISTER_ERROR,
        Description : error,
    }
}

export const registerAccount = (name,numberPhone,password) => {
    return (dispath,getState) => {
        if(getState().registerReducer.isRegisterFetching) return;
        showBlockUI();
        dispath(actionStartRegister());
        Firebase.FirebaseRegisterAccount(name,numberPhone,password).then((reponse)=>{
            if(reponse.success){
                dispath(actionRegisterSuccess());
                hideBlockUI(constants.RESULT_BLOCK_SUCCESS,'Đăng kí thành công');
            }
        },(error)=>{
            dispath(actionRegisterError(error.description));
            hideBlockUI(constants.RESULT_BLOCK_ERROR,error.description);
        }).catch((error)=>{
            hideBlockUI(constants.RESULT_BLOCK_ERROR,error.description);
            dispath(actionRegisterError(constants.DESCRIPTION_ERROR_SYSTEM));
        })
    }
}