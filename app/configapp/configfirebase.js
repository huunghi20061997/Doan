import firebase from 'react-native-firebase';
import * as constants from './constants';


var firebaseConfig = {
    apiKey: "AIzaSyBfEqFMzARvqklsh_4ghrGnVZH7-9Cdsdo",
    authDomain: "coffeemanagerapp.firebaseapp.com",
    databaseURL: "https://coffeemanagerapp.firebaseio.com",
    projectId: "coffeemanagerapp",
    storageBucket: "coffeemanagerapp.appspot.com",
    messagingSenderId: "687735349163",
    appId: "1:687735349163:web:286dc45428d5970e"
  };



const ERROR_ORDER = {
                      success : false,
                      error : true,
                      description : constants.DESCRIPTION_ERROR_ADD_DOC,
                    }

const ERROR_ORDER_SYSTEM  = {
                              success : false,
                              error : true,
                              description : constants.DESCRIPTION_ERROR_SYSTEM,
                            }

const OBJECT_AUTHEN       = {
                                  success : false,
                                  error : false,
                                  description : '',
                                  objectData : null,
                            }
  // Initialize Firebase
export const FirebaseConfig = firebase.initializeApp(firebaseConfig) ; 
const firebaseData = FirebaseConfig.firestore();
firebaseData.settings({timestampsInSnapshots : true});


/**Funtion check user and password login */
export const FirebaseGetDataUser = (user,password) => {
  return new Promise((resolve,reject)=>{
    const firebaseData = FirebaseConfig.firestore();
    firebaseData.settings({timestampsInSnapshots : true});
    firebaseData.collection('Authen').where('NB_Phone','==',Number(user)).
    where('Password' , '==' , password).get()
    .then((reponse)=>{
        resolve ({
                    ...OBJECT_AUTHEN,
                    success : true,
                    objectData : reponse._docs,
                })
        return ;
    }).catch((error)=>{
      reject({
                ...OBJECT_AUTHEN,
                success : false,
                error : true,
                description : constants.DESCRIPTION_ERROR_SYSTEM,
            })
    })
  });
}


/**Funtion get list product*/
export const FirebaseGetListProduct = (idShop) => {
    return new Promise ((resolve,reject)=>{
      const firebaseData = FirebaseConfig.firestore();
      firebaseData.settings({timestampsInSnapshots : true});
      firebaseData.collection(constants.MENU_PRODUCT).where(constants.SHOP.ID_SHOP,'==',idShop).get()
      .then((reponse)=>{
        if(reponse.hasOwnProperty('_docs')){
          let dataReceiver = [];
          reponse._docs.forEach(DocumentSnapshot => {
            dataReceiver.push(DocumentSnapshot._data);
          });
          resolve({
                    data : dataReceiver,
                    error : false,
                    description : '',
                  });
        }else {
                reject({
                  data : [],
                  error : true,
                  description : 'Không có dữ liệu'
                })
              }
      }).catch((error)=>{
        reject({
          data : [],
          error : true,
          description : constants.DESCRIPTION_ERROR_SYSTEM
        })
      }).catch((error)=>{
                          reject({
                                  data : [],
                                  error : true,
                                  description : constants.DESCRIPTION_ERROR_SYSTEM
                                });
      });
    });
}

/**Funtion check id_table and id_shop*/
export const FirebaseCheckOrder = (idTable,idShop) => {
  return new Promise ((resolve,reject)=>{
      const firebaseData = FirebaseConfig.firestore();
      firebaseData.settings({timestampsInSnapshots : true});
      firebaseData.collection(constants.TABLE.TABLE_ODER).where(constants.SHOP.ID_SHOP,'==',idShop)
      .where(constants.TABLE.ID_TABLE_ODER, '==',idTable).get()
      .then((reponse)=>{
          if(reponse.hasOwnProperty('_docs')){
              resolve({
                  success : true,
                  data : reponse._docs,
                  error : false,
                  description : '',
                });
          }else {
              reject(ERROR_ORDER);
          }
      }).catch((error)=>{
        reject(ERROR_ORDER_SYSTEM);
      })
    })
}

