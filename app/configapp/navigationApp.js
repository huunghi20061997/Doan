import React, { Component } from 'react';
import {
        createStackNavigator,createMaterialTopTabNavigator,
        createAppContainer,createDrawerNavigator
    } from 'react-navigation';

import * as constants from '../configapp/constants';


import Splash from '../../app/src/container/Splash/index';
import Login from '../../app/src/container/Login/index';
import Register from '../../app/src/container/Register/index';

import MenuApp from '../src/container/menu/index';
import DrawerComponent from '../src/component/drawer_component';
import HeaderApp from '../src/component/header_component';
import TabTopOrder from '../src/component/tabTopOder';
import LoginWifi from '../src/container/menu/LoginWifi/index';
import OderList from '../src/container/menu/oder/oderList';
import OderQRCode from '../src/container/menu/oder/oderQRCode';


const TabTopOderApp = createMaterialTopTabNavigator({
    OderList : {
        screen : OderList,
    },
    OderQRCode : {
        screen : OderQRCode,
    }
},{
    initialRouteName : 'OderList',
    lazy : true,
    tabBarComponent : (props) => <TabTopOrder {...props}/>,
    tabBarOptions: {
        activeTintColor: "#4F4F4F",
        inactiveTintColor: "#ddd"
      },
})

const DrawerApp = createDrawerNavigator({
    Home : {
        screen : MenuApp
    },
    LoginWifi : {
        screen : LoginWifi
    },
    TabTopOderApp : {
        screen : TabTopOderApp
    }
},{
        initialRouteName : 'Home',
        drawerWidth : constants.WIDTH_SCREEN * 0.7,
        navigationOptions : (navigation)=>({
            header : <HeaderApp {...navigation}/>
        }),
        contentComponent : (props) => (
            <DrawerComponent {...props}/>
        )
})



const AppStackNav = createStackNavigator({
    Splash : {
        screen : Splash
    },
    Login : {
        screen  : Login
    },
    Register : {
        screen  : Register
    },
    DrawerApp : {
        screen : DrawerApp
    }
    },{
        initialRouteName : 'Login',
})



const AppContainer = createAppContainer(AppStackNav)



export {AppContainer}