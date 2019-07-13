import React, { Component } from 'react'
import { Text, View,TouchableOpacity } from 'react-native'
import * as constants from '../../configapp/constants';

export default class TabTopOrder extends Component {

  getNameTab(name){
    if(name == 'OderList') return 'Đặt thường';
    if(name == 'OderQRCode') return 'Đặt qua QR';
    return '';
  }

  render() {
    const {
        renderIcon,
        getLabelText,
        activeTintColor,
        inactiveTintColor,
        onTabPress,
        onTabLongPress,
        getAccessibilityLabel,
        navigation
      } = this.props;
      
      const { routes, index: activeRouteIndex } = navigation.state;
    return (
      <View style = {{
                            height : 50,
                            width : constants.WIDTH_SCREEN,
                            backgroundColor : 'white',
                            flexDirection : 'row'
                    }}
      >
            {
                routes.map((route, routeIndex) => {
                    const isRouteActive = routeIndex === activeRouteIndex;
                    const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
                    return(
                        <TouchableOpacity   style = {{
                                                        flex : 1,
                                                        justifyContent : 'center',
                                                        alignItems : 'center',
                                                        borderBottomColor : constants.BACKGROUND_TURQUOISE,
                                                        borderBottomWidth : isRouteActive ? 2 : 0
                                                    }}
                                            key = {routeIndex}
                                            onPress = {()=>{
                                                onTabPress({route});
                                            }}
                        >
                                            <Text   style = {{
                                                                    color : tintColor,
                                                                    fontSize : isRouteActive ? 15 : 12
                                                            }}
                                            >{this.getNameTab(getLabelText({route}))}</Text>
                        </TouchableOpacity>
                        
                    );
                })
            }
        
      </View>
    )
  }
}