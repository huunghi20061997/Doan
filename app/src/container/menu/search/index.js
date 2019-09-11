import React, { Component } from 'react';
import  {   Text, View,ImageBackground,Alert,FlatList,
    SafeAreaView,ScrollView,TouchableOpacity,Modal
} from 'react-native';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionSearch from './action';
import * as constants from '../../../../configapp/constants';
import Text_Custom from '../../../component/text_custom';
import Text_Input from '../../../component/text_input';
import {showBlockUI,hideBlockUI} from '../../../component/block-ui';
import * as Firebase from '../../../../configapp/configfirebase';


class ItemProvinceDistrict extends Component {
    render() {
        return (
            <TouchableOpacity   style = {{
                                            width : '100%',
                                            height : 40,
                                            borderBottomWidth : 0.5,
                                            borderBottomColor : 'silver',
                                            justifyContent : 'center',
                                            alignItems : 'center'
                                        }}
                                onPress = {()=>{
                                    this.props.selectItem(this.props.data);
                                }}
            >
                    <Text_Custom    content = {this.props.data.name}
                    />
            </TouchableOpacity>
        )
    }
}


class ItemShowAddressShop extends Component {
  render() {
    const dataAddress = this.props.data ;
    console.log('>>>>. this is dataAddress',dataAddress )
    return (
      <View style = {{
                        width : '100%',
                        backgroundColor : 'white',
                        borderRadius : 6,
                        padding : 10,
                    }}
      >
            <View   style = {{
                                borderBottomColor : 'silver',
                                borderBottomWidth : 0.5,
                                paddingVertical : 10,
                                justifyContent : 'center',
                                alignItems : 'flex-start'
                            }}
            >
                    <Text_Custom    content = {dataAddress.nameDistrict.name}
                                    style = {{
                                                fontWeight : 'bold',
                                            }}
                                    styleView = {{
                                                    justifyContent : 'flex-start'
                                                }}
                    />
            </View>

            <Text_Custom    content = { 'Địa chỉ : ' + dataAddress.address}
                                    styleView = {{
                                                    justifyContent : 'flex-start',
                                                    paddingVertical: 10,
                                                }}
            />
      </View>
    )
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.getListProvince    =   this.getListProvince.bind(this);
    this.hideModal          =   this.hideModal.bind(this);
    this.selectItem         =   this.selectItem.bind(this);
    this.getListShop        =   this.getListShop.bind(this);
    this.getListDistrict    =   this.getListDistrict.bind(this);
    this.state = {
        listProvince : [],
        listDistrict : [],
        visibleModal : false,
        selectItemProvince : -1,
        selectItemDistrict : -1,
        currentSelect : false,//false is province, true is district
        errorGetListProvince : false,
        errorGetListDistrict : false
    };
  }

  resetState(){
    this.setState({
    listProvince : [],
    listDistrict : [],
    visibleModal : false,
    selectItemProvince : -1,
    selectItemDistrict : -1,
    currentSelect : false,//false is province, true is district
    errorGetListProvince : false,
    errorGetListDistrict : false
  })
}



  getListProvince(){
    Firebase.FirebaseGetProvince()
    .then((reponse)=>{
        this.setState({
            listProvince : reponse.data
        })
    },(error)=>{
        this.setState({errorGetListProvince : true})
    })
    .catch((error)=>{
        this.setState({errorGetListProvince : true})
    })
  }

  getListDistrict(){
    Firebase.FirebaseGetDistrict(this.state.selectItemProvince.id_province)
    .then((reponse)=>{
        this.setState({
            listDistrict : reponse.data
        })
    },(error)=>{
        this.setState({errorGetListDistrict : true})
    })
    .catch((error)=>{
        this.setState({errorGetListDistrict : true})
    })
  }

  selectItem(item){
    if(this.state.currentSelect){
        this.setState({selectItemDistrict : item},()=>{
            this.hideModal();
        })
    }
    else {
        this.setState({
            selectItemProvince : item,
        },()=>{
            this.getListDistrict();
            this.hideModal();
        })
    }
  }

  getListShop(){
    this.props.actionSearch.getListShopDistrict(this.state.selectItemDistrict.id_district);
  }

  componentWillUnmount(){
    this.resetState();
  }

  componentDidMount(){
    this.getListProvince();
  }

  hideModal(actionSelect = false){
      this.setState({
          visibleModal : false
      },()=>{
          if(!actionSelect){
            if(this.state.currentSelect){
                this.setState({currentSelect : false});
                this.getListShop();
            }else{
              this.setState({currentSelect : true});
            }
          }
      })
  }

