import React, { Component } from 'react';
import { View, Text,SafeAreaView,StyleSheet,Vibration } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as actionOder from './action';
import * as constants from '../../../../configapp/constants';
import Text_Custom from '../../../component/text_custom';
import {showBlockUI,hideBlockUI} from '../../../component/block-ui';
import OderProduct from '../../../component/oder_product';
import {RNCamera} from 'react-native-camera';

class OderQRCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedScreen : false,
      
    };
    this.loadingOrder = false ; 
  }

  readDataQR = (Data) => {
    let objectData = {};
    // if(Data.hasOwnProperty('data')){
    //   objectData = JSON.parse(Data.data);
    // }
    console.log('>>>>>>>Receiver Data QR', Data);
  }

  readDataQRCamera = (Data) => {
    Vibration.vibrate();
    if(this.loadingOrder == true) return;
    hideBlockUI();
    this.loadingOrder = true ;
    let objectData = {};
    if(Data.hasOwnProperty('barcodes')){
          if(Data.barcodes.length > 0){
            const objectData = JSON.parse(Data.barcodes[0].data);
            this.props.actionOder.add_product_oder(objectData);
            hideBlockUI(constants.RESULT_BLOCK_SUCCESS,'Đặt món thành công');
          }else{
            hideBlockUI(constants.RESULT_BLOCK_SUCCESS,'Đặt món thất bại');
          }
      }else{
        hideBlockUI(constants.RESULT_BLOCK_SUCCESS,'Đặt món thất bại');
      }
    this.loadingOrder = false ;
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
      <SafeAreaView style =   {{
                                flex : 1,
                                backgroundColor : constants.BACKGROUND_BELOW_APP
                              }}
      >
                <View style = {{
                                  flex : 0.7,
                                  paddingVertical : 30,
                                  paddingHorizontal : 15,
                              }}
                >
                      {
                      this.state.focusedScreen ?
                          // <QRCodeScanner  cameraStyle = {{
                          //                                 height : constants.HEIGHT_SCREEN/2,
                          //                                 width : constants.WIDTH_SCREEN * 0.7,
                          //                                 alignSelf: 'center',
                          //                             }}
                          //               onRead = {this.readDataQR}
                          //               isRepeatScan={true}
                          // />
                          <RNCamera style = {{
                                                flex : 1,
                                            }}
                                    isRepeatScan={true}
                                    autoFocus={RNCamera.Constants.AutoFocus.on}
                                    autoFocusPointOfInterest= {{x:0.5,y:0.5}}
                                    whiteBalance = {RNCamera.Constants.WhiteBalance.auto}
                                    onGoogleVisionBarcodesDetected = {this.readDataQRCamera}
                          />
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
                              }}
                >
                    <OderProduct  OderQR = {true}
                    />
                </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
    return {
        authenReducer        :  state.authenReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionOder        : bindActionCreators(actionOder,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OderQRCode);

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