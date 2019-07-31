import * as constants from '../../../configapp/constants';
import * as Firebase from '../../../configapp/configfirebase';

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
        //if(getState().registerReducer.isRegisterFetching) return; 
        dispath(actionStartRegister());
        Firebase.FirebaseRegisterAccount('Nguyễn Hữu Nghị','0939649712','Huunghi97').then((reponse)=>{
            if(reponse.success){
                dispath(actionRegisterSuccess());
            }
        },(error)=>{
            dispath(actionRegisterError(error.description));
        }).catch((error)=>{
            dispath(actionRegisterError(constants.DESCRIPTION_ERROR_SYSTEM));
        })
    }
}