export const FirebaseOder = (id_User,id_Shop,id_Table,list_Oder) => {
  return new Promise ((resolve,reject)=>{
      const firebaseData = FirebaseConfig.firestore();
      firebaseData.settings({timestampsInSnapshots : true});
      firebaseData.collection(constants.BILL_ODER).get().then(reponse=> {
        if(reponse._docs !== null && reponse._docs !== undefined){
          //Get size collection for setting ID for oder
          const countDoc = constants.DEFAULT_ID + reponse._docs.length; 
          const dataOder =  {
                              ID_User : Number(id_User),//User custom 
                              id_oder : countDoc,
                              id_shop : Number(id_Shop),
                              id_table : Number(id_Table),
                              list_oder : list_Oder,
                              time_pay : firebase.firestore.FieldValue.serverTimestamp(),
                              paid : false,
                            }
          //Add data in firebase
          firebaseData.collection(constants.BILL_ODER).add(dataOder)
          .then((reponse)=>{
                resolve({
                  success : true,
                  error : false,
                  description : '',
                });
              }).catch((error)=>{
                reject({
                  success : false,
                  error : true,
                  description : constants.DESCRIPTION_ERROR_ADD_DOC,
                });
              });
        }else {
                reject({
                  success : false,
                  error : true,
                  description : constants.DESCRIPTION_ERROR_SYSTEM,
                })
              }
          }).catch((error)=>{
            reject({
              success : false,
              error : true,
              description : constants.DESCRIPTION_ERROR_SYSTEM,
            })
          });
        }).catch((error)=>{
          reject({
            success : false,
            error : true,
            description : constants.DESCRIPTION_ERROR_SYSTEM,
          })
        });
}


// /**Funtion for sent SMS and Verify Phone Authen */
export const FirebaseRegister = (numberPhone = '939649712') => {
  return new Promise((resolve,reject)=> {
    
  })
}


/** Funtion register Account */
export const FirebaseRegisterAccount = (name,numberPhone,Password) =>{
    return new Promise((resolve,reject)=> {
      firebaseData.collection(constants.AUTHEN)
      .where('NB_Phone','==',numberPhone)
      .get()
      .then(reponse=> {
        if(reponse._docs !== null && reponse._docs !== undefined){
            if(reponse._docs.length == 0 ){
                firebaseData.collection(constants.AUTHEN).get().then((reponseAuthen)=>{
                    const countDoc = constants.DEFAULT_ID + reponseAuthen._docs.length;
                    const dataRegister =  {
                                              ID_User : countDoc,
                                              NB_Phone : numberPhone,
                                              Password : Password,
                                              User_Name : name,
                                              id_type : constants.DEFAULT_ID
                                          }
                    firebaseData.collection(constants.AUTHEN).add(dataRegister).then((reponse)=>{
                      resolve({
                              ...OBJECT_AUTHEN,
                              success : true,
                              objectData :null
                            });
                    },(error)=>{
                      reject({
                              ...OBJECT_AUTHEN,
                              error : true,
                              description : constants.ERROR_REGISTER_ACCOUNT,
                              objectData : null,
                            });
                      return ; 
                    }).catch((error)=>{
                      reject({
                              ...OBJECT_AUTHEN,
                              error : true,
                              description : constants.DESCRIPTION_ERROR_SYSTEM,
                              objectData : null,
                            });
                      return ; 
                    })
                },(error)=>{
                  reject({
                          ...OBJECT_AUTHEN,
                          error : true,
                          description : constants.ERROR_SYSTEM_GET_DATA,
                          objectData : null,
                        });
            return ; 
                }).catch((error)=>{
                        reject({
                                ...OBJECT_AUTHEN,
                                error : true,
                                description : constants.DESCRIPTION_ERROR_SYSTEM,
                                objectData : null,
                              });
                        return ; 
                })
            }else{
              reject({
                      ...OBJECT_AUTHEN,
                      error : true,
                      description : constants.ACCOUNT_EXIST,
                      objectData : null,
                    });
              return ; 
            }
      }else{
              reject({
                      ...OBJECT_AUTHEN,
                      error : true,
                      description : constants.DESCRIPTION_ERROR_APP,
                      objectData : null,
                    });
              return ; 
      }
      },(error)=>{
        console.log('>>>>>>>>>2',error)
                  reject({
                            ...OBJECT_AUTHEN,
                            error : true,
                            description : constants.DESCRIPTION_ERROR_APP,
                            objectData : null,
                        });
                  return; 
      }).catch((error)=>{
                          reject({
                                  ...OBJECT_AUTHEN,
                                  error : true,
                                  description : constants.DESCRIPTION_ERROR_SYSTEM,
                                  objectData : null,
                                });
                                return ; 
      });
})}

