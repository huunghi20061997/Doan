import {AppContainer} from './configapp/navigationApp';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Provider} from 'react-redux';
import {store} from './configapp/storeApp';
import {BlockUI} from './src/component/block-ui';
console.disableYellowBox = true;

class IndexApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Provider store = {store}
        >
            <BlockUI/>
            <AppContainer/>
        </Provider>
    );
  }
}

export default IndexApp ;