// firebase-init.js
const firebaseConfig = {
    apiKey: "AIzaSyCkJgv7VV82Y8E1Wh-lsULUU_TwoH_G3vQ",
    authDomain: "aft-54dfd.firebaseapp.com",
    databaseURL: "https://aft-54dfd-default-rtdb.firebaseio.com",
    projectId: "aft-54dfd",
    storageBucket: "aft-54dfd.appspot.com",
    messagingSenderId: "582845298686",
    appId: "1:582845298686:web:833785c57be402f6f1b2af",
    measurementId: "G-NMQ6WTTDWV"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
