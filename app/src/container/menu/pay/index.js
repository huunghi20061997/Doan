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
        this.selectPay = this.selectPay.bind(this);
        this.state = {
            expand : false,
            totalPrice : -2, //** -2 is case loading */
            nameShop : 'Đang tải',
            selectPaid : false,
        }

    }

    selectPay(){
        this.setState({
            selectPaid : !this.state.selectPaid
        },()=>{
            if(this.state.selectPaid){
                this.props.selectItemPay(this.props.data.dataPath);
            }else{
                this.props.removeItemPay(this.props.data.dataPath);
            }
        })
    }



    componentDidMount(){
        Firebase.FirebaseGetItemPay(true,this.props.data.dataObject.list_oder,)
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

        Firebase.FirebaseGetItemPay(false,[],this.props.data.dataObject.id_shop)
        .then((reponse)=>{
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
        const data = this.props.data.dataObject ;
        const dateOderBill = new Date(data.time_pay.seconds * 1000);
        return (
             <View              style = {{
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
                    
                    <TouchableOpacity   style = {{
                                                    width : 20,
                                                    height : 20,
                                                    borderRadius : 10,
                                                    position : 'absolute',
                                                    bottom : 10,
                                                    right: 10,
                                                    borderColor : 'silver',
                                                    borderWidth : 0.5,
                                                    backgroundColor : this.state.selectPaid ? 'green' : 'white',
                                                }}
                                        onPress = {this.selectPay}
                    >

                    </TouchableOpacity>
            </View>
        )
    }
}



class Pay extends Component {
  constructor(props) {
    super(props);
    this.selectItemPay = this.selectItemPay.bind(this);
    this.removeItemPay = this.removeItemPay.bind(this);
    this.payBill = this.payBill.bind(this);
    this.listenerFocus = null;
    this.state = {
        listPaid : []
    };
  }

  componentDidMount(){
      this.props.actionPay.getListProduct();
      this.listenerFocus = this.props.navigation.addListener('didFocus',()=>{
        this.props.actionPay.getListProduct();
      })
  }

  componentWillUnmount(){
    this.listenerFocus.remove();
  }



  selectItemPay(idBill){
    let index = this.state.listPaid.findIndex((value) => value === idBill);
    if(index === -1){
        let arrayCopy = [...this.state.listPaid];
        arrayCopy.push(idBill);
        this.setState({
            listPaid : arrayCopy
        },()=>{
        });
    }
  }

  removeItemPay(idBill){
    let arrayCopy = [];
    if(this.state.listPaid.length > 0){
        arrayCopy = this.state.listPaid.find(value => value !== idBill);
    }
    
    this.setState({
        listPaid : arrayCopy !== undefined && arrayCopy !== null ? arrayCopy : []
    },()=>{
    });
  }

  payBill(){
    this.props.actionPay.payBill(this.state.listPaid);
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
                                                    <View   style = {{
                                                                        flex : 1,
                                                                        width : '100%'
                                                                    }}
                                                    >
                                                            <FlatList   style = {{
                                                                                    flex : 1,
                                                                                    width : '100%',
                                                                                    padding : 10,
                                                                                }}
                                                                        data = {isReducerGetListPay.isListPay}
                                                                        renderItem = {({item,index})=> {
                                                                            return  <ItemPay
                                                                                                data = {item}
                                                                                                selectItemPay = {this.selectItemPay}
                                                                                                removeItemPay =  {this.removeItemPay}
                                                                                    />
                                                                        }}
                                                            />
                                                            <TouchableOpacity   style = {{
                                                                                            height : 30,
                                                                                            width : '50%',
                                                                                            marginVertical : 15,
                                                                                            borderRadius : 50,
                                                                                            alignSelf : 'center',
                                                                                            justifyContent :'center',
                                                                                            alignItems : 'center',
                                                                                            backgroundColor : 'green'
                                                                                        }}
                                                                                onPress = {this.payBill}
                                                            >
                                                                                <Text_Custom    content = {'Thanh toán'}
                                                                                                style = {{
                                                                                                            color : 'white'
                                                                                                        }}
                                                                                />
                                                            </TouchableOpacity>
                                                    </View>
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
