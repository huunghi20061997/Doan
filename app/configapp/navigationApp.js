import {createStackNavigator,createAppContainer} from 'react-navigation';
import Splash from '../../app/src/container/Splash/index';
import Login from '../../app/src/container/Login/index';
import Register from '../../app/src/container/Register/index';

const AppStackNav = createStackNavigator({
    Splash : {
        screen : Splash
    },
    Login : {
        screen  : Login
    },
    Register : {
        screen  : Register
    }
    },{
        initialRouteName : 'Login',
        headerMode : 'none'
    })

const AppContainer = createAppContainer(AppStackNav)
export {AppContainer}