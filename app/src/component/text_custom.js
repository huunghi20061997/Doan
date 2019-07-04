import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';



export default class Text_Custom extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {{
                        flex : 1,
                        justifyContent : 'center',
                        alignItems : 'center',
                    }}
      >
            <Text   style = {this.props.style ? [styleDefault.style_Text,this.props.style] : styleDefault.style_Text}
            >
                {this.props.content}
            </Text>
      </View>
    );
  }
}



const styleDefault = StyleSheet.create({
    style_Text : {
        fontSize: 12,
        color : 'black',
    }
})

