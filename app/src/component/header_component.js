import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as constants from '../../configapp/constants';
import { DrawerActions } from 'react-navigation-drawer';
import {NavigationActions} from 'react-navigation';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';



export default class HeaderApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getNameHeader(){
      switch(this.props.navigation.state.index)
      {
          case 0 : return 'Trang chủ' ; break ; 
          case 1 : return 'Đăng nhập wifi' ; break ;
          case 2 : return 'Đặt nước' ; break ;
          case 3 : return 'Thanh toán' ; break ;
          case 4 : return 'Lịch sử' ; break ;
          case 5 : return 'Khuyến mãi' ; break ;
          case 6 : return 'Gần nhất' ; break ;
          default : return 'Header' ; break ;
      }
  }

  render() {
    let index = this.props.navigation.state.index; 
    return (
        <Header style = {{
                            backgroundColor : constants.BACKGROUND_PRIMARY_APP,
                            borderBottomWidth  :  0
                        }}
        >
            <Left>
                <Button transparent
                        onPress = {()=>{
                            if(index == 0)
                                this.props.navigation.dispatch(DrawerActions.toggleDrawer());
                            else
                                this.props.navigation.dispatch(NavigationActions.navigate({routeName : 'Home'}));
                        }}
                >
                    <Icon   name={index == 0 ?  'menu' : 'arrow-round-back'}
                            style = {{
                                        color : constants.GRAY_COLOR
                                    }}
                    />
                </Button>
            </Left>

            <Body style =   {{
                                flex : 1,
                                width : '100%',
                                justifyContent : 'center',
                                alignItems : 'center',
                            }}
            >
                <Title  style = {{ 
                                    color : 'black',
                                    alignSelf : 'center',
                                    fontSize : 12,
                                }}
                >
                        {this.getNameHeader()}
                </Title>
            </Body>
            <Right/>
        </Header>
    );
  }
}
