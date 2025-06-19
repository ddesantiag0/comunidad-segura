document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactsForm");
  const lang = getLang();
  const t = translations["settings"]?.[lang] || translations["settings"]["en"];

  // Translate static elements
  document.getElementById("title").textContent = t.title;
  document.getElementById("instructions").textContent = t.instructions;
  document.getElementById("saveBtn").textContent = t.saveBtn;

  for (let i = 1; i <= 3; i++) {
    document.getElementById(`nameLabel${i}`).textContent = t.nameLabel;
    document.getElementById(`phoneLabel${i}`).textContent = t.phoneLabel;
  }

  // Load from localStorage
  const savedContacts = JSON.parse(localStorage.getItem("emergencyContacts")) || [];
  savedContacts.forEach((contact, i) => {
    if (i < 3) {
      document.getElementById(`contactName${i + 1}`).value = contact.name;
      document.getElementById(`contactPhone${i + 1}`).value = contact.phone;
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const contacts = [];

    for (let i = 1; i <= 3; i++) {
      const name = document.getElementById(`contactName${i}`).value.trim();
      const phone = document.getElementById(`contactPhone${i}`).value.trim();
      if (name && phone) contacts.push({ name, phone });
    }

    localStorage.setItem("emergencyContacts", JSON.stringify(contacts));
    document.getElementById("status").style.display = "block";
    document.getElementById("status").textContent = t.saved;
  });
});
