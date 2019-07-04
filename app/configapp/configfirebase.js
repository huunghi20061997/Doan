import firebase from 'react-native-firebase';

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