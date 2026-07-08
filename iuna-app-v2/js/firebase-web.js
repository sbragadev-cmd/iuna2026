import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, where, limit, serverTimestamp, Timestamp, doc, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';
const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'iuna-e113d.firebaseapp.com',
  projectId: 'iuna-e113d',
  storageBucket: 'iuna-e113d.firebasestorage.app',
  messagingSenderId: 'SEU_MESSAGING_SENDER_ID',
  appId: 'SEU_APP_ID'
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, 'default');
window.IUNA_FIREBASE = { db, collection, addDoc, getDocs, query, orderBy, where, limit, serverTimestamp, Timestamp, doc, updateDoc, deleteDoc };
