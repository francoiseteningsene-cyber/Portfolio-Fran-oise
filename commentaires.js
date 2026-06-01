import { db } from "./firebase-config.js";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// === DOM ===
const form  = document.getElementById("commentaire-form");
const liste = document.getElementById("commentaires-liste");

// === Formater date + heure ===
function formaterDate(timestamp) {
    if (!timestamp) return "En cours...";
    const d = timestamp.toDate();
    const date = d.toLocaleDateString("fr-FR", {
        day: "2-digit", month: "long", year: "numeric"
    });
    const heure = d.toLocaleTimeString("fr-FR", {
        hour: "2-digit", minute: "2-digit"
    });
    return `${date} à ${heure}`;
}

// === Créer une carte commentaire ===
function creerCarte(c) {
    const card = document.createElement("div");
    card.className = "comment-card";

    // Première lettre du nom pour l'avatar
    const initiale = c.auteur ? c.auteur.charAt(0).toUpperCase() : "?";

    card.innerHTML = `
        <div class="comment-card-header">
            <div class="comment-author" data-initial="${initiale}">${escHtml(c.auteur)}</div>
            <div class="comment-date">${formaterDate(c.date)}</div>
        </div>
        <div class="comment-body">
            <p class="comment-text">${escHtml(c.texte)}</p>
        </div>
    `;
    return card;
}

// === Écoute temps réel Firebase ===
function ecouterCommentaires() {
    const q = query(collection(db, "commentaires"), orderBy("date", "desc"));

    onSnapshot(q, (snap) => {
        liste.innerHTML = "";

        if (snap.empty) {
            liste.innerHTML = `<div class="empty-msg">Aucun commentaire pour l'instant...</div>`;
            return;
        }

        snap.forEach((doc) => {
            liste.appendChild(creerCarte(doc.data()));
        });
    });
}

// === Envoyer un commentaire ===
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const auteur = document.getElementById("auteur").value.trim();
    const texte  = document.getElementById("texte").value.trim();
    if (!auteur || !texte) return;

    const btn = form.querySelector(".btn-publier");
    btn.disabled    = true;
    btn.textContent = "Envoi...";

    try {
        await addDoc(collection(db, "commentaires"), {
            auteur: auteur,
            texte:  texte,
            date:   serverTimestamp()
        });

        form.reset();

        const suc = document.getElementById("successMsg");
        suc.style.display = "block";
        setTimeout(() => { suc.style.display = "none"; }, 3000);

    } catch (err) {
        console.error("Erreur envoi :", err);
    } finally {
        btn.disabled    = false;
        btn.textContent = "Publier";
    }
});

// === Sécurité HTML ===
function escHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// === Init ===
ecouterCommentaires();