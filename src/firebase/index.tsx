// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'; 
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
 
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage"; 
 
const firebaseConfig = {
  apiKey: "AIzaSyCamHI31jKjBAG9cof90nvqyfltnOfgN6A",
  authDomain: "nt118-firebase-a9bb2.firebaseapp.com",
  projectId: "nt118-firebase-a9bb2",
  storageBucket: "nt118-firebase-a9bb2.appspot.com",
  messagingSenderId: "648313110076",
  appId: "1:648313110076:web:ef66ea38361cb37acf4d39",
  measurementId: "G-TZ7VGZJB2T"
};
if (getApps().length === 0){
    initializeApp(firebaseConfig);
  }
// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const db = getFirestore(app);
const fs = getFirestore();
  
const App = getApp();
const Storage = getStorage();


const uploadToFirebase = async (
                                  uri: RequestInfo, 
                                  name: any, 
                                  onProgress: (arg0: number) => any,
                                  listLink: any
                                ) => 
                              {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(getStorage(), `images/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        listLink.push(downloadUrl);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};

export {  fs, db, collection, addDoc, getDocs, uploadToFirebase, App, Storage};