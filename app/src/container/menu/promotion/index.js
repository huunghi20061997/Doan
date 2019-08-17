import React, { Component } from 'react';
import  {   Text, View,ImageBackground,Alert,FlatList,
    SafeAreaView,ScrollView,TouchableOpacity
} from 'react-native';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionPromotion from './action';
import * as constants from '../../../../configapp/constants';
import Text_Custom from '../../../component/text_custom';
import Text_Input from '../../../component/text_input';
import {showBlockUI,hideBlockUI} from '../../../component/block-ui';
import * as Firebase from '../../../../configapp/configfirebase';


class ItemPromotion extends Component {
  constructor(props) {
    super(props);
    this.getAddressShop = this.getAddressShop.bind(this);
    this.state = {
        addressShop : 'Đang tải',
    };
  }

  getAddressShop(){
    Firebase.FirebaseGetShopViaPromotion(this.props.data.id_pro)
    .then((reponse)=>{
        this.setState({
            addressShop : reponse.address
        })
    })
    .catch((error)=>{
        this.setState({
            addressShop : 'Vui lòng thử lại'
        })
    })
  }

  componentDidMount(){
    this.getAddressShop();
  }

  render() {
    const data = this.props.data ; 
    return (
        <View   style = {{
                            backgroundColor : 'white',
                            padding : 10, 
                            width : '100%',
                            borderRadius : 6,
                            //flexDirection : 'row',
                        }}
        >
                <ImageBackground    style = {{
                                                width : constants.WIDTH_SCREEN *  0.8,
                                                height : constants.HEIGHT_SCREEN * 0.3,
                                                alignSelf : 'center'
                                            }}
                                    source = {{uri : data.path_image}}
                                    resizeMode = {'contain'}
                >

                </ImageBackground>

                <View   style = {{
                                    marginTop : 10,
                                    width : '100%',
                                }}
                >
                        <Text_Custom    content = {data.title}
                                        style = {{
                                                    fontWeight : 'bold'
                                                }}
                        />
                </View>

                <View   style = {{
                                    marginTop : 10,
                                    width : '100%',
                                }}
                >
                        <Text_Custom    content = {data.content}
                                        style = {{
                                                    textAlign: 'left',
                                                }}
                        />
                </View>

                <View   style = {{
                                    marginTop : 10,
                                    width : '100%',
                                    paddingTop : 10,
                                    borderTopColor : 'silver',
                                    borderTopWidth : 0.5,
                                    alignItems : 'flex-start',
                                    justifyContent : 'center'
                                }}
                >
                        <Text_Custom    content = {this.state.addressShop}
                                        style = {{
                                                    textAlign: 'left',
                                                    fontWeight : 'bold'
                                                }}
                        />
                </View>


        </View>
    );
  }
}


class Promotion extends Component {
  constructor(props) {
    super(props);
    this.listenerFocus = null;
    this.state = {
    };
  }

  componentDidMount(){
      this.props.actionPromotion.getListPromotionInShop();
      this.listenerFocus = this.props.navigation.addListener('didFocus',()=>{
        this.props.actionPromotion.getListPromotionInShop();
      })
  }


  componentWillUnmount(){
    this.listenerFocus.remove();
  }

  render() {
    const GetListPromotion = this.props.isReducerGetListPromotion;
    return (
        <SafeAreaView style =   {{
                                        flex : 1,
                                        backgroundColor : constants.BACKGROUND_BELOW_APP,
                                }}
        >
                    {
                        GetListPromotion.isGetingList ?
                            <View   style = {{
                                                flex : 1,
                                                alignItems : 'center',
                                                justifyContent : 'center'
                                            }}
                            >
                                    <Text_Custom    content = {'Đang tải dữ liệu'} />
                            </View>
                        :
                            GetListPromotion.isGetListSuccess ?
                                <View   style = {{
                                                    flex : 1,
                                                    alignItems : 'center',
                                                    justifyContent : 'center',
                                                }}
                                >       
                                        {
                                                GetListPromotion.isListPromotion.length == 0 ?
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
                                                                        data = {GetListPromotion.isListPromotion}
                                                                        renderItem = {({item,index})=> {
                                                                            return  <ItemPromotion
                                                                                                data = {item}
                                                                                    />
                                                                        }}
                                                            />
                                                    </View>
                                        }
                                </View>
                            :
                                GetListPromotion.isGetListError ?
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

    )
}
}


function mapStateToProps(state) {
    return {
        isReducerGetListPromotion        :  state.isReducerGetListPromotion
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionPromotion        : bindActionCreators(actionPromotion,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Promotion);