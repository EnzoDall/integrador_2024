// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = { // Renomeie a variável para firebaseConfig
  apiKey: "AIzaSyBo8weXIzqdcFtRKXL9B763odh8I5_kxPE",
  authDomain: "integrador2024-817ec.firebaseapp.com",
  projectId: "integrador2024-817ec",
  storageBucket: "integrador2024-817ec.appspot.com",
  messagingSenderId: "597175425754",
  appId: "1:597175425754:web:0e9a084c18daaf6255a3e3",
  measurementId: "G-74C6R2LS56"
};

export const environment = { // Mova a exportação para depois da definição do firebaseConfig
  production: false,
  firebase: firebaseConfig // Use firebaseConfig aqui
};

// Initialize Firebase
const app = initializeApp(environment.firebase); 
