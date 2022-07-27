import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCL-_2sIeTDc0w2grsMckrYqq-tNhsmHsc",
  authDomain: "miniblog-2487b.firebaseapp.com",
  projectId: "miniblog-2487b",
  storageBucket: "miniblog-2487b.appspot.com",
  messagingSenderId: "983865160319",
  appId: "1:983865160319:web:e0fd68b444b956522bc54a"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }