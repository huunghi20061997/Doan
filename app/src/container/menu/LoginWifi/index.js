import React, { Component } from 'react';
import { View, Text,SafeAreaView,TouchableOpacity,Platform,StyleSheet } from 'react-native';
import * as constants from '../../../../configapp/constants';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Button} from 'native-base';
import Text_Custom from '../../../component/text_custom';
import wifi from 'react-native-android-wifi';
import {showBlockUI,hideBlockUI} from '../../../component/block-ui';





export default class LoginWifi extends Component {
  constructor(props) {
    super(props);
    this.numberLogin = 0; 
    this.state = {
      focusedScreen : false
    };
    this.loginWifi = this.loginWifi.bind(this);
  }

  loginWifi(name,password){
    if(Platform.OS == 'android'){
          this.numberLogin += 1 ; 
          wifi.findAndConnect('Anhduy','Hoicaigi', (found) => {
            if (found) {
              hideBlockUI(constants.RESULT_BLOCK_SUCCESS,'Đăng nhập wifi thành công');
              this.props.navigation.goBack();
            } else {
              if(this.numberLogin <= 3){
                setTimeout(()=>{
                  this.loginWifi(name,password);
                },1000);
              }else{
                hideBlockUI(constants.RESULT_BLOCK_ERROR,'Đăng nhập wifi thất bại');
                this.props.navigation.goBack();
              }
            }
        });
      }
}

  readDataQR = (Data) => {
    let objectData = {};
    if(Data.hasOwnProperty('data')){
      objectData = JSON.parse(Data.data);
    }
    showBlockUI();
    if(objectData.hasOwnProperty('name') && objectData.hasOwnProperty('password')){
      wifi.isEnabled((isEnabled)=>{
        if(!isEnabled) {
          hideBlockUI(constants.RESULT_BLOCK_ERROR,'Vui lòng bật wifi',true);
          this.props.navigation.goBack();
        }
        else {
          this.loginWifi(objectData.name,objectData.password);
        }
    })
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

                    {
                      this.state.focusedScreen ?
                          <QRCodeScanner  cameraStyle = {{
                                                          height : constants.HEIGHT_SCREEN/2,
                                                          width : constants.WIDTH_SCREEN * 0.7,
                                                          alignSelf: 'center',
                                                          borderRadius:  6,
                                                      }}
                                        onRead = {this.readDataQR}
                                        isRepeatScan={true}
                          />
                      : 
                          <View style = {styles.waitTurnOnCamera}
                          >
                                <Text_Custom  content = {'Đang bật camera'}
                                />
                          </View>
                    }
                    
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

const styles = StyleSheet.create({
    waitTurnOnCamera : {
      height : constants.HEIGHT_SCREEN/2,
      width : constants.WIDTH_SCREEN * 0.7,
      alignSelf: 'center',
      borderColor : 'silver',
      borderWidth : 1,
      borderRadius : 6, 
      alignItems : 'center',
      justifyContent : 'center',
    }
})