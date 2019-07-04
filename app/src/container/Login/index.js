import React, { Component } from 'react';
import  {   Text, View,ImageBackground,
            SafeAreaView,ScrollView
        } from 'react-native'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionAuthen from './action';
import * as constants from '../../../configapp/constants';
import Text_Custom from '../../component/text_custom';
import Text_Input from '../../component/text_input';
import {showBlockUI,hideBlockUI} from '../../component/block-ui';

class Login extends Component {
  constructor(props) {
    super(props);

    this.changeUserName = this.changeUserName.bind(this);
    this.changePassWord = this.changePassWord.bind(this);

    this.state = {
      userName : '',
      passWord : '',
    };
  }

  componentDidMount(){
    showBlockUI();
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
                                          />

                                          <View style = {{
                                                            marginTop : constants.MARGIN_DEFAULT_APP * 2
                                                        }}
                                          >
                                              <Text_Input textHolder = {'Nhập Password'}
                                                          onChangeText = {this.changePassWord}
                                                          secure = {true}
                                              />
                                          </View>
                                    </View>

                                    {/* Button Login & Register */}
                                    <View style = {{
                                                      marginTop : constants.MARGIN_DEFAULT_APP * 2,
                                                      justifyContent : 'center',
                                                      alignItems : 'center',
                                                      height : constants.HEIGHT_DEFAULT_TEXT_INPUT,
                                                      borderRadius : constants.BODERADIUS_CIRCLE_APP,
                                                      width : '50%',
                                                      alignSelf : 'center',
                                                      backgroundColor : constants.BACKGROUND_TURQUOISE_OPACITY
                                                  }}
                                    >
                                          <Text_Custom  content = {'Đăng nhập'}
                                                        style = {{
                                                                    color : constants.BACKGROUND_TURQUOISE,
                                                                    fontSize:  15,
                                                                }}
                                          />
                                    </View>

                                    <View style = {{
                                                        marginTop : constants.MARGIN_DEFAULT_APP * 2
                                                  }}
                                    >
                                          <Text_Custom  content = {'Đăng kí'}
                                                        style = {{
                                                                    fontSize:  15,
                                                                }}
                                          />
                                    </View>
                    
                    
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

