import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDiwnJ7i9UwLGOO-b_j_yT-Z52QyLh_Zk8",
    authDomain: "spmedicalgroupaline.firebaseapp.com",
    databaseURL: "https://spmedicalgroupaline.firebaseio.com",
    projectId: "spmedicalgroupaline",
    storageBucket: "spmedicalgroupaline.appspot.com",
    messagingSenderId: "256106672671",
    appId: "1:256106672671:web:5cd1d529c71c1e68"
  }

  firebase.initializeApp(firebaseConfig);

  export default firebase;