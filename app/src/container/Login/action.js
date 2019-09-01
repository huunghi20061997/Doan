import * as constants from '../../../configapp/constants';
import {FirebaseConfig,FirebaseGetDataUser} from '../../../configapp/configfirebase';
import {AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {showBlockUI,hideBlockUI} from '../../component/block-ui';


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
        showBlockUI()
        if(user.length === 0 || password === 0){
            hideBlockUI(constants.RESULT_BLOCK_ERROR,'Vui lòng điền đầy đủ thông tin');
            return ;
        }
        dispath(actionStartLogin());
        FirebaseGetDataUser(user,password)
        .then((reponse)=>{
            if(reponse.success){
                const data = reponse.objectData.length > 0 ? reponse.objectData[0]._data : null ; 
                if(data !== null){
                            AsyncStorage.multiSet([[constants.TOKEN_AUTHEN,data.ID_User.toString()],['Phone',user],['Password',password]])
                            .then((value)=>{
                                dispath(actionLoginSuccess());
                                hideBlockUI(constants.RESULT_BLOCK_SUCCESS,'Đăng nhập thành công');
                            }).catch((error)=>{
                                hideBlockUI(constants.RESULT_BLOCK_ERROR,'Lỗi không lưu thông tin đăng nhập');
                                dispath(actionLoginError('Lỗi không lưu thông tin đăng nhập'));
                            });
                }else {
                    hideBlockUI(constants.RESULT_BLOCK_ERROR,'Số điện thoại chưa đăng kí hoặc sai mật khẩu');
                    dispath(actionLoginError('Số điện thoại chưa đăng kí hoặc sai mật khẩu'));
                }
            }
        })
        .catch((error)=>{
            hideBlockUI(constants.RESULT_BLOCK_ERROR,'Lỗi hệ thống vui lòng thử lại');
            dispath(actionLoginError('Lỗi hệ thống vui lòng thử lại'));
        })
    }
}

