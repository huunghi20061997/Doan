import React, { Component } from 'react';
import { View, Text,SafeAreaView,Modal } from 'react-native';
import BlockUIManager from "./block-ui-manager";
import {
    BallIndicator,
    UIActivityIndicator
} from 'react-native-indicators';
import * as constants from '../../configapp/constants';
import Text_Custom from '../component/text_custom';



export class BlockUI extends Component {
  constructor(props) {
    super(props);
    this._showBlockUI = this._showBlockUI.bind(this);
    this._hideBlockUI = this._hideBlockUI.bind(this);
    this.state = {
        isLoading : false,
        isSuccess : false,
        isError : false, 
        description : ''
    };
  }

  _showBlockUI() {
    this.setState({
        isLoading: true,
        isSuccess : false,
        isError : false, 
        description : ''
    });
}

_hideBlockUI(result,description){
    
    let Result = false ; 
    if(result == constants.RESULT_BLOCK_SUCCESS){
        this.setState({
            isSuccess : true,
            isError : false, 
            description : ''
        });
    }else{
        this.setState({
            isSuccess : false,
            isError : true, 
            description : description, 
        });
    }
    setTimeout(()=>{
        this.setState({
            isLoading: false,
        })
    },2000);
}

componentDidMount() {
    BlockUIManager.register(
        this
    );
}
componentWillUnmount() {
    BlockUIManager.unregister(
        this
    );
}


  render() {
    return (
        <Modal
                    onRequestClose={
                        () => {
                            return;
                        }
                    }
                    transparent={ true }
                    visible={ this.state.isLoading }
                    animationType="none"
        >
                <View   style = {{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: constants.BLACK_COLOR_OPACITY_70
                                }}
                >
                        {/* <UIActivityIndicator 
                                    size={ 30 }
                                    color= { constants.GRAY_COLOR }
                        /> */}
                        <View   style = {{
                                            position : 'absolute',
                                            bottom : 50,
                                            padding : 30,
                                            borderRadius : 6,
                                            width : '90%',
                                            backgroundColor : 'white',
                                            flexDirection : 'row',

                                        }}
                        >
                                <View   style = {{
                                                    flex : 1,
                                                    alignItems : 'center',
                                                    justifyContent :'center'
                                                }}
                                >
                                        <Text_Custom    content =   {
                                                                        this.state.isLoading && (this.state.isSuccess == this.state.isError) ? 
                                                                            'Đang xử lí'
                                                                        :
                                                                            this.state.isSuccess ?
                                                                                'Thành công'
                                                                            :
                                                                                this.state.description
                                                                    }
                                        />
                                </View>
                        </View>
                </View>
        </Modal>
    );
  }
}


export function showBlockUI() {
    const ref = BlockUIManager.getDefault();
    ref._showBlockUI();
}

export function hideBlockUI(result,description = '') {
    const ref = BlockUIManager.getDefault();
    ref._hideBlockUI(result,description);
}
