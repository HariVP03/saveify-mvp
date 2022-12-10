import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA_UTheVkUvenpZYX1Dvb6EEPPyK4pdHdI",
  authDomain: "saveify.firebaseapp.com",
  projectId: "saveify",
  storageBucket: "saveify.appspot.com",
  messagingSenderId: "136261821957",
  appId: "1:136261821957:web:9b2cabf6a0e4ff4e195e6c",
  measurementId: "G-C2NMHW4FQP",
}

const app = initializeApp(firebaseConfig)

export const analytics = getAnalytics(app)
export const auth = getAuth(app)
