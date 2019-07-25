import React, { Component } from 'react';
import { View, Text,TextInput,TouchableOpacity,SafeAreaView,ScrollView } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionOder from '../container/menu/oder/action';
import * as constants from '../../configapp/constants';
import Text_Custom from '../component/text_custom';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ListOderModal from '../../src/component/listOderModal';

const NUMBER_TABLE_DEFAULT = 0 ; 
const SHOP_DEFAULT = 0 ; 


class OderProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalListOder : false, 
      numberTable : NUMBER_TABLE_DEFAULT,
      id_shop : '',
      id_table : '',
    };
    this.setIdShop = this.setIdShop.bind(this);
    this.submitOder = this.submitOder.bind(this);
    this.showHideModalListOder = this.showHideModalListOder.bind(this);

  }

  getPrice(){
    const listData = this.props.isReducerOder.isListOder ; 
    if(listData.length > 0) {
      let priceTotal = 0 ; 
      listData.forEach(currentItem => {
        priceTotal += (currentItem.price * currentItem.number) ;
      })
      return priceTotal + constants.STRING_PRICE ; 
    }else {
      return '0đ'
    }
  }

  showHideModalListOder(){
    this.setState({
      modalListOder : !this.state.modalListOder, 
    });
  }

  submitOder(){
    const {id_shop,id_table} = this.state;
    this.props.actionOder.oder_product(id_shop,id_table);
  }

  setIdShop = (text) => {
      this.setState({
        id_shop : text
      },()=>{
        if(this.state.id_shop.length > 3){
          const numberId = Number(this.state.id_shop);
          this.props.actionOder.getListProduct(numberId);
        }
      })
  }

  setTableOder = (idTable)=>{
    this.setState({
      id_table :idTable,
    })
  }

  render() {
    const price = this.getPrice();
    return (
            <View style = {{
                              flex : 1,
                              marginHorizontal : 10,
                              borderRadius : 6,
                              padding : 10,
                              backgroundColor : constants.BACKGROUND_PRIMARY_APP
                          }}
            >

              {/* Modal List Product Odered */}
              <ListOderModal  visible = {this.state.modalListOder}
                              onPressShowHideModal = {this.showHideModalListOder}
              />


              <View style = {{
                                flexDirection : 'row',
                                paddingVertical : 10,
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
                                                  flex : !this.props.OderQR ? 0.5 : 1,
                                              }}
                  />

                  {
                      <View style = {{
                                        backgroundColor : !this.props.OderQR ? constants.BACKGROUND_ITEM_APP : 'transparent',
                                        borderRadius : 50,
                                        flex : 0.5,
                                        marginRight : 10,
                                        height : '100%'
                                    }}
                      >
                            {
                              !this.props.OderQR &&
                              <TextInput  
                                          placeholder = {'Nhập mã shop'}
                                          placeholderTextColor = {constants.GRAY_COLOR}
                                          onChangeText = {this.setIdShop}
                                          style = {{
                                                      paddingHorizontal: 10,
                                                  }}
                              />
                            }
                      </View>
                  }
              </View>
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
                                      <Text_Custom    content = {price}
                                                      style = {{
                                                                  color : constants.GRAY_COLOR
                                                              }}
                                      />
                              </View>

                              <Icon   name = {'clipboard-list'}
                                      size = {15}
                                      onPress = {this.showHideModalListOder}
                                      style = {{
                                                  alignSelf : 'center'
                                              }}
                                      color = {constants.GRAY_COLOR}
                              />
                      </View>
              </View>

              <View   style = {{
                                  flex : 1,
                                  flexDirection : 'row'
                              }}
              >
                      {/* <Text_Custom    content = {this.state.numberTable == 0 ? 'Chọn bàn' : this.state.numberTable}
                                      style = {{
                                                  color : constants.BACKGROUND_GREEN
                                              }}
                                      styleView = {{
                                                      backgroundColor : constants.BACKGROUND_GREEN_OPACITY,
                                                      flex : 0.5,
                                                      height : '70%',
                                                      alignSelf : 'center',
                                                      borderRadius : 50,
                                                      marginRight: 10,
                                                  }}
                      /> */}
                      {
                      !this.props.OderQR &&
                      <View
                              style = {{
                                              backgroundColor : constants.BACKGROUND_GREEN_OPACITY,
                                              flex : 0.5,
                                              height : '70%',
                                              alignSelf : 'center',
                                              borderRadius : 50,
                                              marginRight: 10,
                                          }}
                      
                      >
                              <TextInput  
                                          placeholder = {'Nhập số bàn'}
                                          style = {{
                                                      flex : 1,
                                                      marginHorizontal : 10,
                                                  }}
                                          placeholderTextColor = {constants.BACKGROUND_GREEN}
                                          onChangeText = {this.setIdShop}
                              />
                            
                      </View>
                      }

                      <TouchableOpacity onPress={this.submitOder}
                                        style = {{
                                                    backgroundColor : constants.BACKGROUND_ORANGE_OPACITY,
                                                    flex : !this.props.OderQR ? 0.5 : 1,
                                                    alignSelf : 'center',
                                                    borderRadius : 50,
                                                    height : '70%',
                                                    marginHorizontal: !this.props.OderQR ? 0 : 20,
                                                }}
                      >
                          <Text_Custom    content = {'Thanh toán'}
                                          style = {{
                                                      color : constants.BACKGROUND_ORANGE
                                                  }}
                          />
                      </TouchableOpacity>
              </View>
              
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(OderProduct);

