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
    this.submitOrderQR = this.submitOrderQR.bind(this);
    this.state = {
      focusedScreen : false,
      
    };
    this.loadingOrder = false ; 
  }

  submitOrderQR(){
    this.loadingOrder = false;
  }

  readDataQRCamera = (Data) => {
    if(this.loadingOrder === true) return;
    Vibration.vibrate();
    showBlockUI();
    this.loadingOrder = true ;
    let objectData = {};
    if(Data.hasOwnProperty('data')){
          //const objectData = JSON.parse(Data.barcodes[0].data);
          objectData =JSON.parse(Data.data);
          this.props.actionOder.add_product_oder(objectData);
          hideBlockUI(constants.RESULT_BLOCK_SUCCESS,'Đặt món thành công',true,this.submitOrderQR);
      }else{
        hideBlockUI(constants.RESULT_BLOCK_SUCCESS,'Đặt món thất bại',true,this.submitOrderQR);
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
      <SafeAreaView style =   {{
                                flex : 1,
                                backgroundColor : constants.BACKGROUND_BELOW_APP
                              }}
      >
                <View style = {{
                                  flex : 0.7,
                                  padding : 40
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
                                      onBarCodeRead = {this.readDataQRCamera}
                                      //onGoogleVisionBarcodesDetected = {this.readDataQRCamera}
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