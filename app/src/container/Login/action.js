import * as constants from '../../../configapp/constants';
import {FirebaseConfig,FirebaseGetDataUser} from '../../../configapp/configfirebase';
import {AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation';


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

export const resetAuthen = () =>{
    return {
        type : constants.RESET_AUTHEN,
    }
}

export const actionLoginUser = (user,password) =>{
    return  (dispath,getstate) => {
        dispath(actionStartLogin());
        FirebaseGetDataUser(user,password)
        .then((reponse)=>{
            if(reponse.success){
                const data = reponse.objectData.length > 0 ? reponse.objectData[0]._data : null ; 
                if(data !== null){
                        AsyncStorage.setItem(constants.TOKEN_AUTHEN,data.ID_User.toString()).then((value)=>{
                            dispath(actionLoginSuccess());
                        }).catch((error)=>{
                            dispath(actionLoginError('Lỗi không lưu thông tin đăng nhập'));
                        });
                }else {
                    dispath(actionLoginError('Số điện thoại chưa đăng kí'));
                }
            }
        })
        .catch((error)=>{
            dispath(actionLoginError('Lỗi hệ thống vui lòng thử lại'));
        })
    }
}
