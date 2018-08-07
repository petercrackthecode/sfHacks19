import firebase from "firebase/app"
import "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/database"
import "firebase/storage"
const config = {
    apiKey: "AIzaSyBjTXde_cHIP_JiyeDfPfKDbPxMnBMmD80",
    authDomain: "seeds-vietnam.firebaseapp.com",
    databaseURL: "https://seeds-vietnam.firebaseio.com",
    projectId: "seeds-vietnam",
    storageBucket: "seeds-vietnam.appspot.com",
    messagingSenderId: "154989476440"
};

firebase.initializeApp(config);
export default firebase;
