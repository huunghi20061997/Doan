import React, { Component } from 'react';
import { View, Text,StyleSheet,TextInput } from 'react-native';
import * as constants from '../../configapp/constants';



export default class Text_Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {{
                        flex : 1,
                    }}
      >
            <View   style = {styleDefault.styleViewTextInput}
            >
                    <TextInput  placeholderTextColor = {constants.GRAY_COLOR}
                                style = {{
                                            flex : 1
                                        }}
                                value = {this.props.value}
                                placeholder = {this.props.textHolder ? this.props.textHolder : ''}
                                secureTextEntry = {this.props.secure ? this.props.secure : false}
                                onChangeText = {this.props.onChangeText}
                    />
            </View>
      </View>
    );
  }
}



const styleDefault = StyleSheet.create({
    style_Text : {
        fontSize: 12,
        color : 'black',
    },
    styleViewTextInput : {
        height : constants.HEIGHT_DEFAULT_TEXT_INPUT,
        borderRadius : constants.BODERADIUS_CIRCLE_APP,
        backgroundColor : constants.GRAY_COLOR_APP,
        paddingHorizontal : constants.PADDING_DEFAULT_APP,
        opacity : constants.OPACITY_COLOR,
    }
})

