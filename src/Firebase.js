import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import"firebase/compat/storage"
import"firebase/compat/database"

  const firebaseConfig = {
    apiKey: "AIzaSyBLePYU0EMgnQYZsVFAwFlkLwXYNn5qOzo",
    authDomain: "blog-2864f.firebaseapp.com",
    projectId: "blog-2864f",
    storageBucket: "blog-2864f.appspot.com",
    messagingSenderId: "1059271955070",
    appId: "1:1059271955070:web:cb23db0712d89639813e2f"
  };
  
  const fire=firebase.initializeApp(firebaseConfig)
  export default fire.database().ref()
  export const storage=fire.storage().ref()
  export const auth= fire.auth()
  