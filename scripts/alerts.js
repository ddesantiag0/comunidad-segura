// scripts/alerts.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const db = getFirestore(app);

const alertsFeed = document.getElementById("alerts-feed");

function formatTimestamp(timestamp) {
  const now = new Date();
  const date = timestamp.toDate();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
}

function renderAlert(doc) {
  const data = doc.data();
  const li = document.createElement("li");
  const icon = data.icon || "📍";
  li.innerHTML = `${icon} ${data.text} <small>(${formatTimestamp(data.timestamp)})</small>`;
  return li;
}

const q = query(collection(db, "iceReports"), orderBy("timestamp", "desc"), limit(10));

onSnapshot(q, (snapshot) => {
  alertsFeed.innerHTML = "";
  snapshot.forEach((doc) => {
    alertsFeed.appendChild(renderAlert(doc));
  });
});
