import React, { Component } from 'react';
import { View, Text,ImageBackground,StyleSheet,TouchableOpacity } from 'react-native';
import Text_Custom from '../../src/component/text_custom';
import * as constants from '../../configapp/constants';



export default class DrawerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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

            <View   style = {styles.itemDrawer}
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
            </View>

            <View   style = {styles.itemDrawer}
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
            </View>

            <View   style = {styles.itemDrawer}
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
            </View>

            <View    style = {styles.itemDrawer}
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
            </View>

            <View   style = {styles.itemDrawer}
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
            </View>
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