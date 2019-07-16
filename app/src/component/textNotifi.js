import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Text_Custom from '../../src/component/text_custom';
import * as constants from '../../configapp/constants';

export default class TextNotifi extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {{
                        height : 40,
                        backgroundColor :   constants.BACKGROUND_MODAL_APP,
                        borderRadius : 50,
                        alignSelf : 'center',
                        paddingHorizontal : 40,
                        
                    }}
      >
            <Text_Custom    content = {this.props.content}
                            style = {{
                                        color : constants.BACKGROUND_PRIMARY_APP
                                    }}
                            styleView = {{
                                            borderRadius : 50,
                                        }}
            />
      </View>
    );
  }
}
