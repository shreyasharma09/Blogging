import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import"firebase/compat/storage"
import"firebase/compat/database"

const firebaseConfig = {
    apiKey: "AIzaSyDsXHl3S1aCA1nxMLoOQwiH20k3cIZdOYM",
    authDomain: "blogging-project-70f2b.firebaseapp.com",
    projectId: "blogging-project-70f2b",
    storageBucket: "blogging-project-70f2b.firebasestorage.app",
    messagingSenderId: "336219851924",
    appId: "1:336219851924:web:8683380b39a4780d6e7881"
  };
  const fire=firebase.initializeApp(firebaseConfig)
  export default fire.database().ref()
  export const storage=fire.storage().ref()
  export const auth= fire.auth()
  