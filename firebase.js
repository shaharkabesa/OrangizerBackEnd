

import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {

  apiKey: "AIzaSyBGqMDiEfF8cuzJw4fOLFGcOmYOCbhGdZc",

  authDomain: "organizer-97f43.firebaseapp.com",

  projectId: "organizer-97f43",

  storageBucket: "organizer-97f43.appspot.com",

  messagingSenderId: "814692261754",

  appId: "1:814692261754:web:31380a9b0b588b8bb900c3",

  measurementId: "G-LVGT98PW0X"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const storage = getStorage(app);