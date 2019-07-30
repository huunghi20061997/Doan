import React, { Component } from 'react';
import  {   Text, View,ImageBackground,
            SafeAreaView,ScrollView,TouchableOpacity
} from 'react-native'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionRegister from './action';
import * as constants from '../../../configapp/constants';
import Text_Custom from '../../component/text_custom';
import Text_Input from '../../component/text_input';
import Modal_verify_code from '../../component/modal_verify_code';
class Register extends Component {

    static navigationOptions = {
                                header: null
    }

  constructor(props) {
    super(props);
    this.state = {
        visibleVerifyCode : false,
        valueVerify : '',
    };
    this.setvisibleVerifyCode = this.setvisibleVerifyCode.bind(this);
    this.changeValueVerify = this.changeValueVerify.bind(this);
  }

  setvisibleVerifyCode(){
      this.props.actionRegister.sentAndVerifyPhone();
      this.setState({
        visibleVerifyCode : !this.state.visibleVerifyCode
      })
  }

  changeValueVerify = (value) => {
    this.setState({
        valueVerify : value
      })
  }

  render() {
    return (
        <View   style = {{
                            flex : 1,
                        }}
        >
                <Modal_verify_code  setvisibleVerifyCode = {this.setvisibleVerifyCode}
                                    visible = {this.state.visibleVerifyCode}
                                    changeValueVerify = {this.changeValueVerify}
                />

                <ScrollView style = {{
                                        flex : 1,
                                    }}
                >
                            <SafeAreaView   style = {{
                                                        flex : 1,
                                                    }}
                            >
                                    {/* Image App & Slogan */}
                                    <View   style = {{
                                                        height : constants.HEIGHT_SCREEN / 3,
                                                        alignItems : 'center',
                                                        justifyContent : 'center'
                                                    }}
                                    >
                                            <ImageBackground    style = {{
                                                                            flex : 1,
                                                                            height : 150,
                                                                            width : 150,
                                                                        }}
                                                                resizeMode = {'cover'}
                                                                source = {require('../../../resource/image/imageapp.jpg')}
                                            />

                                            <View>
                                                <Text_Custom content = {'Đăng kí tài khoản'}
                                                />
                                             </View>
                                            
                                    </View>
                            
                                    {/* Input Name, numberphone, new Pass word  */}
                                    <View style = {{
                                                      paddingHorizontal : constants.PADDING_DEFAULT_APP
                                                  }}
                                    >
                                          <Text_Input textHolder = {'Họ tên'}
                                                      //onChangeText = {this.changeUserName}
                                          />

                                          <View style = {{
                                                            marginTop : constants.MARGIN_DEFAULT_APP * 2
                                                        }}
                                          >
                                              <Text_Input textHolder = {'Số điện thoại'}
                                                          //onChangeText = {this.changePassWord}
                                                          
                                              />
                                          </View>

                                          <View style = {{
                                                            marginTop : constants.MARGIN_DEFAULT_APP * 2
                                                        }}
                                          >
                                              <Text_Input textHolder = {'Nhập mật khẩu mới'}
                                                          onChangeText = {this.changePassWord}
                                                          //secure = {true}
                                              />
                                          </View>

                                          <View style = {{
                                                            marginTop : constants.MARGIN_DEFAULT_APP * 2
                                                        }}
                                          >
                                              <Text_Input textHolder = {'Nhập lại mật khẩu mới'}
                                                          onChangeText = {this.changePassWord}
                                                          //secure = {true}
                                              />
                                          </View>

                                    </View>
                            
                                    {/* Button Register */}
                                    <TouchableOpacity style = {{
                                                                    marginTop : constants.MARGIN_DEFAULT_APP * 2,
                                                                    justifyContent : 'center',
                                                                    alignItems : 'center',
                                                                    height : constants.HEIGHT_DEFAULT_TEXT_INPUT,
                                                                    borderRadius : constants.BODERADIUS_CIRCLE_APP,
                                                                    width : '50%',
                                                                    alignSelf : 'center',
                                                                    backgroundColor : constants.BACKGROUND_TURQUOISE_OPACITY
                                                                }}
                                                        onPress = {this.setvisibleVerifyCode}
                                    >
                                          <Text_Custom  content = {'Đăng kí'}
                                                        style = {{
                                                                    color : constants.BACKGROUND_TURQUOISE,
                                                                    fontSize:  15,
                                                                }}
                                          />
                                    </TouchableOpacity>

                            </SafeAreaView>
                </ScrollView>
        </View>
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
        actionRegister        : bindActionCreators(actionRegister,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
