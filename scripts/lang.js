// scripts/lang.js

const supportedLanguages = ["es", "en", "zh", "vi", "tl", "ar"];

// Default translations per page
const translations = {
  index: {
    es: {
      title: "Comunidad Segura",
      description: "Una plataforma para reportar actividad de ICE, ver alertas en tiempo real, y acceder a recursos legales para nuestra comunidad inmigrante en Los Ángeles.",
      report: "🚨 Reportar Actividad ICE",
      map: "📍 Ver Mapa de Reportes",
      rights: "🛡️ Conoce Tus Derechos (PDF)"
    },
    en: {
      title: "Safe Community",
      description: "A platform to report ICE activity, view real-time alerts, and access legal resources for immigrant communities in Los Angeles.",
      report: "🚨 Report ICE Activity",
      map: "📍 View ICE Activity Map",
      rights: "🛡️ Know Your Rights (PDF)"
    },
    zh: {
      title: "安全社区",
      description: "一个用于报告ICE活动、查看实时警报和访问积极合法资源的平台。",
      report: "报告 ICE 活动",
      map: "查看 ICE 地图",
      rights: "知道你的权利 (PDF)"
    },
    vi: {
      title: "Cộng Đồng An Toàn",
      description: "Nền tảng báo cáo hoạt động ICE, cập nhật cảnh báo theo thời gian thực, và truy cập tài nguyên pháp lý cho các cộng đồng nhập cư ở Los Angeles.",
      report: "🚨 Báo Cáo Hoạt Động ICE",
      map: "📍 Xem Bản Đồ ICE",
      rights: "🛡️ Biết Quyền Của Bạn (PDF)"
    },
    tl: {
      title: "Ligtas na Komunidad",
      description: "Isang plataporma para i-report ang aktibidad ng ICE, makakita ng mga alerto sa tunay na oras, at makakuha ng legal na tulong para sa mga immigrant sa Los Angeles.",
      report: "🚨 I-report ang Aktibidad ng ICE",
      map: "📍 Tingnan ang Mapa ng ICE",
      rights: "🛡️ Alamin ang Iyong mga Karapatan (PDF)"
    },
    ar: {
      title: "مجتمع آمن",
      description: "منصة لإبلاغ عن نشاط ICE ، وعرض التنبيهات في وقت حقيقي ، والوصول إلى موارد قانونية للمجتمعات المهاجرة في لوس أنجلوس.",
      report: "🚨 إبلاغ عن نشاط ICE",
      map: "📍 عرض خريطة ICE",
      rights: "🛡️ معرفة حقوقك (PDF)"
    }
  },
  report: {
    es: {
      formTitle: "🚨 Reportar Actividad de ICE",
      labelLocation: "📍 Ubicación o dirección (opcional pero útil)",
      labelType: "⚠️ Tipo de actividad",
      labelTime: "🕒 Hora aproximada (si sabes)",
      labelNotes: "📄 Comentarios (opcional)",
      selectOne: "Selecciona uno",
      placeholderLocation: "Ej: 123 Main St, Los Angeles, CA",
      placeholderTime: "Ej: 10:30 AM, hoy",
      placeholderNotes: "Describe lo que viste...",
      submitBtn: "Enviar Reporte",
      thanks: "✅ ¡Gracias! Tu reporte ha sido recibido.",
      backBtn: "← Volver"
    },
    en: {
      formTitle: "🚨 Report ICE Activity",
      labelLocation: "📍 Location or address (optional but helpful)",
      labelType: "⚠️ Type of activity",
      labelTime: "🕒 Approximate time (if known)",
      labelNotes: "📄 Comments (optional)",
      selectOne: "Select one",
      placeholderLocation: "e.g. 123 Main St, Los Angeles, CA",
      placeholderTime: "e.g. 10:30 AM, today",
      placeholderNotes: "Describe what you saw...",
      submitBtn: "Submit Report",
      thanks: "✅ Thank you! Your report has been received.",
      backBtn: "← Back"
    }
    // Add zh, vi, tl, ar as needed
  },
  shared: {
    es: {
      panicAlert: "🚨 EMERGENCIA: Contactando a tus contactos de emergencia y mostrando tus derechos legales..."
    },
    en: {
      panicAlert: "🚨 EMERGENCY: Contacting your emergency contacts and showing your legal rights..."
    }
  }
};

function getLang() {
  return localStorage.getItem("lang") || "es";
}

function setLang(langCode) {
  if (supportedLanguages.includes(langCode)) {
    localStorage.setItem("lang", langCode);
    location.reload();
  }
}

function applyLanguageSwitcher() {
  const links = document.querySelectorAll("[data-lang]");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const langCode = link.getAttribute("data-lang");
      setLang(langCode);
    });
  });
}

function translatePage(pageKey) {
  const lang = getLang();
  const t = translations[pageKey]?.[lang];
  if (!t) return;

  if (document.getElementById("title")) {
    document.getElementById("title").textContent = t.title;
  }
  if (document.getElementById("description")) {
    document.getElementById("description").textContent = t.description;
  }
  if (document.getElementById("btn-report")) {
    document.getElementById("btn-report").textContent = t.report;
  }
  if (document.getElementById("btn-map")) {
    document.getElementById("btn-map").textContent = t.map;
  }
  if (document.getElementById("btn-rights")) {
    document.getElementById("btn-rights").textContent = t.rights;
  }
  if (pageKey === "report") {
    if (document.getElementById("formTitle")) document.getElementById("formTitle").textContent = t.formTitle;
    if (document.getElementById("labelLocation")) document.getElementById("labelLocation").textContent = t.labelLocation;
    if (document.getElementById("labelType")) document.getElementById("labelType").textContent = t.labelType;
    if (document.getElementById("labelTime")) document.getElementById("labelTime").textContent = t.labelTime;
    if (document.getElementById("labelNotes")) document.getElementById("labelNotes").textContent = t.labelNotes;
    if (document.getElementById("optSelect")) document.getElementById("optSelect").textContent = t.selectOne;
    if (document.getElementById("location")) document.getElementById("location").placeholder = t.placeholderLocation;
    if (document.getElementById("timeSeen")) document.getElementById("timeSeen").placeholder = t.placeholderTime;
    if (document.getElementById("notes")) document.getElementById("notes").placeholder = t.placeholderNotes;
    if (document.getElementById("submitBtn")) document.getElementById("submitBtn").textContent = t.submitBtn;
    if (document.getElementById("backButton")) document.getElementById("backButton").textContent = t.backBtn;
  }
}

function triggerEmergency() {
  const lang = getLang();
  const alertText = translations.shared[lang]?.panicAlert || translations.shared["es"].panicAlert;
  alert(alertText);
}
