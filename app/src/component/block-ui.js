import React, { Component } from 'react';
import { View, Text,SafeAreaView,Modal } from 'react-native';
import BlockUIManager from "./block-ui-manager";
import {
    BallIndicator,
    UIActivityIndicator
} from 'react-native-indicators';
import * as constants from '../../configapp/constants';


export class BlockUI extends Component {
  constructor(props) {
    super(props);
    this._showBlockUI = this._showBlockUI.bind(this);
    this._hideBlockUI = this._hideBlockUI.bind(this);
    this.state = {
        isWaitingForSomething: false,
    };
  }

  _showBlockUI() {
    this.setState({
        isWaitingForSomething: true
    });
}

_hideBlockUI(){
    this.setState({
        isWaitingForSomething: false
    });
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
                    visible={ this.state.isWaitingForSomething }
                    animationType="none"
        >
                <View   style = {{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: constants.BLACK_COLOR_OPACITY_70
                                }}
                >
                        <UIActivityIndicator 
                                    size={ 30 }
                                    color= { constants.GRAY_COLOR }
                        />
                </View>
        </Modal>
    );
  }
}


export function showBlockUI() {
    const ref = BlockUIManager.getDefault();
    ref._showBlockUI();
}

export function hideBlockUI() {
    ref._hideBlockUI();
}
