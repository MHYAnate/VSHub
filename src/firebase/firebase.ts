// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// import { getStorage, ref } from "firebase/storage";
// import {getFirestore, collection,doc, addDoc, getDocs, deleteDoc, onSnapshot} from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth";


// interface AddData {
//   address: string;
// 	number: string;
// }

// interface deleteData {
// 	id: string;
// }

// // Initialize Firebase
// const firebaseConfig = initializeApp( {
//   apiKey: "AIzaSyDWqU_Ubp47BOCmQvP5SwtJiTbVU-weah0",
//   authDomain: "mvptest01-11b55.firebaseapp.com",
//   projectId: "mvptest01-11b55",
//   storageBucket: "mvptest01-11b55.appspot.com",
//   messagingSenderId: "679724658970",
//   appId: "1:679724658970:web:c527dd9bd8ba8e70ad7ca3",
//   measurementId: "G-F5PH1LLHPQ"
// });
  

//  const faceredirect ="//clict2link.firebaseapp.com/__/auth/handler";
//  const auth = getAuth(firebaseConfig);

//  const database = getFirestore(firebaseConfig);

//  const storage = getStorage(firebaseConfig);

// //  const analytics = getAnalytics(firebaseConfig);

//  const clientColRef = collection(database,'client')


// const getClientDoc =getDocs(clientColRef)
//  .then((snapshot)=>{
//     let client = [];
//     snapshot.docs.forEach((doc)=>{
//       client.push({...doc.data(), id: doc.id})
//     })
// }).catch((error)=>{
//   console.log(error)
// })

// const add: any = (AddData:AddData)=>{
// 	addDoc(clientColRef,{
//   address:AddData.address,
//   number:AddData.number,
// })}

// const Delete: any = (idData : any, deleteData:any)=>{
// 	const docRef = doc(database, idData, deleteData.id )
// 	deleteDoc(docRef)
// }

// const DeleteStock: any = async  (idData : any, deleteData:any) => {
// 	try {
// 		await deleteDoc(doc(database, idData, deleteData.id ));
// 	} catch (error) {
// 		console.error("Error adding profile detail:", error);
// 	}
// };

// export const getClientRealTimDoc = onSnapshot(clientColRef,(snapshot)=>{
// 	let client:any = [];
// 	snapshot.docs.forEach((doc)=>{
// 		client.push({...doc.data(), id: doc.id})
// 	})
	
// }
// )

// async function getDoument(collection:any, id:any) {
	
// 	let result = null;
// 	let error = null;

// 	try {
// 			result = await getDocs(clientColRef);
// 	} catch (e) {
// 			error = e;
// 	}

// 	return { result, error };
// }
 

// function Firebase() {
// 	return {
// 		auth,
// 		storage,
// 		database,
// 		clientColRef,
// 		add,
// 		getClientDoc,
// 		Delete,
// 		DeleteStock,
// 	};
// }

// export default Firebase()