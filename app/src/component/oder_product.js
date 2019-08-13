import React, { Component } from 'react';
import { View, Text,TextInput,TouchableOpacity,SafeAreaView,ScrollView,StyleSheet } from 'react-native';
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
      checkSubmit : false,
    };
    this.setIdShop = this.setIdShop.bind(this);
    this.submitOder = this.submitOder.bind(this);
    this.showHideModalListOder = this.showHideModalListOder.bind(this);
    this.checkOrder = this.checkOrder.bind(this);
  }

  getPrice(){
    const listData = this.props.isReducerOder.isListOder ;
    let priceTotal = 0 ;
    if(listData.length > 0) {
      listData.forEach(currentItem => {
        priceTotal += (currentItem.price * currentItem.number) ;
      }); 
    }
    return priceTotal;
  }

  

  checkOrder(){
    if(this.props.OderQR){
      if(this.props.isReducerOder.isListOder.length > 0) return true ;
      else return false ; 

    }else{
      if(this.state.id_shop.length >= constants.LENGHT_ID_DEFAULT && this.state.id_table.length > 0)
        return true ;
      else return false
    }
  }

  showHideModalListOder(){
    this.setState({
      modalListOder : !this.state.modalListOder, 
    });
  }

  componentDidUpdate(prevProps,prevSate){
  }

  submitOder(){
    const {id_shop,id_table} = this.state;
    let numberIdShop = 0;
    let numberIdTable = 0;
    if(this.props.OderQR){
      numberIdShop  = this.props.isReducerOder.isListOder[0].id_shop;
      numberIdTable = this.props.isReducerOder.isListOder[0].id_table;
    }else{
      numberIdShop = Number(id_shop);
      numberIdTable = Number(id_table);
    }
    this.props.actionOder.oder_product(numberIdShop,numberIdTable);
  }

  setIdShop = (text) => {
      this.setState({
        id_shop : text
      },()=>{
        if(this.state.id_shop.length >= constants.LENGHT_ID_DEFAULT){
            this.setState ({
                            checkSubmit : this.state.id_table.length > 0 ? true : false
                          })
          const numberId = Number(this.state.id_shop);
          this.props.actionOder.getListProduct(numberId);
        }
      });
  }

  setTableOder = (idTable)=>{
    this.setState({
      id_table :idTable,
    },()=>{
      if(this.state.id_table.length > 0){
          this.setState ({
                          checkSubmit : this.state.id_shop.length >= constants.LENGHT_ID_DEFAULT ? true : false
                        })
      }
    });
  }

  render() {
    const numberPrice = this.getPrice() ; 
    const price = numberPrice + ( numberPrice > 0 ? constants.STRING_PRICE : 'đ');
    const canOrder = this.checkOrder();
    return (
            <View style = {styles.container}
            >

              {/* Modal List Product Odered */}
              <ListOderModal  visible = {this.state.modalListOder}
                              onPressShowHideModal = {this.showHideModalListOder}
              />


              <View style = {{
                                flexDirection : 'row',
                            }}
              >
                  <Text_Custom    content = {'Tổng tiền'}
                                  style = {{
                                              color : constants.GRAY_COLOR,
                                              fontWeight : 'bold',
                                              
                                          }}
                                  styleView = {{
                                                  justifyContent : 'flex-start',
                                                  alignItems : 'center',
                                                  marginVertical: 15,
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
                                                      flex : 1,
                                                  }}
                              />
                            }
                      </View>
                  }
              </View>
              <View   style = {{
                                  flex : 1,
                                  paddingVertical : 15,
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
                                          
                                          onChangeText = {this.setTableOder}
                              />
                            
                      </View>
                      }

                      <TouchableOpacity onPress={this.submitOder}
                                        style = {{
                                                    backgroundColor : canOrder ? constants.BACKGROUND_ORANGE_OPACITY : constants.BACKGROUND_ITEM_APP ,
                                                    flex : !this.props.OderQR ? 0.5 : 1,
                                                    alignSelf : 'center',
                                                    borderRadius : 50,
                                                    height : '70%',
                                                    marginHorizontal: !this.props.OderQR ? 0 : 20,
                                                }}
                                        disabled =  { canOrder ? false : true}
                      >
                          <Text_Custom    content = {'Thanh toán'}
                                          style = {{
                                                      color : canOrder ? constants.BACKGROUND_ORANGE : constants.GRAY_COLOR
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

const styles = StyleSheet.create({
  container : {
    shadowColor: "#000",
    shadowOffset: {
                    width: 0,
                    height: 1,
                  },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flex : 1,
    marginHorizontal : 10,
    borderRadius : 6,
    padding : 10,
    backgroundColor : constants.BACKGROUND_PRIMARY_APP
  }
})