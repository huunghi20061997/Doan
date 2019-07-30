import {Dimensions} from 'react-native';


//**            constants for reducer                                      */
export const START_AUTHENING_USER   =   'START_AUTHENING_USER';
export const AUTHEN_SUCCESS         =   'AUTHEN_SUCCESS';
export const AUTHEN_ERROR           =   'AUTHEN_ERROR';

export const START_LOGIN_USER       =   'START_LOGIN_USER';
export const LOGIN_SUCCESS          =   'LOGIN_SUCCESS';
export const LOGIN_ERROR            =   'LOGIN_ERROR';

export const TOKEN_AUTHEN           = 'USER_AUTHEN';

/**Reducer Oder */
export const ADD_ODER_PRODUCT               = 'ADD_ODER_PRODUCT';
export const REMOVE_ODER_PRODUCT            = 'REMOVE_ODER_PRODUCT';
export const CHANGE_LIST_ODER_PRODUCT       = 'CHANGE_LIST_ODER_PRODUCT';
export const RESET_ODER_PRODUCT             = 'RESET_ODER_PRODUCT';

export const START_ODER_PRODUCT             = 'START_ODER_PRODUCT';
export const ODER_PRODUCT_SUCCESS           = 'ODER_PRODUCT_SUCCESS';
export const ODER_PRODUCT_ERROR             = 'ODER_PRODUCT_ERROR';


export const START_GET_LIST_PRODUCT         = 'START_GET_LIST_PRODUCT';
export const GET_LIST_SUCCESS               = 'GET_LIST_SUCCESS';
export const GET_LIST_ERROR                 = 'GET_LIST_ERROR';
/**End =>>> Reducer Oder */

//**                    End                                                */


//**            constants for color App                                     */

export const BACKGROUND_PRIMARY_APP         =           'white';
export const BACKGROUND_ITEM_APP            =           'rgba(243, 243, 243,0.7)';
export const SILVER_COLOR                   =           'silver';
export const GRAY_COLOR_APP                 =           '#EEEEEE';
export const OPACITY_COLOR                  =           0.5;
export const BACKGROUND_TURQUOISE_OPACITY   =           'rgba(115, 218, 229, 0.3)';
export const BACKGROUND_TURQUOISE           =           'rgba(115, 218, 229, 1)';
export const GRAY_COLOR                     =           'gray';
export const BLACK_COLOR_OPACITY_70         =           "rgba(0,0,0,0.7)";
export const BACKGROUND_GREEN_OPACITY       =           'rgba(39, 174, 96,0.2)';
export const BACKGROUND_GREEN               =           'rgba(39, 174, 96,1)';
export const BACKGROUND_ORANGE              =           'rgba(240, 147, 43,1.0)';
export const BACKGROUND_ORANGE_OPACITY      =           'rgba(240, 147, 43,0.2)';
export const BACKGROUND_BELOW_APP           =           'rgba(248, 248, 255, 1)';
export const BACKGROUND_BACKGROUND_ITEM     =           'rgba(248, 248, 255, 0.2)';
export const BACKGROUND_MODAL_APP           =           'rgba(0, 0, 0, 0.2)';




export const STRING_PRICE           =           '.000đ';
export const SIZE_TEXT_MEDIUM       =           15;
export const DEFAULT_ID             =           1000;
export const RESULT_BLOCK_SUCCESS   =           'RESULT_BLOCK_SUCCESS';
export const RESULT_BLOCK_ERROR     =           'RESULT_BLOCK_ERROR';
export const AREAN_CODE             =           '+84';




//**                    End                                                */


//**            Constants Size && Dimention for App                                        */
 
export const HEIGHT_SCREEN                  =           Dimensions.get('screen').height;
export const WIDTH_SCREEN                   =           Dimensions.get('screen').width;
export const BODERADIUS_APP                 =           6;
export const BODERADIUS_CIRCLE_APP          =           50;
export const BODER_WIDTH_APP                =           0.5;
export const PADDING_DEFAULT_APP            =           10;
export const MARGIN_DEFAULT_APP             =           10;
export const HEIGHT_DEFAULT_TEXT_INPUT      =           44;

//**                    End                                                */


//**            Constants Result Get Data for App                                        */

export const RESULT_OK                      =           'OK';
export const RESULT_ERROR                   =           'ERROR';
export const DESCRIPTION_ERROR_SYSTEM       =           'Lỗi hệ thống';
export const DESCRIPTION_ERROR_APP          =           'Lỗi hệ thống xử lí';
export const DESCRIPTION_ERROR_ADD_DOC      =           'Lỗi khi đặt hàng';
export const CHECK_TABLE_SHOP               =           'Vui lòng kiểm tra lại bàn đặt';
export const ODER_SUCCESS                   =           'Đặt hàng thành công';
export const LENGHT_ID_DEFAULT              = 4; 

//**                    End                                                */


//**            Constants Name DataBase In FireBase                                        */

export const MENU_PRODUCT                       =           'menu_product';
export const SHOP                               =           {
                                                                ID_SHOP : 'id_shop',
                                                            };
export const TABLE                              =           {
                                                                TABLE_ODER : 'table_oder',
                                                                ID_TABLE_ODER : 'id_table',
                                                            };
export const BILL_ODER                          =           'bill_oder';
//**                    End                                                */


//**            Object error                                        */
const errorDefault =    {
                                success : false,
                                error : true,
                                description : '',
                        }
export const ERROR_ORDER =  {
                                ...errorDefault,
                                description : DESCRIPTION_ERROR_ADD_DOC,
                            }

export const ERROR_ORDER_SYSTEM =   {
                                        ...errorDefault,
                                        description : DESCRIPTION_ERROR_SYSTEM,
                                    }

export const ERROR_ORDER_CHECK_TABLE =      {
                                                ...errorDefault,
                                                description : CHECK_TABLE_SHOP,
                                            } 
//**                    End                                                */
