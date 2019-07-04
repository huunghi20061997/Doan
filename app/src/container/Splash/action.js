import * as constants from '../../../configapp/constants';
import {FirebaseConfig} from '../../../configapp/configfirebase';

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

export const actionAuthen = () => {
    return (dispath,getState) => {
        let checkFetching = getState().authenReducer.isAuthenFetching ; 
        if(checkFetching) return ; 
        dispath(actionStartAuthen());
        return new Promise((resolve,reject)=>{
            let  email = 'huunghi20061997@gmail.com';
            let pass = 'Huunghi97';
            FirebaseConfig.auth().signInWithEmailAndPassword(email, pass).then(()=>{
                resolve()
            }).catch((error)=>{
                reject(error)
            })
        }).then(()=>{
            dispath(actionAuthenSuccess())
        }).catch((error)=>{
            dispath(actionAuthenError('Đăng nhập thất bại'));
        })
        
    }
}