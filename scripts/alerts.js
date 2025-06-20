document.addEventListener("DOMContentLoaded", () => {
  const alertsFeed = document.getElementById("alerts-feed");

  // Placeholder example alerts
  const sampleAlerts = [
    "🚨 ICE checkpoint reported at Vermont & Slauson (10 mins ago)",
    "⚠️ Unmarked vehicle spotted near USC campus (30 mins ago)",
    "📍 Raid reported at apartment complex in Boyle Heights (1 hr ago)"
  ];

  alertsFeed.innerHTML = ""; // Clear loading message

  sampleAlerts.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert;
    alertsFeed.appendChild(li);
  });
});
