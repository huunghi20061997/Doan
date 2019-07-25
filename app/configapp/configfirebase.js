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

  
  // Initialize Firebase
export const FirebaseConfig = firebase.initializeApp(firebaseConfig) ; 

/**Funtion check user and password login */
export const FirebaseGetDataUser = (user,password) => {
  return new Promise((resolve,reject)=>{
    const firebaseData = FirebaseConfig.firestore();
    firebaseData.settings({timestampsInSnapshots : true});
    firebaseData.collection('Authen').where('NB_Phone','==',Number(user)).get()
    .then((reponse)=>{
        resolve({
          objectData : reponse._docs,
        })
        return ;
        //where('Password','==','Huunghi97')
    }).catch((error)=>{
      reject({
        error : error,
      })
    })
  })
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

/**Funtion get list table in shop*/
// export const FirebaseGetListProduct = (idShop) => {
//   return new Promise ((resolve,reject)=>{
//       firebaseData.settings({timestampsInSnapshots : true});
//       firebaseData.collection(constants.TABLE_ODER).where(constants.SHOP.ID_SHOP,'==',idShop).get()
//       .then((reponse)=>{
//           if(reponse.hasOwnProperty('_docs')){
//             let dataReceiver = [];
//             reponse._docs.forEach(DocumentSnapshot => {
//               dataReceiver.push(DocumentSnapshot._data);
//             })
//           }
//       })
//   }
// }

export const FirebaseOder = (id_User,id_Shop,id_Table,list_Oder) => {
  return new Promise ((resolve,reject)=>{
      const firebaseData = FirebaseConfig.firestore();
      firebaseData.settings({timestampsInSnapshots : true});

      firebaseData.collection(constants.BILL_ODER).get().then(reponse=> {
        if(reponse._docs !== null && reponse._docs !== undefined){
          //Get size collection for setting ID for oder
          const countDoc = constants.DEFAULT_ID + reponse._docs.length ; 
          const dataOder =  {
                              ID_User : Number(id_User),//User custom 
                              id_oder : countDoc,
                              id_shop : Number(id_Shop),
                              id_table : Number(id_Table),
                              list_oder : list_Oder,
                              time_pay : firebase.firestore.FieldValue.serverTimestamp(),
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




