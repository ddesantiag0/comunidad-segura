import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCXmbx31x0F_dBGGctS16l7aWKRtUcJ8e0M",
  authDomain: "comunidad-segura-b16d6.firebaseapp.com",
  projectId: "comunidad-segura-b16d6",
  storageBucket: "comunidad-segura-b16d6.appspot.com",
  messagingSenderId: "753593523354",
  appId: "1:753593523354:web:8a4dbbd7afb83d04d85323",
  measurementId: "G-1NFZJRSGBZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