  render() {
    const GetListShop = this.props.isReducerGetListShop ; 
    return (
      <View style = {{
                        flex : 1,
                        backgroundColor : constants.BACKGROUND_BELOW_APP,
                    }}
      >
            <Modal  transparent = {true}
                    visible = {this.state.visibleModal}
            >
                    <View   style = {{
                                        flex : 1,
                                    }}
                    >
                            <TouchableOpacity   style = {{
                                                            flex : 0.3,
                                                        }}
                                                onPress = {()=>{
                                                    this.hideModal(true);
                                                }}
                            >

                            </TouchableOpacity>

                            <View   style = {{
                                                flex : 0.7,
                                                backgroundColor : 'white',
                                                borderTopLeftRadius : 20,
                                                borderTopRightRadius : 20,
                                            }}
                            >
                                    <View   style=  {{
                                                        height : 40,
                                                        width : '100%',
                                                        backgroundColor : constants.BACKGROUND_GREEN,
                                                        justifyContent : 'center',
                                                        alignItems : 'center'
                                                    }}
                                    >
                                            <Text_Custom    content = {this.state.currentSelect ? 'Chọn Huyện' : 'Chọn Tỉnh'}
                                                            style = {{
                                                                        color : 'white',
                                                                        fontWeight : 'bold'
                                                                    }}
                                            />
                                    </View>
                                    {
                                            <View   style = {{
                                                                flex : 1,
                                                            }}
                                            >
                                                    {
                                                        this.state.errorGetListProvince || this.state.errorGetListDistrict ?
                                                            <Text_Custom content = {'Đã có lỗi vui lòng thử lại'}
                                                            />
                                                        :
                                                            <FlatList   style = {{
                                                                                    flex : 1,
                                                                                }}
                                                                        renderItem = {({item,index})=>{
                                                                            return  <ItemProvinceDistrict
                                                                                        data = {item}
                                                                                        selectItem = {this.selectItem}
                                                                                        isDistrict = {this.state.currentSelect}
                                                                                    />
                                                                        }}
                                                                        data = {this.state.currentSelect ? this.state.listDistrict : this.state.listProvince}
                                                            />
                                                    }
                                            </View>
                                    }
                            </View>
                    </View>
            </Modal>
            <View   style = {{
                                width : '100%',
                                height : 40,
                                marginVertical : 10,
                                flexDirection : 'row'
                            }}
            >
                    <TouchableOpacity   style = {{
                                                    flex : 0.5,
                                                    marginHorizontal : 5,
                                                    borderRadius : 6,
                                                    backgroundColor : 'white',
                                                    justifyContent : 'center',
                                                    alignItems : 'center'
                                                }}
                                        onPress = {()=> {
                                                            this.setState({visibleModal : true, currentSelect : false })
                                                        }}
                    >
                            <Text_Custom    content = {'Chọn thành phố'}
                            />
                    </TouchableOpacity>

                    <TouchableOpacity   style = {{
                                                    flex : 0.5,
                                                    marginHorizontal : 5,
                                                    borderRadius : 6,
                                                    backgroundColor : 'white',
                                                    justifyContent : 'center',
                                                    alignItems : 'center'
                                                }}
                                        onPress =   {()=> {
                                                        if(this.state.selectItemProvince !== -1 && this.state.currentSelect)
                                                        this.setState({visibleModal : true, currentSelect : true})
                                                    }}
                    >
                            <Text_Custom    content = {'Chọn quận, huyện'}
                            />
                    </TouchableOpacity>
            </View>
                    {
                            <SafeAreaView style =   {{
                                                        flex : 1,
                                                        backgroundColor : constants.BACKGROUND_BELOW_APP,
                                                    }}
                            >
                                    {
                                        GetListShop.isGetingList ?
                                            <View   style = {{
                                                                flex : 1,
                                                                alignItems : 'center',
                                                                justifyContent : 'center'
                                                            }}
                                            >
                                                    <Text_Custom    content = {'Đang tải dữ liệu'} />
                                            </View>
                                        :
                                            GetListShop.isGetListSuccess ?
                                                <View   style = {{
                                                                    flex : 1,
                                                                    alignItems : 'center',
                                                                    justifyContent : 'center',
                                                                }}
                                                >       
                                                        {
                                                                GetListShop.isListShop.length == 0 ?
                                                                    <Text_Custom    content = {'Không có cửa hàng trong khu vực này'}/>
                                                                :
                                                                    <View   style = {{
                                                                                        flex : 1,
                                                                                        width : '100%'
                                                                                    }}
                                                                    >
                                                                            <FlatList   style = {{
                                                                                                    flex : 1,
                                                                                                    width : '100%',
                                                                                                    padding : 10,
                                                                                                }}
                                                                                        data = {GetListShop.isListShop}
                                                                                        renderItem = {({item,index})=> {
                                                                                            const dataShop =    {
                                                                                                                    ...item,
                                                                                                                    nameDistrict : this.state.selectItemDistrict
                                                                                                                }
                                                                                            return  <ItemShowAddressShop
                                                                                                            data = {dataShop}
                                                                                                    />
                                                                                        }}
                                                                            />
                                                                    </View>
                                                        }
                                                </View>
                                            :
                                                GetListShop.isGetListError ?
                                                    <View   style = {{
                                                                        flex : 1,
                                                                        alignItems : 'center',
                                                                        justifyContent : 'center'
                                                                    }}
                                                    >
                                                            <Text_Custom    content = {'Vui lòng thử lại'}/>
                                                    </View>
                                                :
                                                    <View   style = {{
                                                                        flex : 1,
                                                                        justifyContent : 'center',
                                                                        alignItems : 'center'
                                                                    }}
                                                    >
                                                            <Text_Custom    content = {'Vui lòng chọn khu vực'}
                                                            />
                                                    </View>
                                    }
                            </SafeAreaView>
                    }
      </View>
    );
  }
}

function mapStateToProps(state) {
    return {
        isReducerGetListShop        :  state.isReducerGetListShop
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionSearch        : bindActionCreators(actionSearch,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);