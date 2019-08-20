import * as constants from '../../../configapp/constants';
import {FirebaseConfig,FirebaseGetDataUser} from '../../../configapp/configfirebase';
import {AsyncStorage} from 'react-native';

export const actionStartAuthen = () => {
    return {
        type : constants.START_AUTHENING_USER,
    }
}

export const actionAuthenSuccess = () => {
    return {
        type : constants.AUTHEN_SUCCESS,
    }
}

export const actionAuthenError = (error) => {
    return {
        type : constants.AUTHEN_ERROR,
        Description : error,
    }
}

export const actionAuthen = (navigation) => {
    return (dispath,getState) => {
        let checkFetching = getState().authenReducer.isAuthenFetching ; 
        if(checkFetching) return ; 
        dispath(actionStartAuthen());
        AsyncStorage.multiGet(['Phone','Password'])
        .then((reponse)=>{
            if(reponse !== null){
                const numberPhone   = reponse[0][1];
                const passWord      = reponse[1][1];
                FirebaseGetDataUser(numberPhone,passWord)
                .then((reponse)=>{
                    if(reponse.success){
                        const checkLogin = reponse.objectData.length > 0 ? true : false ;
                        console.log('this is data',reponse.objectData)
                        if(checkLogin) dispath(actionAuthenSuccess())
                        else dispath(actionAuthenError('Chưa có tài khoản đăng nhập'))
                    }
                })
                .catch((error)=>{
                    dispath(actionAuthenError('Lỗi hệ thống'));
                })
            }else{
                dispath(actionAuthenError('Lỗi hệ thống'));
            }
        })
        .catch((error)=>{
            dispath(actionAuthenError('Lỗi hệ thống'));
        })
    }
}