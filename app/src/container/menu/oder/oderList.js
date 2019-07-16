import React, { Component } from 'react';
import { View, Text,SafeAreaView,FlatList,ImageBackground,TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as actionOder from './action';
import * as constants from '../../../../configapp/constants';
import Text_Custom from '../../../component/text_custom';
import {showBlockUI,hideBlockUI} from '../../../component/block-ui';
import OderProduct from '../../../component/oder_product';

class OderList extends Component {

  

  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderItemProduct = this.renderItemProduct.bind(this);
  }

  


  renderItemProduct = ({item}) => {
    return(
      <View   style = {{
                          padding : 5,
                          marginTop : 10,
                          flexDirection : 'row',
                          borderRadius : 6,
                          backgroundColor : 'white'
                      }}
      >
              <View style = {{
                                height : 70,
                                width : 70,
                                borderRadius : 6,
                            }}
              >
                    <ImageBackground  source = {{uri : item.path_image}}
                                      style = {{
                                                  height : 70,
                                                  width : 70,
                                              }}
                                      borderRadius = {6}
                    />
              </View>

              <View style = {{
                                  flex : 1,
                                  marginLeft : 10,
                            }}
              >
                    <Text_Custom  content = {item.name}
                                  style = {{
                                              fontSize: 15,
                                              color : 'gray',
                                          }}
                                  styleView = {{
                                                  justifyContent : 'flex-start',
                                                  alignItems : 'center',
                                              }}
                    />

                    <Text_Custom  content = {item.price + '.000đ'}
                                  style = {{
                                              fontSize: 12,
                                              color : 'silver',
                                              marginTop: 5,
                                          }}
                                  styleView = {{
                                                  justifyContent : 'flex-start',
                                                  alignItems : 'flex-start',
                                              }}
                    />
                    
                    <TouchableOpacity style = {{
                                                  width : '100%',
                                                  justifyContent : 'center',
                                                  alignItems : 'flex-end',
                                              }}
                                      onPress = {()=>{
                                        this.props.actionOder.add_product_oder(item);
                                      }}
                    >
                          <Text_Custom  content = {'Đặt ngay'}
                                        style = {{
                                                    fontSize: 12,
                                                    color : constants.BACKGROUND_GREEN,
                                                }}
                                        styleView = {{
                                                        backgroundColor : constants.BACKGROUND_GREEN_OPACITY,
                                                        padding: 5,
                                                        width : '30%',
                                                        borderRadius: 6,
                                                    }}
                                        childrenComponent = {true}
                          >
                              <Icon name = {'plus-circle'}
                                    size = {10}
                                    color = {constants.BACKGROUND_GREEN}
                                    solid = {true}
                              />
                          </Text_Custom>
                    </TouchableOpacity>
              </View>
      </View>
    )
  }

  componentDidMount(){
    this.props.actionOder.getListProduct();
  }

  render() {
    let props = this.props ; 
    return (
      <SafeAreaView style = {{
                                flex : 1,
                                backgroundColor : constants.BACKGROUND_BELOW_APP
                            }}
      >
                    {/* Loading Data */}
                    {
                    props.isReducerGetList.isGetingList &&
                        <View style = {{
                                          flex : 1,
                                          justifyContent : 'center',
                                          alignItems : 'center'
                                      }}
                        >
                              <Text_Custom  content = {'Đang tải danh sách...'}
                              />
                        </View>
                    }

                    {/* Loading Success */}
                    {
                    props.isReducerGetList.isGetListSuccess &&
                        <View style = {{
                                          flex : 1,
                                      }}
                        >
                              <View style = {{
                                                flex : 0.7,
                                                paddingHorizontal : 10
                                          }}
                              >
                                  <FlatList style = {{
                                                        flex : 1,
                                                    }}
                                            renderItem =  {this.renderItemProduct}
                                            data = {props.isReducerGetList.isListProduct}
                                  />
                            </View>
                            
                            <View style = {{
                                                flex : 0.3,
                                          }}
                            >
                                  <OderProduct
                                  />
                            </View>
                        </View>
                    }

                   
      </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(OderList);
