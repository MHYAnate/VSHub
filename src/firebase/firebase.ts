// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence, browserSessionPersistence, GoogleAuthProvider } from "firebase/auth";
import { config } from 'dotenv';

config();

// Initialize Firebase

const firebaseConfig = initializeApp( {
	apiKey: "AIzaSyCGEJTrYe27tC4QrAQbbdZbJZ-BL_2EA-g",
	authDomain: "clict2link.firebaseapp.com",
	projectId: "clict2link",
	storageBucket: "clict2link.appspot.com",
	messagingSenderId: "656363250376",
	appId: "1:656363250376:web:f55560d94487a205023bfd"
});
  
 const auth = getAuth(firebaseConfig);

 const googleProvider = new GoogleAuthProvider();

 const database = getFirestore(firebaseConfig);

 const storage = getStorage(firebaseConfig);

//  const analytics = getAnalytics(firebaseConfig);


 const setAuthPersistence = async (rememberMe: boolean) => {
  const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
  await setPersistence(auth, persistenceType);
};

function Firebase() {
	return {
		auth,
		storage,
		database,
		googleProvider,
		setAuthPersistence,
	};
}

export default Firebase()