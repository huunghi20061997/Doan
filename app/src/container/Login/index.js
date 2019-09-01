import React, { Component } from 'react';
import  {   Text, View,ImageBackground,
            SafeAreaView,ScrollView,TouchableOpacity
        } from 'react-native'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionAuthen from './action';
import * as constants from '../../../configapp/constants';
import Text_Custom from '../../component/text_custom';
import Text_Input from '../../component/text_input';

class Login extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.changeUserName = this.changeUserName.bind(this);
    this.changePassWord = this.changePassWord.bind(this);
    this.checkLogin = this.checkLogin.bind(this);

    this.state = {
      userName : '',
      passWord : '',
    };
  }

  componentDidMount(){
  }

  changeUserName = (text) => {
    this.setState({
      userName : text
    })
  }

  changePassWord = (text) => {
    this.setState({
      passWord : text
    })
  }

  componentDidUpdate(prevProps,prevSate){
    if(this.props.authenReducer.isAuthenSuccess !== prevProps.authenReducer.isAuthenSuccess){
      if(this.props.authenReducer.isAuthenSuccess){
        this.props.navigation.navigate('DrawerApp');
      }
    }

  }

  checkLogin(){
    this.props.actionAuthen.actionLoginUser(this.state.userName,this.state.passWord);
  }

  render() {
    return (
      <View style = {{
                        flex : 1,
                    }}
      >
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
                                                <Text_Custom content = {'Cafe của bạn'}
                                                />
                                             </View>
                                            
                                    </View>

                                    {/* Input user Name & Pass word  */}
                                    <View style = {{
                                                      paddingHorizontal : constants.PADDING_DEFAULT_APP
                                                  }}
                                    >
                                          <Text_Input textHolder = {'Nhập User, số điện thoại'}
                                                      onChangeText = {this.changeUserName}
                                                      value = {this.state.userName}
                                          />

                                          <View style = {{
                                                            marginTop : constants.MARGIN_DEFAULT_APP * 2
                                                        }}
                                          >
                                              <Text_Input textHolder = {'Nhập Password'}
                                                          onChangeText = {this.changePassWord}
                                                          secure = {true}
                                                          value = {this.state.passWord}
                                              />
                                          </View>
                                    </View>

                                    {/* Button Login & Register */}
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
                                                      onPress = {this.checkLogin}
                                    >
                                          <Text_Custom  content = {'Đăng nhập'}
                                                        style = {{
                                                                    color : constants.BACKGROUND_TURQUOISE,
                                                                    fontSize:  15,
                                                                }}
                                          />
                                    </TouchableOpacity>

                                    <TouchableOpacity style = {{
                                                                 marginTop : constants.MARGIN_DEFAULT_APP * 2
                                                              }}
                                                      onPress = {()=>{this.props.navigation.navigate('Register')}}
                                    >
                                          <Text_Custom  content = {'Đăng kí'}
                                                        style = {{
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
        actionAuthen        : bindActionCreators(actionAuthen,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

