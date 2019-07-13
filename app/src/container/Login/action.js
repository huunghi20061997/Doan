import * as constants from '../../../configapp/constants';
import {FirebaseConfig,FirebaseGetDataUser} from '../../../configapp/configfirebase';

export const actionStartLogin = () => {
    return {
        type : constants.START_LOGIN_USER,
    }
}

export const actionLoginSuccess = () => {
    return {
        type : constants.LOGIN_SUCCESS,
    }
}

export const actionLoginError = (error) => {
    return {
        type : constants.LOGIN_ERROR,
        Description : error,
    }
}

export const actionLoginUser = (user,password) =>{
    return  (dispath,getstate) => {
        dispath(actionStartLogin());
        FirebaseGetDataUser(user,password)
        .then((reponse)=>{
            
            if(reponse.objectData.length > 0){
                dispath(actionLoginSuccess());
            }
            else{
                dispath(actionLoginError('Tài khoản chưa đăng kí'));
            }
        })
        .catch((error)=>{
            dispath(actionLoginError('Lỗi hệ thống vui lòng thử lại'));
        })
    }
}