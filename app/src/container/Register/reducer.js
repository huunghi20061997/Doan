import * as constants from '../../../configapp/constants';

const initStateRegister =   {
                                isRegisterFetching: false,
                                isRegisterSuccess: false,
                                isRegisterError : false,
                                isRegisterDescription: '',
                            }

const registerReducer = function (state = initStateRegister, action){
    switch (action.type) {
        case constants.START_REGISTER_PRODUCT : 
        return {
            ...state,
            isRegisterFetching: true,
            isRegisterSuccess: false,
            isRegisterError : false,
            isRegisterDescription: '',
        }
        case constants.ODER_REGISTER_SUCCESS : 
        return {
            ...state,
            isRegisterFetching: false,
            isRegisterSuccess: true,
            isRegisterError : false,
            isRegisterDescription: '',
        }
        case constants.ODER_REGISTER_ERROR : 
        return {
            ...state,
            isRegisterFetching: false,
            isRegisterSuccess: false,
            isRegisterError : true,
            isRegisterDescription: action.error,
        }
        default : return state ; break ; 
    }
}

export {registerReducer};
