import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionOder from '../container/menu/oder/action';
import * as constants from '../../configapp/constants';
import Text_Custom from '../component/text_custom';
import Icon from 'react-native-vector-icons/FontAwesome5';


class OderProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {{
                        flex : 1,
                        marginHorizontal : 10,
                        borderRadius : 6,
                        padding : 10,
                        backgroundColor : constants.BACKGROUND_PRIMARY_APP
                    }}
      >
        <Text_Custom    content = {'Tổng tiền'}
                        style = {{
                                    color : constants.GRAY_COLOR,
                                    fontWeight : 'bold'
                                }}
                        styleView = {{
                                        justifyContent : 'flex-start',
                                        alignItems : 'center',
                                    }}
        />
        <View   style = {{
                            flex : 1,
                            padding : 10,
                        }}
        >
                <View   style = {{
                                    flex : 1,
                                    alignItems : 'center',
                                    flexDirection : 'row',
                                    borderRadius : 6,
                                    paddingHorizontal : 10,
                                    backgroundColor : constants.BACKGROUND_ITEM_APP
                                }}
                >
                        <View   style = {{
                                            flex : 1,
                                            justifyContent : 'center',
                                            alignItems : 'flex-start',
                                        }}
                        >
                                <Text_Custom    content = {'10.000đ'}
                                                style = {{
                                                            color : constants.GRAY_COLOR
                                                        }}
                                />
                        </View>

                        <Icon   name = {'clipboard-list'}
                                size = {15}
                                style = {{
                                            alignSelf : 'center'
                                        }}
                                color = {constants.GRAY_COLOR}
                        />
                </View>
        </View>

        <View   style = {{
                            flex : 1,
                            alignItems : 'center',
                            justifyContent : 'center',
                        }}
        >
                <Text_Custom    content = {'Thanh toán'}
                                style = {{
                                            color : constants.BACKGROUND_ORANGE
                                        }}
                                styleView = {{
                                                backgroundColor : constants.BACKGROUND_ORANGE_OPACITY,
                                                width : '50%',
                                                alignSelf : 'center',
                                                borderRadius : 50,
                                                marginVertical: 10,
                                            }}
                />
        </View>
        
      </View>
    );
  }
}

function mapStateToProps(state) {
    return {
      isReducerGetList        :    state.isReducerGetList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionOder           :       bindActionCreators(actionOder,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OderProduct);

