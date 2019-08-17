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
                                    this.props.selectItem(this.props.data.id_province);
                                }}
            >
                    <Text_Custom    content = {this.props.data.name}
                    />
            </TouchableOpacity>
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
    Firebase.FirebaseGetDistrict(this.state.selectItemProvince)
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

  }

  componentDidMount(){
    this.getListProvince();
  }

  hideModal(){
      this.setState({
          visibleModal : false
      },()=>{
          if(this.state.currentSelect){
              this.setState({currentSelect : false});
              this.getListShop();
          }else{
            this.setState({currentSelect : true});
          }
      })
  }

  render() {
    console.log('>>>>>>>> this is data2',this.state.listDistrict)
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
                            <View   style = {{
                                                flex : 0.3,
                                            }}
                            >

                            </View>

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
                                                            this.setState({visibleModal : true})
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
                                                        this.setState({visibleModal : true})
                                                    }}
                    >
                            <Text_Custom    content = {'Chọn quận, huyện'}
                            />
                    </TouchableOpacity>
            </View>
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