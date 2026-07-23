// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyARFVRbuRttSLXpoxZi094P3nBnKZqpG-Y",
  authDomain: "bbn-nutrition-f1657.firebaseapp.com",
  projectId: "bbn-nutrition-f1657",
  storageBucket: "bbn-nutrition-f1657.firebasestorage.app",
  messagingSenderId: "820637240890",
  appId: "1:820637240890:web:ccf4d91de65e7b1c202f03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Global function
window.saveOrder = async function(name, phone, address, product, total) {
  try {
    await addDoc(collection(db, "orders"), {
      name,
      phone,
      address,
      product,
      total,
      time: new Date()
    });

    alert("✅ Order Saved Successfully!");
  } catch (e) {
    alert("❌ Error: " + e.message);
  }
};

window.db = db;