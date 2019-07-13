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
export const FirebaseGetListProduct = () => {
    return new Promise ((resolve,reject)=>{
      const firebaseData = FirebaseConfig.firestore();
      firebaseData.settings({timestampsInSnapshots : true});
      firebaseData.collection('menu_product').get()
      .then((reponse)=>{
        if(reponse.hasOwnProperty('_docs')){
          let dataReceiver = [];
          reponse._docs.forEach(DocumentSnapshot => {
            dataReceiver.push(DocumentSnapshot._data);
          })
          resolve({
            data : dataReceiver,
            error : false,
            description : '',
          });
        }else{
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
          description : 'Lỗi hệ thống'
        })
      })
    })
}
