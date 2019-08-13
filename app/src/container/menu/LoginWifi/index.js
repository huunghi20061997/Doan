import React, { Component } from 'react';
import { View, Text,SafeAreaView,TouchableOpacity,Platform,StyleSheet,Na } from 'react-native';
import * as constants from '../../../../configapp/constants';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Button} from 'native-base';
import Text_Custom from '../../../component/text_custom';
import wifi from 'react-native-android-wifi';
import {showBlockUI,hideBlockUI} from '../../../component/block-ui';
import {WifiManager} from 'react-native-wifi';
import {RNCamera} from 'react-native-camera';
import Wifi from "react-native-iot-wifi";





export default class LoginWifi extends Component {
  constructor(props) {
    super(props);
    this.numberLogin = 0; 
    this.state = {
      focusedScreen : false,
      readingData : false
    };
    this.loginWifi = this.loginWifi.bind(this);
  }

  loginWifi(name,password){
    if(Platform.OS == 'android'){
          this.numberLogin += 1 ; 
          wifi.findAndConnect(name,password, (found) => {
            if (found) {
              this.setState({readingData : false});
              hideBlockUI(constants.RESULT_BLOCK_SUCCESS,'Đăng nhập wifi thành công');
              this.props.navigation.goBack();
            } else {
              if(this.numberLogin <= 3){
                setTimeout(()=>{
                  this.loginWifi(name,password);
                },1000);
              }else{
                this.setState({readingData : false});
                hideBlockUI(constants.RESULT_BLOCK_ERROR,'Đăng nhập wifi thất bại');
                this.props.navigation.goBack();
              }
            }
        });
    }else{
    }
}

  readDataQR = (Data) => {
    if(this.state.readingData) return ; 
    this.setState({readingData : true});
    let objectData = {};
    if(Data.hasOwnProperty('data')){
      objectData = JSON.parse(Data.data);
    }
    showBlockUI();
    if(Platform.OS == 'android'){
        if(objectData.hasOwnProperty('name') && objectData.hasOwnProperty('password')){
          wifi.isEnabled((isEnabled)=>{
            if(!isEnabled) {
              this.setState({readingData : false});
              hideBlockUI(constants.RESULT_BLOCK_ERROR,'Vui lòng bật wifi',true);
              this.props.navigation.goBack();
            }
            else {
              this.loginWifi(objectData.name,objectData.password);
            }
        })
        }
    }else{
      this.loginWifi(objectData.name,objectData.password);
    }
}

  componentDidMount(){
    const { navigation } = this.props;
    navigation.addListener('willFocus', () =>
                                              this.setState({ focusedScreen: true })
                          );
    navigation.addListener('willBlur', () =>
                                              this.setState({ focusedScreen: false })
                          );
                          Wifi.connect("wifi-name", (error) => {
                            console.log(error ? 'error: ' + error : 'connected to wifi-name');
                          });
  }

  render() {
    return (
      <SafeAreaView style = {{
                                flex : 1,
                            }}
      >
                    <View style = {{
                                      flex : 0.7,
                                      padding : 40,
                                  }}
                    >
                    {
                      this.state.focusedScreen ?
                          <View style = {{
                                            flex : 1,
                                            borderRadius : 6,
                                            overflow : 'hidden'
                                        }}
                          >
                              <RNCamera style = {{
                                                    flex : 1,
                                                }}
                                        
                                        isRepeatScan={true}
                                        autoFocus={RNCamera.Constants.AutoFocus.on}
                                        autoFocusPointOfInterest= {{x:0.5,y:0.5}}
                                        whiteBalance = {RNCamera.Constants.WhiteBalance.auto}
                                        onBarCodeRead = {this.readDataQR}
                                        captureAudio = {false}
                              />
                          </View>
                      : 
                          <View style = {styles.waitTurnOnCamera}
                          >
                                <Text_Custom  content = {'Đang bật camera'}
                                />
                          </View>
                    }
                    </View>

                    <View style = {{
                                      flex : 0.3,
                                      flexDirection : 'row',
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

const styles = StyleSheet.create({
    waitTurnOnCamera : {
      flex : 1,
      borderColor : 'silver',
      borderWidth : 1,
      borderRadius : 6, 
      alignItems : 'center',
      justifyContent : 'center',
    }
})