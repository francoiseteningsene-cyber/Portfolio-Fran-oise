// firebase-config.js
// Importation des modules Firebase nécessaires
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore }
    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
 
// Ta configuration personnelle (récupérée à l'étape 5)
const firebaseConfig = {
  apiKey: "AIzaSyBP15F4-OG1pedapFsrlWmnjBkzrX8Ga7k",
  authDomain: "portfolio-francoise-e77ff.firebaseapp.com",
  projectId: "portfolio-francoise-e77ff",
  storageBucket: "portfolio-francoise-e77ff.firebasestorage.app",
  messagingSenderId: "447368001657",
  appId: "1:447368001657:web:e633dcf0a038cca3e77ca8"
};
 
// Initialiser Firebase
const app = initializeApp(firebaseConfig);
 
// Récupérer une référence à la base Firestore
export const db = getFirestore(app);
