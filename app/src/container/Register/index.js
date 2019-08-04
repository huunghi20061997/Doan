import React, { Component } from 'react';
import  {   Text, View,ImageBackground,Alert,
            SafeAreaView,ScrollView,TouchableOpacity
} from 'react-native'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionRegister from './action';
import * as constants from '../../../configapp/constants';
import Text_Custom from '../../component/text_custom';
import Text_Input from '../../component/text_input';
import Modal_verify_code from '../../component/modal_verify_code';
import {showBlockUI,hideBlockUI} from '../../component/block-ui';


const typeInput =   {
                        NAME                : 1,
                        NUMBER_PHONE        : 2,
                        NEWPASSWORD         : 3,
                        RETYPE_NEWPASSWORD  : 4,
                    }

class Register extends Component {
    static navigationOptions = {
                                header: null
    }
  constructor(props) {
    super(props);
    this.state = {
        visibleVerifyCode : false,
        valueVerify : '',

        name : '',
        numberPhone : '',
        newPassword : '',
        retypePassword : '',
    };
    this.setvisibleVerifyCode = this.setvisibleVerifyCode.bind(this);
    this.changeValueVerify = this.changeValueVerify.bind(this);

    this.registerAccount = this.registerAccount.bind(this);
    this.setValueRegister = this.setValueRegister.bind(this)
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

  registerAccount(){
      if(this.state.newPassword === this.state.retypePassword){
        this.props.actionRegister.registerAccount(this.state.name,this.state.numberPhone,this.state.newPassword);
      }else{
        Alert.alert(
            'Thông báo',
            'Mật khẩu không trùng khớp',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        )
      }
  }

  setValueRegister(type,value){
    if(type === typeInput.NAME){
          this.setState({
            name : value
          })
    }
    if(type === typeInput.NUMBER_PHONE){
        this.setState({
            numberPhone : value
        })
    }
    if(type === typeInput.NEWPASSWORD){
        this.setState({
            newPassword : value
        })
    }
    if(type === typeInput.RETYPE_NEWPASSWORD){
        this.setState({
            retypePassword : value
        })
    }
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
                                                      onChangeText = {(text)=>{this.setValueRegister(typeInput.NAME,text)}}
                                          />

                                          <View style = {{
                                                            marginTop : constants.MARGIN_DEFAULT_APP * 2
                                                        }}
                                          >
                                              <Text_Input textHolder = {'Số điện thoại'}
                                                          onChangeText = {(text)=>{this.setValueRegister(typeInput.NUMBER_PHONE,text)}}
                                                          
                                              />
                                          </View>

                                          <View style = {{
                                                            marginTop : constants.MARGIN_DEFAULT_APP * 2
                                                        }}
                                          >
                                              <Text_Input textHolder = {'Nhập mật khẩu mới'}
                                                          onChangeText = {(text)=>{this.setValueRegister(typeInput.NEWPASSWORD,text)}}
                                                          secure = {true}
                                              />
                                          </View>

                                          <View style = {{
                                                            marginTop : constants.MARGIN_DEFAULT_APP * 2
                                                        }}
                                          >
                                              <Text_Input   textHolder = {'Nhập lại mật khẩu mới'}
                                                            onChangeText = {(text)=>{this.setValueRegister(typeInput.RETYPE_NEWPASSWORD,text)}}
                                                            secure = {true}
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
                                                        onPress = {this.registerAccount}
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
        registerReducer        :  state.registerReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionRegister        : bindActionCreators(actionRegister,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
