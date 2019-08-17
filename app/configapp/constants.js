import {Dimensions} from 'react-native';


//**            constants for reducer                                      */
export const START_AUTHENING_USER   =   'START_AUTHENING_USER';
export const AUTHEN_SUCCESS         =   'AUTHEN_SUCCESS';
export const AUTHEN_ERROR           =   'AUTHEN_ERROR';

export const START_LOGIN_USER       =   'START_LOGIN_USER';
export const LOGIN_SUCCESS          =   'LOGIN_SUCCESS';
export const LOGIN_ERROR            =   'LOGIN_ERROR';
export const RESET_AUTHEN           =   'RESET_AUTHEN';


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

//***                           Const Reducer Register                    */
export const START_REGISTER_PRODUCT         = 'START_REGISTER_PRODUCT';
export const ODER_REGISTER_SUCCESS          = 'ODER_REGISTER_SUCCESS';
export const ODER_REGISTER_ERROR            = 'ODER_REGISTER_ERROR';
//***                           End Const Reducer Register                    */

//***                           Const Reducer Pay                    */

export const START_GET_LIST_PAY             = 'START_GET_LIST_PAY';
export const GET_LIST_PAY_SUCCESS           = 'GET_LIST_PAY_SUCCESS';
export const GET_LIST_PAY_ERROR             = 'GET_LIST_PAY_ERROR';
export const UPDATE_LIST_PAY                = 'UPDATE_LIST_PAY';

export const START_PAID_PRODUCT             = 'START_PAID_PRODUCT';
export const PAID_PRODUCT_SUCCESS           = 'PAID_PRODUCT_SUCCESS';
export const PAID_PRODUCT_ERROR             = 'PAID_PRODUCT_ERROR';

//**                    End                                                */

//***                           Const Reducer History                    */
export const START_GET_LIST_HISTORY                 = 'START_GET_LIST_HISTORY';
export const GET_LIST_HISTORY_SUCCESS               = 'GET_LIST_HISTORY_SUCCESS';
export const GET_LIST_HISTORY_ERROR                 = 'GET_LIST_HISTORY_ERROR';
//**                    End                                                */

//***                           Const Reducer History                                       */
export const START_GET_LIST_PROMOTION                       = 'START_GET_LIST_PROMOTION';
export const GET_LIST_PROMOTION_SUCCESS                     = 'GET_LIST_PROMOTION_SUCCESS';
export const GET_LIST_PROMOTION_ERROR                       = 'GET_LIST_PROMOTION_ERROR';
//**                                    End                                                */


//***                           Const Reducer Search                                       */
export const START_GET_LIST_SHOP                       = 'START_GET_LIST_SHOP';
export const GET_LIST_SHOP_SUCCESS                     = 'GET_LIST_SHOP_SUCCESS';
export const GET_LIST_SHOP_ERROR                       = 'GET_LIST_SHOP_ERROR';
//**                                    End                                                */



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
export const ACCOUNT_EXIST                  =           'Tài khoản đã tồn tại';
export const ERROR_SYSTEM_GET_DATA          =           'Lỗi hệ thống lấy dữ liệu';
export const ERROR_REGISTER_ACCOUNT         =           'Lỗi trong quá trình đăng kí';
export const ERROR_GET_TOKEN                =           'Không lấy được tài khoản vui lòng thử lại';
export const FINISHED                       =           'Hoàn thành';
export const NOT_GET_TOTAL_PRICE            =           'Không lấy được tổng tiền';
export const NOT_GET_DATA                   =           'Không lấy được dữ liệu';
export const ERROR_UPDATE                   =           'Lỗi không thể cập nhật';
export const ERROR_GET_LIST_PROVINCE        =           'Đã có lỗi';
export const ERROR_GET_LIST_DISTRICT        =           'Đã có lỗi';







export const LENGHT_ID_DEFAULT              = 4; 

//**                    End                                                */


//**            Constants Name DataBase In FireBase                                        */

export const MENU_PRODUCT                       =           'menu_product';
export const SHOP                               =           {
                                                                ID_SHOP : 'id_shop',
                                                                TABLE_SHOP : 'shop'
                                                            };
export const TABLE                              =           {
                                                                TABLE_ODER : 'table_oder',
                                                                ID_TABLE_ODER : 'id_table',
                                                            };
export const BILL_ODER                          =           'bill_oder';
export const AUTHEN                             =           'Authen'; 
export const PROMOTION                          =           'promotion';
export const SHOP_PROMOTION                     =           'shop_promotion';
export const PROVINCE                           =           'province';
export const DISTRICT                           =           'district';



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
