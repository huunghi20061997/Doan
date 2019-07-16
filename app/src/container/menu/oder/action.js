import * as constants from '../../../../configapp/constants';
import * as Firebase from '../../../../configapp/configfirebase';

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


export const getListProduct = (idShop = 1000) => {
    return (dispatch,getState) =>{
        if(getState().isReducerGetList.isGetingList) return ;
        dispatch(start_list_product());

        return Firebase.FirebaseGetListProduct().then((reponse)=>{
            if(!reponse.error){
                dispatch(get_list_success(reponse.data));
            }else {
                dispatch(get_list_error(reponse.description));
            }
        },(reject)=>{
            dispatch(get_list_error(reject.description));
        }).catch((error)=>{
            dispatch(get_list_error('Lỗi hệ thống xử lí'));
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
