import * as constants from '../../../../configapp/constants';
import * as Firebase from '../../../../configapp/configfirebase';
import {showBlockUI, hideBlockUI} from '../../../component/block-ui';
import {AsyncStorage} from 'react-native';

export const start_list_product = ()=> {
    return {
        type : constants.START_GET_LIST_PRODUCT,
    }
}

export const get_list_error = (description)=> {
    return {
        type : constants.GET_LIST_ERROR,
        error : description
    }
}

export const get_list_success = (data)=> {
    return {
        type : constants.GET_LIST_SUCCESS,
        data : data
    }
}


export const getListProduct = (idShop) => {
    return (dispatch,getState) =>{
        if(getState().isReducerGetList.isGetingList) return ;
        dispatch(start_list_product());
        return Firebase.FirebaseGetListProduct(idShop).then((reponse)=>{
            if(!reponse.error){
                dispatch(get_list_success(reponse.data));
            }else {
                dispatch(get_list_error(reponse.description));
            }
        },(reject)=>{
            dispatch(get_list_error(reject.description));
        }).catch((error)=>{
            dispatch(get_list_error(constants.DESCRIPTION_ERROR_APP));
        })
    }
}

export const add_product_oder = (product) => {
    return(dispatch,getState)=>{
        let ListOder = getState().isReducerOder.isListOder ;

        const indexDuplicate = ListOder.findIndex(value => product.id_product == value.id_product );
        if(indexDuplicate == -1){
            ListOder = [...getState().isReducerOder.isListOder,{...product,number : 1}];
        }else {
            let itemOder = ListOder[indexDuplicate];
            const numberOder = itemOder.number; 
            ListOder[indexDuplicate] =  {...itemOder,
                                            number : numberOder + 1
                                        }
        
        }
        dispatch({
            type : constants.ADD_ODER_PRODUCT,
            data : ListOder,
        })
    }
}

export const remove_product_oder = (product) => {
    return (dispatch,getSate)=> {
        let listOder = getSate().isReducerOder.isListOder;
        if(listOder.length > 0){
            const indexDuplicate = listOder.findIndex(value => product.id_product == value.id_product &&  value.number > 1);
            if(indexDuplicate != -1){
                let itemOder = listOder[indexDuplicate];
                const numberOder = itemOder.number;
                listOder[indexDuplicate] =  {
                                                ...itemOder,
                                                number : numberOder - 1
                                            }
            }else{
                listOder = listOder.filter(data => data.id_product !== product.id_product);
            }
            dispatch({
                type : constants.REMOVE_ODER_PRODUCT,
                data : listOder,
            })
        }else return;
    }
}

export const start_oder_product = () => {
    return {
        type :  constants.START_ODER_PRODUCT
    }
}

export const success_oder_product = () => {
    return {
        type :  constants.ODER_PRODUCT_SUCCESS,
    }
}

export const error_oder_product = (error) => {
    return {
        type :  constants.ODER_PRODUCT_ERROR,
        error : error
    }
}



export const oder_product = (id_Shop, id_Table) => {
    return (dispatch,getSate) =>{
        if(getSate().isReducerOder.isOdering) return ;
        showBlockUI();
        
        /**check table and shop is exist*/
        Firebase.FirebaseCheckOrder(id_Table,id_Shop)
        .then((reponse)=>{
            const data = reponse.data.length > 0 ? reponse.data[0]._data : null ; 
            if(data !== null && data.id_shop == id_Shop && data.id_table == id_Table){
                    // Start Order
                    let listOder = [];
                    getSate().isReducerOder.isListOder.forEach(value=>{
                        listOder.push({
                            id_product :  value.id_product,
                            number : value.number,
                        })
                    }) ;
                    
                    AsyncStorage.getItem(constants.TOKEN_AUTHEN).then((value)=>{
                        if(value !== null){
                            const id_User = value;
                            dispatch(start_oder_product());
                            Firebase.FirebaseOder(id_User,id_Shop,id_Table,listOder).then((reponse)=>{
                                if(reponse.success){
                                    dispatch(success_oder_product());
                                    hideBlockUI(constants.RESULT_BLOCK_SUCCESS,constants.ODER_SUCCESS);
                                }else {
                                    dispatch(error_oder_product(reponse.description));
                                    hideBlockUI(constants.RESULT_BLOCK_ERROR,reponse.description);
                                }
                            }).catch((error)=>{
                                    dispatch(error_oder_product(error.description));
                                    hideBlockUI(constants.RESULT_BLOCK_ERROR,reponse.description);
                            });
                        }else{
                            dispatch(error_oder_product(constants.ERROR_GET_TOKEN));
                            hideBlockUI(constants.RESULT_BLOCK_ERROR,constants.ERROR_GET_TOKEN);
                        }
                    }).catch((error)=>{
                        dispatch(error_oder_product(constants.ERROR_GET_TOKEN));
                        hideBlockUI(constants.RESULT_BLOCK_ERROR,constants.ERROR_GET_TOKEN);
                    })
            }else{
                dispatch(error_oder_product(constants.CHECK_TABLE_SHOP));
                hideBlockUI(constants.RESULT_BLOCK_ERROR,constants.CHECK_TABLE_SHOP);
            }
        },(error)=>{
            dispatch(error_oder_product(error.description));
            hideBlockUI(constants.RESULT_BLOCK_ERROR,reponse.description);
        }).catch((error)=>{
            dispatch(error_oder_product(error.description));
            hideBlockUI(constants.RESULT_BLOCK_ERROR,reponse.description);
        })
        
        
    }
}
