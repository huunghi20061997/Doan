const initStateAuthen = {
    isAuthenFetching: false,
    isAuthenSuccess: false,
    isAuthenError : false,
    isAuthenDescription: '',
}

const initStateNetwork = {
    isNetwork : false,
}
 
const authenReducer = function (state = initStateAuthen, action){
    switch (action.type) { 
        case "AUTHEN_SUCCESS":
            return {
                ...state,
                isAuthenFetching: false,
                isAuthenSuccess: true,
                isAuthenError : false,
                isAuthenDescription: '',
            };
            break;

        case "START_AUTHENING_USER": 
            return {
                ...state,
                isAuthenFetching: true,
                isAuthenSuccess: false,
                isAuthenError : false,
                isAuthenDescription: '',
            };
            break;
        
        case "AUTHEN_ERROR":
            return {
                ...state,
                isAuthenFetching: false,
                isAuthenSuccess: false,
                isAuthenError : true,
                isAuthenDescription: action.Description,
            };
            break;
        default : return state ; break ; 
    }
}

export { authenReducer };
