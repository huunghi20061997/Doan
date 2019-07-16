import React, { Component } from 'react';
import { View, Text,SafeAreaView } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as actionOder from './action';
import * as constants from '../../../../configapp/constants';
import Text_Custom from '../../../component/text_custom';
import {showBlockUI,hideBlockUI} from '../../../component/block-ui';
import OderProduct from '../../../component/oder_product';

class OderQRCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  readDataQR = (Data) => {}

  render() {
    return (
      <SafeAreaView style =   {{
                                flex : 1,
                                backgroundColor : constants.BACKGROUND_BELOW_APP
                              }}
      >
                <View style = {{
                                  flex : 0.7,
                              }}
                >
                      <QRCodeScanner  cameraStyle = {{
                                                      height : constants.HEIGHT_SCREEN/2,
                                                      width : constants.WIDTH_SCREEN * 0.7,
                                                      alignSelf: 'center',
                                                  }}
                                    onRead = {this.readDataQR}
                      />

                </View>

                <View style = {{
                                  flex : 0.3,
                              }}
                >
                    <OderProduct/>
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
