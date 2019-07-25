import React, { Component } from 'react';
import { View, Text,ImageBackground,TouchableOpacity,StyleSheet } from 'react-native';
import * as constants from '../../../configapp/constants';
import Text_Custom from '../../component/text_custom';
import {showBlockUI,hideBlockUI} from '../../component/block-ui';

export default class MenuApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
  }

  render() {    
    return (
      <View style = {{
                        flex : 1,
                        padding : 20
                    }}
      >
            <View   style = {{  
                                flex : 1/5,
                                flexDirection : 'row',
                            }}
            >
                    <TouchableOpacity   style = {styles.item}
                                        onPress = {()=>{
                                            this.props.navigation.navigate('LoginWifi')
                                        }}
                    >
                            <ImageBackground   style = {styles.styleImage}
                                                source = {require('../../../resource/image/iconwifi.png')}
                            />

                            <Text_Custom    content = {'Đăng nhập wifi'}
                                            style = {{
                                                        fontWeight : 'bold',
                                                        fontSize: 15,
                                                    }}
                            />
                    </TouchableOpacity>

                    <TouchableOpacity   style = {styles.item}
                                        onPress = {()=>{
                                            this.props.navigation.navigate('TabTopOderApp');
                                        }}

                    >
                            <ImageBackground    style = {styles.styleImage}
                                                source = {require('../../../resource/image/oder.png')}
                            />

                            <Text_Custom    content = {'Đặt nước'}
                                            style = {{
                                                        fontWeight : 'bold',
                                                        fontSize: 15,
                                                    }}
                            />
                    </TouchableOpacity>
            </View>

            <View   style = {{  
                                flex : 1/5,
                                marginTop : 20,
                                flexDirection : 'row',
                            }}
            >
                    <View    style = {styles.item}
                    >
                            <ImageBackground    style = {styles.styleImage}
                                                source = {require('../../../resource/image/pay.png')}
                            />

                            <Text_Custom    content = {'Thanh toán'}
                                            style = {{
                                                        fontWeight : 'bold',
                                                        fontSize: 15,
                                                    }}
                            />
                    </View>

                    <View   style = {styles.item}
                    >
                            <ImageBackground    style = {styles.styleImage}
                                                source = {require('../../../resource/image/history.png')}
                            />

                            <Text_Custom    content = {'Lịch sử'}
                                            style = {{
                                                        fontWeight : 'bold',
                                                        fontSize: 15,
                                                    }}
                            />
                    </View>
            </View>
            
            <View   style = {{  
                                flex : 1/5,
                                marginTop : 20,
                                flexDirection : 'row',
                            }}
            >
                    <View    style = {styles.item}
                    >
                            <ImageBackground    style = {styles.styleImage}
                                                source = {require('../../../resource/image/promotion.png')}
                            />

                            <Text_Custom    content = {'Khuyến mãi'}
                                            style = {{
                                                        fontWeight : 'bold',
                                                        fontSize: 15,
                                                    }}
                            />
                    </View>

                    <View   style = {styles.item}
                    >
                            <ImageBackground    style = {styles.styleImage}
                                                source = {require('../../../resource/image/address.png')}
                            />

                            <Text_Custom    content = {'Gần nhất'}
                                            style = {{
                                                        fontWeight : 'bold',
                                                        fontSize: 15,
                                                    }}
                            />
                    </View>
            </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    item : {
        flex : 0.5,
        padding : 20,
        marginRight : 10,
        justifyContent : 'center',
        backgroundColor : constants.BACKGROUND_ITEM_APP,
        alignItems : 'center',
        borderRadius : 6,
    },
    styleImage : {
        height : 50,
        width : 50,
        marginBottom : 10,
    }
})