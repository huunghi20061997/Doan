import React, { Component } from 'react';
import { View, Text,Modal,ScrollView,TouchableOpacity } from 'react-native';
import * as constants from '../../configapp/constants';
import Text_Custom from '../component/text_custom';
import Text_Input from '../component/text_input';
class Modal_verify_code extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value_code : '',
    };
  }

  render() {
    return (
      <Modal    visible = {this.props.visible}
                transparent = {true}
      >
            <View   style = {{
                                flex : 1,
                                backgroundColor : constants.BLACK_COLOR_OPACITY_70,
                            }}
            >
                    <ScrollView style = {{
                                            flex : 1,
                                        }}
                    >
                                <View   style = {{
                                                    flex : 1,
                                                    height : constants.HEIGHT_SCREEN,
                                                    paddingHorizontal : 20,
                                                    justifyContent : 'center'
                                                }}
                                >
                                        <View   style = {{
                                                            padding : 10,
                                                            width : '100%',
                                                            height : null,
                                                            backgroundColor : 'white',
                                                            alignSelf : 'center',
                                                            borderRadius : 6,
                                                        }}
                                        >
                                                <View   style = {{
                                                                    height : 30,
                                                                    marginVertical : 20,
                                                                }}
                                                >
                                                        <Text_Custom    content = {'Nhập mã xác thực'}
                                                                        styleView = {{
                                                                                            justifyContent : 'center',
                                                                                            alignItems: 'center',
                                                                                    }}
                                                        />
                                                </View>

                                                <View   style = {{
                                                                    height : 40,
                                                                    width : '100%',
                                                                    borderRadius : 50,
                                                                }}
                                                >
                                                        <Text_Input onChangeText = {this.props.onChangeText}
                                                                    textHolder = {'Nhập mã đã nhận'}
                                                                    //value = {this.props.value}
                                                        />
                                                </View>

                                                <TouchableOpacity   style = {{
                                                                                height : 40,
                                                                                marginVertical : 20,
                                                                                justifyContent : 'center',
                                                                                alignItems : 'center',
                                                                                borderRadius : 50,
                                                                                width : '50%',
                                                                                alignSelf : 'center',
                                                                                backgroundColor : constants.BACKGROUND_ORANGE_OPACITY,
                                                                            }}
                                                                    onPress = {this.props.setvisibleVerifyCode}
                                                >
                                                                    <Text_Custom    content = {'Xác thực'}
                                                                                    style = {{
                                                                                                color : constants.BACKGROUND_ORANGE
                                                                                            }}
                                                                    />
                                                </TouchableOpacity>
                                        </View>
                                </View>
                    </ScrollView>
            </View>
      </Modal>
    );
  }
}

export default Modal_verify_code;
