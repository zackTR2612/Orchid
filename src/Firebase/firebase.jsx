// firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHbB84io1JMEO5JSalMz3jyO-aGcsXjuo",
  authDomain: "orchids-3533a.firebaseapp.com",
  projectId: "orchids-3533a",
  storageBucket: "orchids-3533a.appspot.com",
  messagingSenderId: "455580359659",
  appId: "1:455580359659:web:27c78b49ef5237b05a17ae",
  measurementId: "G-99VL1XHTEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export auth for use in other files
export { auth }; // Đảm bảo rằng bạn xuất auth
