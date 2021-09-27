// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp, FirebaseOptions } from "firebase/app";


/**
 * DISCLAIMER: These credentials are for testing purposes, do not try this on production!.
 */
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyC63MCXfCGLLmmb81hcbk5Xy2gNocA-qJA",
  authDomain: "clientify-ed438.firebaseapp.com",
  projectId: "clientify-ed438",
  storageBucket: "clientify-ed438.appspot.com",
  messagingSenderId: "984028209158",
  appId: "1:984028209158:web:b9b86356d19870a908e387",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
