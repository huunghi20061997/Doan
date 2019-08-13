import React, { Component } from 'react';
import  {   Text, View,ImageBackground,Alert,FlatList,
            SafeAreaView,ScrollView,TouchableOpacity
} from 'react-native'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionHistory from './action';
import * as constants from '../../../../configapp/constants';
import Text_Custom from '../../../component/text_custom';
import {showBlockUI,hideBlockUI} from '../../../component/block-ui';
import * as Firebase from '../../../../configapp/configfirebase';
import IonIcon from 'react-native-vector-icons/FontAwesome';

class ItemPay extends Component {
    constructor(props){
        super(props);
        this.state = {
            expand : false,
            nameShop : 'Đang tải',
        }
    }

    componentDidMount(){
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

    render(){
        const data = this.props.data.dataObject ;
        const dateOderBill = new Date(data.time_pay.seconds * 1000);
        return (
            <View    style =   {{
                                    width : '100%',
                                    marginBottom : 10,
                                    backgroundColor : 'white',
                                    borderRadius : 6,
                                    padding : 10,
                                }}
            >
                <View   style = {{
                                    flexDirection : 'row',
                                    width : '100%',
                                    padding : 10,
                                }}
                >
                    <View   style = {{
                                        flex : 0.5,
                                        padding : 10,
                                        borderRadius : 50,
                                        backgroundColor : constants.BACKGROUND_ITEM_APP,
                                        marginRight : 20,
                                        justifyContent : 'center',
                                        alignItems : 'center',
                                    }}
                    >
                            <Text_Custom    content =   { dateOderBill.getHours() + ':'+dateOderBill.getMinutes()
                                                            +'   '+ dateOderBill.getDate() +'/'+ dateOderBill.getMonth() + '/'+ dateOderBill.getFullYear()
                                                        }
                                            style = {{
                                                        color : constants.BACKGROUND_ORANGE,
                                                        fontSize: 10,
                                                    }}
                            />
                    </View>

                    <View   style = {{
                                        flex : 0.5,
                                        padding : 10, 
                                        borderRadius : 50,
                                        backgroundColor : constants.BACKGROUND_ITEM_APP,
                                        justifyContent : 'center',
                                        alignItems : 'center',
                                        alignSelf : 'flex-start'
                                    }}
                    >
                            <Text_Custom    content =   {   'Tình trạng  : ' + (data.paid ? 'Xong' : 'Chưa')}
                                            style = {{
                                                        color : data.paid ? constants.BACKGROUND_GREEN : constants.BACKGROUND_ORANGE
                                                    }}
                            />
                    </View>
                </View>

                <View   style = {{
                                        padding : 10,
                                        alignItems : 'center',
                                        justifyContent : 'center',
                                        marginHorizontal : 10,
                                        backgroundColor :constants.BACKGROUND_ITEM_APP,
                                        borderRadius : 50,
                                        flexDirection : 'row'
                                    }}
                    >
                            <View   style  =    {{
                                                    height : 30,
                                                    width : 30,
                                                    borderRadius : 50,
                                                    backgroundColor : 'white',
                                                    borderRadius : 15,
                                                    justifyContent :'center',
                                                    alignItems : 'center'
                                                }}
                            >
                                    <IonIcon    name = {'pause'}
                                                color = {constants.BACKGROUND_TURQUOISE}
                                                size = {15}
                                    />
                            </View>
                            
                            <View   style = {{
                                                    marginHorizontal : 10,
                                                    flex : 1,
                                            }}
                            >
                                    <Text_Custom    content =   {this.state.nameShop}
                                    />
                            </View>

                            <View   style  =    {{
                                                    height : 30,
                                                    width : 30,
                                                    borderRadius : 50,
                                                    backgroundColor : 'white',
                                                    borderRadius : 15,
                                                    justifyContent :'center',
                                                    alignItems : 'center'
                                                }}
                            >
                                    <IonIcon    name = {'arrow-down'}
                                                color = {constants.BACKGROUND_TURQUOISE}
                                                size = {15}
                                    />
                            </View>


                    </View>
            </View>
        )
    }
}


class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    this.props.actionHistory.getListHistory();
}

  render() {
    const isReducerGetListHistory = this.props.isReducerGetListHistory;
    return (
                <SafeAreaView style =   {{
                                            flex : 1,
                                            backgroundColor : constants.BACKGROUND_BELOW_APP,
                                        }}
                >
        {
            isReducerGetListHistory.isGetingList ?
                <View   style = {{
                                    flex : 1,
                                    alignItems : 'center',
                                    justifyContent : 'center'
                                }}
                >
                        <Text_Custom    content = {'Đang tải dữ liệu'} />
                </View>
            :
            isReducerGetListHistory.isGetListSuccess ?
                    <View   style = {{
                                        flex : 1,
                                        alignItems : 'center',
                                        justifyContent : 'center',
                                    }}
                    >       
                            {
                                    isReducerGetListHistory.isListHistory.length == 0 ?
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
                                                            data = {isReducerGetListHistory.isListHistory}
                                                            renderItem = {({item,index})=> {
                                                                return  <ItemPay
                                                                                    data = {item}
                                                                        />
                                                            }}
                                                />
                                        </View>
                            }
                    </View>
                :
                    isReducerGetListHistory.isGetListError ?
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
        isReducerGetListHistory     :   state.isReducerGetListHistory
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionHistory        : bindActionCreators(actionHistory,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);