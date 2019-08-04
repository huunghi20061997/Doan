import React, { Component } from 'react';
import  {   Text, View,ImageBackground,Alert,FlatList,
            SafeAreaView,ScrollView,TouchableOpacity
} from 'react-native'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionPay from './action';
import * as constants from '../../../../configapp/constants';
import Text_Custom from '../../../component/text_custom';
import Text_Input from '../../../component/text_input';
import {showBlockUI,hideBlockUI} from '../../../component/block-ui';
import * as Firebase from '../../../../configapp/configfirebase';


class ItemPay extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            expand : false,
            totalPrice : -2, //** -2 is case loading */
            nameShop : 'Đang tải'
        }
    }

    componentDidMount(){
        Firebase.FirebaseGetItemPay(true,this.props.data.list_oder,)
        .then((reponse)=>{
            if(!reponse.error){
                let price_total = 0;
                reponse.data.forEach((value)=>{
                    price_total += value.data.price
                });
                this.setState({
                    totalPrice : price_total,
                })
            }
        })
        .catch((error)=>{
            //** -1 is case error */
            this.setState({
                totalPrice : -1,
            })
        });

        Firebase.FirebaseGetItemPay(false,[],this.props.data.id_shop)
        .then((reponse)=>{

            console.log('>>>>> this is reponse shop',reponse);
            let nameShop = '';
            if(!reponse.error){
                nameShop = reponse.data[0]._data.name ;
            }
            this.setState({
                nameShop : nameShop,
            })
        })
        .catch((error)=>{
            this.setState({
                nameShop : 'Đã có lỗi'
            })
        })
    }

    render() {
        const data = this.props.data ;
        const dateOderBill = new Date(data.time_pay.seconds*1000);
        return (
            <View   style = {{
                                width : '100%',
                                marginBottom : 10,
                                backgroundColor : 'white',
                                borderRadius : 6,
                                padding : 10,
                            }}
            >
                    <View   style = {{
                                        flexDirection : 'row'
                                    }}
                    >
                            <Text_Custom    content = {'Mã hóa đơn  : ' + data.id_oder}
                                            styleView = {{
                                                            justifyContent : 'flex-start'
                                                        }}
                            />
                            <Text_Custom    content = {'Số bàn ngồi : ' + data.id_table}
                                            styleView = {{
                                                            justifyContent : 'flex-start'
                                                        }}
                            />
                    </View>

                    <View   style = {{
                                        flexDirection : 'row',
                                        paddingVertical : 10,
                                        width : '100%',
                                        justifyContent : 'flex-start'
                                    }}
                    >
                            <Text_Custom    content =   {   'Thời gian  : ' + dateOderBill.getHours() + ':'+dateOderBill.getMinutes()
                                                            +'   '+ dateOderBill.getDate() +'/'+ dateOderBill.getMonth() + '/'+ dateOderBill.getFullYear()
                                                        }
                                            styleView = {{
                                                                justifyContent : 'flex-start'
                                                        }}
                            />
                    </View>

                    <View   style = {{
                                        paddingVertical : 10,
                                        justifyContent : 'flex-start',
                                        width : '100%',
                                    }}
                    >
                            <Text_Custom    content = {'Tên cửa hàng : ' + this.state.nameShop}
                                            styleView = {{
                                                                justifyContent : 'flex-start'
                                                        }}
                            />
                    </View>

                    <View   style = {{
                                        justifyContent : 'flex-start',
                                        width : '100%',
                                    }}
                            
                    >
                            <Text_Custom    content =   {   'Giá thanh toán :  ' + 
                                                            (
                                                                this.state.totalPrice === -2 ?
                                                                    'Đang tải'
                                                                :
                                                                    this.state.totalPrice !== -1 ?
                                                                        this.state.totalPrice + '000đ'
                                                                    :
                                                                        'Đã có lỗi'
                                                            )
                                                        }
                                            styleView = {{
                                                                justifyContent : 'flex-start'
                                                        }}
                            />
                    </View>

            </View>
        )
    }
}


class Pay extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listPaid : []
    };
  }

  componentDidMount(){
      this.props.actionPay.getListProduct();
  }

  render() {
    const isReducerGetListPay = this.props.isReducerGetListPay;
    return (
        <SafeAreaView style = {{
                                flex : 1,
                                backgroundColor : constants.BACKGROUND_BELOW_APP,
                            }}
        >
                    {
                        isReducerGetListPay.isGetingList ?
                            <View   style = {{
                                                flex : 1,
                                                alignItems : 'center',
                                                justifyContent : 'center'
                                            }}
                            >
                                    <Text_Custom    content = {'Đang tải dữ liệu'} />
                            </View>
                        :
                            isReducerGetListPay.isGetListSuccess ?
                                <View   style = {{
                                                    flex : 1,
                                                    alignItems : 'center',
                                                    justifyContent : 'center',
                                                }}
                                >       
                                        {
                                                isReducerGetListPay.isListPay.length == 0 ?
                                                    <Text_Custom    content = {'Không có hóa đơn thanh toán'}/>
                                                :
                                                    <FlatList   style = {{
                                                                            flex : 1,
                                                                            width : '100%',
                                                                            padding : 10,
                                                                        }}
                                                                data = {isReducerGetListPay.isListPay}
                                                                renderItem = {({item,index})=> {
                                                                    return <ItemPay data = {item}/>
                                                                }}
                                                    />
                                        }
                                </View>
                            :
                                isReducerGetListPay.isGetListError ?
                                    <View   style = {{
                                                        flex : 1,
                                                        alignItems : 'center',
                                                        justifyContent : 'center'
                                                    }}
                                    >
                                            <Text_Custom    content = {'Vui lòng thử lại'}/>
                                    </View>
                                :
                                    <View/>
                    }
      </SafeAreaView>
    );
  }
}


function mapStateToProps(state) {
    return {
        isReducerGetListPay         :  state.isReducerGetListPay,
        isReducerPaid               :  state.isReducerPaid
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionPay        : bindActionCreators(actionPay,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
