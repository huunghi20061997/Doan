import React, { Component } from 'react';
import { View, Text,SafeAreaView,TouchableOpacity,Platform,StyleSheet,Clipboard } from 'react-native';
import * as constants from '../../../../configapp/constants';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Button} from 'native-base';
import Text_Custom from '../../../component/text_custom';
import wifi from 'react-native-android-wifi';
import {showBlockUI,hideBlockUI} from '../../../component/block-ui';
import {WifiManager} from 'react-native-wifi';
import {RNCamera} from 'react-native-camera';
import Wifi from "react-native-iot-wifi";
import OpenSettings from 'react-native-open-settings';





export default class LoginWifi extends Component {
  constructor(props) {
    super(props);
    this.numberLogin = 0; 
    this.state = {
      focusedScreen : false,
      readingData : false,
      showAndroid : false,
      nameWifi_IOS : '',
      passwordWifi_IOS : '',
    };
    this.loginWifi = this.loginWifi.bind(this);
  }

  resetState(){
    this.setState({
      focusedScreen : false,
      readingData : false,
      showAndroid : false,
      nameWifi_IOS : '',
      passwordWifi_IOS : '',
    })
  }

  loginWifi(name,password){

    console.log('>>>>. user name',name)
    console.log('>>>>. user name1',password)

    if(Platform.OS == 'android'){
          this.numberLogin += 1 ; 
          wifi.findAndConnect(name,password, (found) => {
            console.log('>>>>> this is found',found)
            if (found) {
              console.log('>>>>> this is found',found)
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
                hideBlockUI(constants.RESULT_BLOCK_ERROR,'Vui lòng đăng nhập thủ công');
                this.setState ({
                                  showAndroid : true,
                                  nameWifi_IOS : name,
                                  passwordWifi_IOS : password,
                              })
              }
            }
        })
    }else{
      this.setState({
        nameWifi_IOS : name,
        passwordWifi_IOS : password,
      })
      hideBlockUI(constants.RESULT_BLOCK_SUCCESS,'Đã lấy được thông tin');
    }
}

  readDataQR = (Data) => {
    console.log('>>> this is data',Data)
    if(this.state.readingData) return ; 
    this.setState({readingData : true});
    showBlockUI();
    let objectData = {};
    if(Data.hasOwnProperty('data')){
      objectData = JSON.parse(Data.data);
    }
        if(objectData.hasOwnProperty('name') && objectData.hasOwnProperty('password')){
          console.log('>>i am here0');
          if(Platform.OS == 'android'){
              wifi.isEnabled((isEnabled)=>{
                if(!isEnabled) {
                  this.setState({readingData : false});
                  hideBlockUI(constants.RESULT_BLOCK_ERROR,'Vui lòng bật wifi',true);
                  this.props.navigation.goBack();
                }else {
                  this.loginWifi(objectData.name,objectData.password);
                }
            });
          }else{
            console.log('>>i am here2');
                  this.loginWifi(objectData.name,objectData.password);
                }
        }
}

  componentDidMount(){
    const { navigation } = this.props;
    navigation.addListener('willFocus', () =>
                                              this.setState({ focusedScreen: true })
                          );
    navigation.addListener('willBlur', () =>
                                              this.resetState()
                          );
  }

  componentWillUnmount(){
    this.cleanData();
  }

  cleanData(){
    this.setState({
      focusedScreen : false,
      readingData : false,
      showAndroid : false,
      nameWifi_IOS : '',
      passwordWifi_IOS : '',
    })
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

                    {
                    Platform.OS === 'ios' || this.state.showAndroid ? 
                    <View style = {{
                                      flex : 0.3,
                                      //flexDirection : 'row',
                                  }}
                    >
                          <View style = {{
                                            flex : 0.5,
                                            justifyContent : 'center',
                                            alignItems : 'center'
                                        }}
                          >
                                <Text_Custom  content = {'Tên wifi : ' + this.state.nameWifi_IOS}
                                />
                                <Text_Custom  content = {'Mật khẩu : ' + this.state.passwordWifi_IOS}
                                />
                          </View>
                          {
                          this.state.passwordWifi_IOS.length > 0 ?
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
                                                  onPress = {()=>{
                                                    Clipboard.setString(this.state.passwordWifi_IOS);
                                                    OpenSettings.openSettings();
                                                    
                                                  }}
                                                  disabled = {this.state.passwordWifi_IOS.length == 0 ? true : false}
                                >
                                        <Text_Custom  content = {'Sao chép và đến cài đặt'}/>
                                </TouchableOpacity>
                          </View>
                          :
                            <View style={{flex : 0.5}}/>
                          }
                    </View>
                    :
                    <View style = {{
                                      flex : 0.3
                                  }}
                    />
                  }
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