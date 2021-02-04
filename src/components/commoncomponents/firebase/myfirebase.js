import firebase from "firebase/app"
import "@firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDTc_HY6EM4H1RSOFfjAXDCiUnXlcsFY2M",
  authDomain: "shiphype-88df5.firebaseapp.com",
  databaseURL: "https://shiphype-88df5.firebaseio.com",
  projectId: "shiphype-88df5",
  storageBucket: "shiphype-88df5.appspot.com",
  messagingSenderId: "943813754760",
  appId: "1:943813754760:web:1fdb297795e0f9d12a043d",
  measurementId: "G-PDSQY5WW04"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };