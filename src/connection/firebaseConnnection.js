import firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyCWevJlEwQ3OusmZQ3gaZ_ZE89ikM2G8zw",
  authDomain: "prandium-b4706.firebaseapp.com",
  databaseURL: "https://prandium-b4706.firebaseio.com",
  projectId: "prandium-b4706",
  storageBucket: "prandium-b4706.appspot.com",
  messagingSenderId: "841854387115",
  appId: "1:841854387115:web:7afe930700a600da"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;