import React, { Component } from 'react'
import { Text, View,ImageBackground,SafeAreaView } from 'react-native'
import { connect } from "react-redux";
import * as actionAuthen from './action';
import { bindActionCreators } from "redux";
import * as constants from '../../../configapp/constants';



class Splash extends Component {

    componentDidMount(){
        this.props.actionAuthen.actionAuthen();
    }



    render() {
        return (
            
            <SafeAreaView   style = {{
                                        flex : 1,
                                        justifyContent : 'center',
                                        alignItems : 'center',
                                        backgroundColor : constants.BACKGROUND_PRIMARY_APP
                                    }}
            >
                        <View   style = {{
                                                padding : 10,
                                                justifyContent : 'center',
                                                alignItems : 'center',
                                                borderRadius : constants.BODERADIUS_APP,
                                                borderColor : constants.SILVER_COLOR,
                                                borderWidth : constants.BODER_WIDTH_APP,
                                        }}
                        >
                            <ImageBackground    style = {{
                                                            height : 150,
                                                            width : 150,
                                                        }}
                                                resizeMode = {'cover'}
                                                source = {require('../../../resource/image/imageapp.jpg')}
                            />
                        </View>
                        
            </SafeAreaView>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
