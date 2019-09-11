import React, { Component } from 'react';
import { View, Text,ImageBackground,StyleSheet,TouchableOpacity,AsyncStorage } from 'react-native';
import Text_Custom from '../../src/component/text_custom';
import * as constants from '../../configapp/constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {showBlockUI,hideBlockUI} from '../component/block-ui';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionAuthen from '../container/Login/action';


class DrawerComponent extends Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.state = {
    };
  }

  logoutUser(){
    AsyncStorage.getItem(constants.TOKEN_AUTHEN).
    then((reponse)=>{
        if(reponse !== null){
            AsyncStorage.clear().
            then((reponse)=>{
                this.props.actionAuthen.resetAuthen();
                this.props.navigation.navigate('Login');
            }).
            catch((error)=>{
            })
        }
    }).catch((error)=>{
        this.props.actionAuthen.resetAuthen();
        this.props.navigation.navigate('Login');
    })
    
  }

  render() {
    return (
      <View style = {{
                        flex : 1,
                    }}
      >
            <TouchableOpacity   style = {styles.itemDrawer}
                                onPress = {()=>{
                                    this.props.navigation.navigate('Home')
                                }}
            >
                    <Text_Custom    content = {'Trang chủ'}
                                    //childrenComponent = {true}
                                    styleView = {styles.styleView}
                    >
                            {/* <ImageBackground   style = {{
                                                            height : 25,
                                                            width : 25,
                                                        }}
                                                        source = {require('../../resource/image/iconwifi.png')}
                            /> */}
                    </Text_Custom>
            </TouchableOpacity>

            <TouchableOpacity   style = {styles.itemDrawer}
                                onPress = {()=>{
                                    this.props.navigation.navigate('LoginWifi')
                                }}
            >
                    <Text_Custom    childrenComponent = {true}
                                    content = {'Đăng nhập wifi'}
                                    styleView = {styles.styleView}
                    >
                        <ImageBackground   style = {{
                                                            height : 20,
                                                            width : 20,
                                                        }}
                                                        source = {require('../../resource/image/iconwifi.png')}
                        />
                    </Text_Custom>
            </TouchableOpacity>

            <TouchableOpacity   style = {styles.itemDrawer}
                                onPress = {()=>{
                                    this.props.navigation.navigate('OderList')
                                }}
            >
                    <Text_Custom    childrenComponent = {true}
                                    content = {'Đặt nước'}
                                    styleView = {styles.styleView}
                    >
                        <ImageBackground   style = {{
                                                            height : 20,
                                                            width : 20,
                                                        }}
                                                        source = {require('../../resource/image/oder.png')}
                        />
                    </Text_Custom>
            </TouchableOpacity>

            <TouchableOpacity   style = {styles.itemDrawer}
                                onPress = {()=>{
                                    this.props.navigation.navigate('Pay')
                                }}
            >
                    <Text_Custom    childrenComponent = {true}  
                                    content = {'Thanh toán'}
                                    styleView = {styles.styleView}
                    >
                        <ImageBackground   style = {{
                                                            height : 20,
                                                            width : 20,
                                                        }}
                                                        source = {require('../../resource/image/pay.png')}
                        />
                    </Text_Custom>
            </TouchableOpacity>

            <TouchableOpacity   style = {styles.itemDrawer}
                                onPress = {()=>{
                                    this.props.navigation.navigate('History')
                                }}
            >
                    <Text_Custom    childrenComponent = {true}  
                                    content = {'lịch sử'}
                                    styleView = {styles.styleView}
                    >
                        <ImageBackground   style = {{
                                                            height : 20,
                                                            width : 20,
                                                        }}
                                                        source = {require('../../resource/image/history.png')}
                        />
                    </Text_Custom>
            </TouchableOpacity>

            <TouchableOpacity    style = {styles.itemDrawer}
                                onPress = {()=>{
                                    this.props.navigation.navigate('Promotion')
                                }}
            >
                    <Text_Custom    childrenComponent = {true}  
                                    content = {'Khuyến mãi'}
                                    styleView = {styles.styleView}
                    >
                        <ImageBackground   style = {{
                                                            height : 20,
                                                            width : 20,
                                                        }}
                                                        source = {require('../../resource/image/promotion.png')}
                        />
                    </Text_Custom>
            </TouchableOpacity>

            <TouchableOpacity   style = {styles.itemDrawer}
                                onPress = {()=>{
                                    this.props.navigation.navigate('Search')
                                }}
            >
                    <Text_Custom    childrenComponent = {true}  
                                    content = {'Gần nhất'}
                                    styleView = {styles.styleView}
                    >
                        <ImageBackground   style = {{
                                                            height : 20,
                                                            width : 20,
                                                        }}
                                                        source = {require('../../resource/image/address.png')}
                        />
                    </Text_Custom>
            </TouchableOpacity>

            <TouchableOpacity   style = {styles.itemDrawer}
                                onPress = {
                                    this.logoutUser
                                }
            >
                    <Text_Custom    childrenComponent = {true}  
                                    content = {'Thoát'}
                                    styleView = {styles.styleView}
                    >
                        <Icon   size = {20}
                                name = {'sign-out-alt'}
                                color = {constants.BACKGROUND_TURQUOISE}
                        />
                    </Text_Custom>
            </TouchableOpacity>
            
      </View>
    );
  }
}

const styles = StyleSheet.create({
    itemDrawer : {
        height : 50,
        justifyContent : 'center',
        alignItems : 'center',
        borderBottomColor : 'silver',
        borderBottomWidth : 1,
        flexDirection : 'row'
    },
    styleView : {
        justifyContent : 'flex-start',
        alignItems : 'center',
        paddingLeft: 20,
    }
});


function mapStateToProps(state) {
    return {
        authenReducer        :  state.authenReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionAuthen        : bindActionCreators(actionAuthen,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent);