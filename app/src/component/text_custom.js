import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';



export default class Text_Custom extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let styleView = this.props.styleView ? this.props.styleView  : {};
    return (
      <View style = {[{
                        flex : 1,
                        justifyContent : 'center',
                        alignItems : 'center',
                        flexDirection : 'row',
                      },styleView]}
      >
            {
              this.props.childrenComponent &&
                <View style = {{
                                  marginRight : 10,
                              }}
                >
                  {this.props.children}
                </View>
            }
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
        textAlign : 'center'
    }
})

