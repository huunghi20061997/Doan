import React, { Component } from 'react';
import { View, Text,SafeAreaView,TouchableOpacity } from 'react-native';
import * as constants from '../../../../configapp/constants';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Button} from 'native-base';
import Text_Custom from '../../../component/text_custom';
import WifiManager from 'react-native-wifi';



export default class LoginWifi extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  readDataQR = (Data) => {
    let objectData = {};
    if(Data.hasOwnProperty('data')){
      objectData = JSON.parse(Data.data);
    }
    if(objectData.hasOwnProperty('name') && objectData.hasOwnProperty('password')){
      WifiManager.getCurrentWifiSSID()
      .then((ssid) => {
          console.log("Your current connected wifi SSID is ",ssid)
      }, () => {
          console.log('Cannot get current SSID!')
      })
      WifiManager.loadWifiList((reponse)=>{
        console.log(">>>>>> ",reponse)
      },(error)=>{
        console.log(">>>>>>1 ",error)
      })
    }
  }

  render() {
    return (
      <SafeAreaView style = {{
                                flex : 1,
                            }}
      >
                    <View  style = {{
                                      height : 100,
                                      width : '100%',
                                      justifyContent : 'center',
                                      alignItems : 'center'
                                  }}
                    >
                            <Text_Custom  content = {'Đăng nhập wifi QRCODE'}
                                          style = {{
                                                      color : constants.GRAY_COLOR,
                                                      fontWeight : 'bold',
                                                      fontSize: 20,
                                                  }}
                            />
                    </View>

                    <QRCodeScanner  cameraStyle = {{
                                                      height : constants.HEIGHT_SCREEN/2,
                                                      width : constants.WIDTH_SCREEN * 0.7,
                                                      alignSelf: 'center',
                                                  }}
                                    onRead = {this.readDataQR}
                    />
                    <View style = {{
                                      flex : 1,
                                      flexDirection : 'row',
                                      marginTop : 20,
                                  }}
                    >
                          <View style = {{
                                            flex : 0.5,
                                            justifyContent : 'center',
                                            alignItems : 'center'
                                        }}
                          >
                                <TouchableOpacity style = {{
                                                              height : 50,
                                                              width : '80%',
                                                              borderRadius : constants.BODERADIUS_APP,
                                                              backgroundColor : constants.BACKGROUND_ITEM_APP,
                                                              alignSelf : 'center',
                                                          }}
                                >
                                        <Text_Custom  content = {'Sao chép'}/>
                                </TouchableOpacity>
                          </View>
                          

                          <View style = {{
                                            flex : 0.5,
                                            justifyContent : 'center',
                                            alignItems : 'center'
                                        }}
                          >
                                <TouchableOpacity style = {{
                                                              height : 50,
                                                              width : '80%',
                                                              borderRadius : constants.BODERADIUS_APP,
                                                              backgroundColor : constants.BACKGROUND_ITEM_APP,
                                                              alignSelf : 'center',
                                                          }}
                                >
                                        <Text_Custom  content = {'Sao chép'}/>
                                </TouchableOpacity>
                          </View>

                    </View>
                    
      </SafeAreaView>
    );
  }
}