//***Funtion get list Pay via User */
export const FirebaseGetListPay = (idUser) => {
  return new Promise ((resolve,reject)=>{
    firebaseData.collection(constants.BILL_ODER)
    .where('ID_User','==',Number(idUser))
    .where('paid','==',false)
    .get()
    .then((reponse)=>{
      if(reponse.hasOwnProperty('_docs')){
        let dataReceiver = [];
          let total_price = 0 ; 
          reponse._docs.forEach(DocumentSnapshot => {
            dataReceiver.push({
              dataObject  : DocumentSnapshot._data,
              dataPath    : DocumentSnapshot._ref._documentPath._parts[1]
            });
          });
          resolve ({
                      data : dataReceiver,
                      error : false,
                      description : '',
                  });
      }else{
        reject({
                  data : [],
                  error : true,
                  description : constants.DESCRIPTION_ERROR_SYSTEM
              });
      }
    })
    .catch((error)=>{
            reject({
                      data : [],
                      error : true,
                      description : constants.DESCRIPTION_ERROR_SYSTEM
                  });
          })
  })
  .catch((error)=>{
          reject({
                    data : [],
                    error : true,
                    description : constants.DESCRIPTION_ERROR_SYSTEM
                });
        })
}

//***Funtion get total price or name shop bill */
export const FirebaseGetItemPay = (isPrice = true,ArrayProduct  = [],id) => {
  return new Promise ((resolve,reject)=>{
      const nameTable = isPrice ? constants.MENU_PRODUCT : constants.SHOP.TABLE_SHOP ;
      if(isPrice){
      let arrayPromise = [];
      ArrayProduct.forEach((value)=>{
          arrayPromise.push(new Promise((resolve,rejecct)=>{
                  firebaseData.collection(nameTable)
                  .where('id_product','==',value.id_product)
                  .get()
                  .then((reponse)=>{
                      if(reponse.hasOwnProperty('_docs')){
                          resolve({
                                    data : reponse._docs.length > 0 ? reponse._docs[0]._data : [],
                                    error : false,
                                    description : ''
                                  })
                      }
                  },
                  (error)=>{
                    reject({
                              data : [],
                              error : true,
                              description : constants.NOT_GET_DATA
                          });
                  })
                  .catch((error)=>{
                        reject({
                                  data : [],
                                  error : true,
                                  description : constants.NOT_GET_DATA
                              });
                  });
          }))
      });
      Promise.all(arrayPromise)
      .then((reponse)=>{
          resolve ({
                      data : reponse,
                      error : false,
                  })
      })
      .catch((error)=>{
        reject ({
                    data : reponse,
                    error : true,
                })
      })
    }else{
      firebaseData.collection(nameTable)
      .where(constants.SHOP.ID_SHOP,'==',id)
      .get()
      .then((reponse)=>{
        if(reponse.hasOwnProperty('_docs')){
          resolve ({
                    data : reponse._docs,
                    error : false,
                    description : ''
                  })
        }
      },
      (error)=>{
        reject({
                    data : [],
                    error : true,
                    description : constants.NOT_GET_DATA
              });
        return ; 
      })
      .catch((error)=>{
        reject ({
                    data : [],
                    error : true,
                    description : constants.NOT_GET_DATA
                });
        return ; 
      })
    }
  });
}

//***Funtion Pay bill */
export const FirebasePayBill = (listPay) => {
  const payResult = {
                        error : false,
                        description : ''

                    }
  
  console.log('this is listbill',listPay);
  return new Promise ((resolve,reject)=>{
      let arrayPromise = [];
      listPay.forEach((value)=>{
        let objectPromise = new Promise((resolve,reject)=>{
          firebaseData.collection(constants.BILL_ODER).doc(value)
          .update({paid : true})
          .then((reponse)=>{
              resolve({
                        error : false,
                        description : ''
                      })
          })
          .catch((error)=>{
                reject({
                        error : true,
                        description : constants.ERROR_UPDATE
                      })
          })
        })
        arrayPromise.push(objectPromise);
      });
      //---------End for loop-----------//
      Promise.all(arrayPromise)
      .then((reponse)=>{
        resolve({
                  error : false,
                  description : ''
                });
      })
      .catch((error)=>{
        reject({
                  error : true,
                  description : constants.ERROR_UPDATE
              });
      })
  })
}

