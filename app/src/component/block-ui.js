import React, { Component } from 'react';
import { View, Text,SafeAreaView,Modal,TouchableOpacity } from 'react-native';
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
    this.actionSubmit = null ; 
    this.state = {
        isLoading : false,
        isSuccess : false,
        isError : false, 
        description : '',
        showButtonSubmit : false,
        showButtonCancle : false,
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

_hideBlockUI(result,description,showButtonSubmit,actionSubmit,showButtonCancle){
    
    let Result = false ; 
    if(result == constants.RESULT_BLOCK_SUCCESS){
        this.setState({
            isSuccess : true,
            isError : false, 
            description : description
        });
    }else{
        this.setState({
            isSuccess : false,
            isError : true, 
            description : description, 
        });
    }
    if(showButtonSubmit){
        if(actionSubmit !== null) this.actionSubmit = actionSubmit ; 
        this.setState({
            showButtonSubmit : showButtonSubmit,
            showButtonCancle : showButtonCancle
        });
    }else{
        setTimeout(()=>{
            this.setState({
                isLoading: false,
            })
        },2000);
    }
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
                                                                            this.state.description
                                                                    }
                                        />
                                        {
                                                this.state.showButtonSubmit &&
                                                    <View   style = {{
                                                                marginTop : 10,
                                                                height : 30,
                                                                width : '100%',
                                                                flexDirection : 'row',
                                                            }}
                                                    >
                                                            <TouchableOpacity   style = {{
                                                                                    flex : this.state.showButtonCancle ? 0.5 : 1,
                                                                                    justifyContent : 'center',
                                                                                    borderRadius : 6,
                                                                                    backgroundColor : constants.BACKGROUND_ITEM_APP,
                                                                                    alignItems : 'center',
                                                                                    marginRight : this.state.showButtonCancle ? 10 : 0,
                                                                                }}
                                                                        onPress = {()=> {
                                                                                            this.setState({
                                                                                                            isLoading : false
                                                                                                        },()=>{
                                                                                                            if(this.props.actionSubmit){
                                                                                                                this.props.actionSubmit();
                                                                                                            }
                                                                                                        });
                                                                                        }}
                                                    >
                                                                        <Text_Custom content = {'OK'}
                                                                        />
                                                    </TouchableOpacity>
                                                            
                                                            {
                                                            this.state.showButtonCancle &&
                                                                    <TouchableOpacity   style = {{
                                                                                                    flex : 0.5,
                                                                                                    justifyContent : 'center',
                                                                                                    alignItems : 'center',
                                                                                                    backgroundColor : constants.BACKGROUND_ITEM_APP,
                                                                                                    borderRadius : 6,
                                                                                                    marginLeft : 10,
                                                                                                }}
                                                                                        onPress = {()=> {
                                                                                                            this.setState({
                                                                                                                            isLoading : false
                                                                                                                        });
                                                                                                        }}
                                                                    >
                                                                                        <Text_Custom content = {'Cancle'}
                                                                                        />
                                                                    </TouchableOpacity>
                                                            }
                                                    </View>
                                        }
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

export function hideBlockUI(result,description = '',showButtonSubmit = false,actionSubmit = null,showButtonCancle = false) {
    const ref = BlockUIManager.getDefault();
    ref._hideBlockUI(result,description,showButtonSubmit,actionSubmit,showButtonCancle);
}
