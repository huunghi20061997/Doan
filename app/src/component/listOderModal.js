import React, { Component } from 'react';
import { View, Text,Modal,SafeAreaView,TouchableWithoutFeedback,FlatList,ImageBackground,TouchableOpacity} from 'react-native';
import * as constants from '../../configapp/constants';
import { bindActionCreators } from "redux";
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as actionOder from '../container/menu/oder/action';
import Text_Custom from '../../src/component/text_custom';
import { connect } from "react-redux";
import TextNotifi from '../component/textNotifi';

class ListOderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderItemListOder = this.renderItemListOder.bind(this);
  }

  renderItemListOder = ({item,index}) => {
    return(
            <View   style = {{
                                padding : 5,
                                marginTop : 10,
                                flexDirection : 'row',
                                backgroundColor : constants.BACKGROUND_PRIMARY_APP,
                                borderRadius : 6,
                                borderColor : constants.SILVER_COLOR,
                                borderWidth : 0.5
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
        <Text_Custom  content = {item.name + ' ('+item.number+') '}
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
                            this.props.actionOder.remove_product_oder(item);
                          }}
        >
              <Text_Custom  content = {'Hủy'}
                            style = {{
                                        fontSize: 12,
                                        color : constants.BACKGROUND_ORANGE,
                                    }}
                            styleView = {{
                                            backgroundColor : constants.BACKGROUND_ORANGE_OPACITY,
                                            padding: 5,
                                            width : '30%',
                                            borderRadius: 6,
                                        }}
                            childrenComponent = {true}
              >
                  <Icon name = {'minus-circle'}
                        size = {10}
                        color = {constants.BACKGROUND_ORANGE}
                        solid = {true}
                  />
              </Text_Custom>
        </TouchableOpacity>
      </View>
            </View>
    )
  }

  render() {
    const isReducerOder = this.props.isReducerOder;
    return (
      <Modal  visible = {this.props.visible}
              transparent = {true}
              animationType = {'slide'}
      >
            <View  style = {{
                                flex : 1,
                                backgroundColor :  constants.BACKGROUND_MODAL_APP
                            }}
              >

                    <TouchableWithoutFeedback
                                                onPress = {this.props.onPressShowHideModal}
                    >
                    <View style = {{
                                      flex : 0.3
                                  }}
                    />
                    </TouchableWithoutFeedback>

                    <View style = {{
                                      flex : 0.7,
                                      backgroundColor : constants.BACKGROUND_BELOW_APP,
                                      borderTopLeftRadius : 30,
                                      borderTopRightRadius : 30,
                                  }}
                    >
                          <View style = {{
                                            height : 40,
                                            backgroundColor : constants.BACKGROUND_TURQUOISE,
                                            borderTopLeftRadius : 30,
                                            borderTopRightRadius : 30,
                                            borderBottomColor : constants.SILVER_COLOR,
                                            borderBottomWidth : constants.OPACITY_COLOR
                                        }}
                          >
                                <Text_Custom  content = {'Sản phẩm đã đặt'}
                                              style = {{
                                                          color : 'white',
                                                          fontWeight : 'bold',
                                                          fontSize: constants.SIZE_TEXT_MEDIUM,
                                                      }}
                                />
                          </View>

                          <View style = {{
                                            flex : 1,
                                            marginTop : 10,
                                            paddingHorizontal : 10,
                                        }}
                          >
                                {
                                    isReducerOder.isListOder.length > 0 ?
                                        <FlatList style = {{
                                                              flex : 1,
                                                              backgroundColor : constants.BACKGROUND_BELOW_APP
                                                          }}
                                                  data = {isReducerOder.isListOder}
                                                  renderItem = {this.renderItemListOder}
                                        />
                                    :
                                        <View style = {{
                                                          flex : 1,
                                                          justifyContent : 'center',
                                                          alignItems : 'center'
                                                      }}
                                        >
                                            <TextNotifi  content = {'Danh sách trống'}
                                            />
                                        </View>
                                }
                          </View>
                    </View>


              </View>
      </Modal>
    );
  }
}


function mapStateToProps(state) {
  return {
        isReducerOder        :    state.isReducerOder
  }
}

function mapDispatchToProps(dispatch) {
  return {
      actionOder           :       bindActionCreators(actionOder,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOderModal);