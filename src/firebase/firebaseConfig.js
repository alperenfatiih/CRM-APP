import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXDu4BkGgwkNpoyP8Zm-c34pI8dgPpZ-w",
  authDomain: "crmapp-57303.firebaseapp.com",
  projectId: "crmapp-57303",
  storageBucket: "crmapp-57303.firebasestorage.app",
  messagingSenderId: "68988626926",
  appId: "1:68988626926:web:80d1862634a6ee6e9e10ff"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };