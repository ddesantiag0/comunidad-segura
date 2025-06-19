// scripts/lang.js

const supportedLanguages = ["es", "en", "zh", "vi", "tl", "ar"];

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
      report: "🚨 报告 ICE 活动",
      map: "📍 查看 ICE 地图",
      rights: "🛡️ 知道你的权利 (PDF)"
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
      types: {
        patrol: "Patrulla",
        checkpoint: "Punto de control",
        raid: "Redada",
        other: "Otra"
      },
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
      types: {
        patrol: "Patrol",
        checkpoint: "Checkpoint",
        raid: "Raid",
        other: "Other"
      },
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
    },
    zh: {
      types: {
        patrol: "巡逻",
        checkpoint: "检查站",
        raid: "突袭",
        other: "其他"
      },
      formTitle: "🚨 报告 ICE 活动",
      labelLocation: "📍 地址或位置（可选但有帮助）",
      labelType: "⚠️ 活动类型",
      labelTime: "🕒 大致时间（如已知）",
      labelNotes: "📄 备注（可选）",
      selectOne: "请选择",
      placeholderLocation: "例如：123 Main St, Los Angeles, CA",
      placeholderTime: "例如：今天上午10:30",
      placeholderNotes: "描述你所看到的内容...",
      submitBtn: "提交报告",
      thanks: "✅ 谢谢！我们已收到您的报告。",
      backBtn: "← 返回"
    },
    vi: {
      types: {
        patrol: "Tuần tra",
        checkpoint: "Trạm kiểm soát",
        raid: "Cuộc truy quét",
        other: "Khác"
      },
      formTitle: "🚨 Báo Cáo Hoạt Động ICE",
      labelLocation: "📍 Địa điểm hoặc địa chỉ (tùy chọn nhưng hữu ích)",
      labelType: "⚠️ Loại hoạt động",
      labelTime: "🕒 Thời gian gần đúng (nếu biết)",
      labelNotes: "📄 Ghi chú (tùy chọn)",
      selectOne: "Chọn một",
      placeholderLocation: "VD: 123 Main St, Los Angeles, CA",
      placeholderTime: "VD: 10:30 sáng, hôm nay",
      placeholderNotes: "Mô tả những gì bạn đã thấy...",
      submitBtn: "Gửi Báo Cáo",
      thanks: "✅ Cảm ơn bạn! Báo cáo của bạn đã được gửi.",
      backBtn: "← Quay lại"
    },
    tl: {
      types: {
        patrol: "Patrulya",
        checkpoint: "Checkpoint",
        raid: "Ratsya",
        other: "Iba pa"
      },
      formTitle: "🚨 I-report ang Aktibidad ng ICE",
      labelLocation: "📍 Lokasyon o address (opsyonal ngunit kapaki-pakinabang)",
      labelType: "⚠️ Uri ng aktibidad",
      labelTime: "🕒 Tinatayang oras (kung alam)",
      labelNotes: "📄 Mga Komento (opsyonal)",
      selectOne: "Pumili ng isa",
      placeholderLocation: "Hal: 123 Main St, Los Angeles, CA",
      placeholderTime: "Hal: 10:30 AM, ngayon",
      placeholderNotes: "Ilarawan kung ano ang iyong nakita...",
      submitBtn: "Isumite ang Ulat",
      thanks: "✅ Salamat! Natanggap na ang iyong ulat.",
      backBtn: "← Bumalik"
    },
    ar: {
      types: {
        patrol: "دورية",
        checkpoint: "نقطة تفتيش",
        raid: "مداهمة",
        other: "أخرى"
      },
      formTitle: "🚨 إبلاغ عن نشاط ICE",
      labelLocation: "📍 الموقع أو العنوان (اختياري ولكن مفيد)",
      labelType: "⚠️ نوع النشاط",
      labelTime: "🕒 الوقت التقريبي (إذا كنت تعرفه)",
      labelNotes: "📄 تعليقات (اختياري)",
      selectOne: "اختر واحدًا",
      placeholderLocation: "مثال: 123 Main St, Los Angeles, CA",
      placeholderTime: "مثال: 10:30 صباحًا، اليوم",
      placeholderNotes: "صف ما رأيته...",
      submitBtn: "إرسال التقرير",
      thanks: "✅ شكرًا لك! تم استلام تقريرك.",
      backBtn: "← رجوع"
    }
  },
settings: {
  en: {
    title: "Emergency Contacts",
    instructions: "Add up to 3 emergency contacts to be notified in an emergency.",
    nameLabel: "Name",
    phoneLabel: "Phone Number",
    saveBtn: "Save Contacts",
    backBtn: "← Back",
    saved: "✅ Contacts saved successfully."
  },
  es: {
    title: "Contactos de Emergencia",
    instructions: "Agrega hasta 3 contactos de emergencia para ser notificados en una emergencia.",
    nameLabel: "Nombre",
    phoneLabel: "Número de Teléfono",
    saveBtn: "Guardar Contactos",
    backBtn: "← Volver",
    saved: "✅ Contactos guardados correctamente."
  },
  zh: {
    title: "紧急联系人",
    instructions: "添加最多 3 个紧急联系人以在紧急情况下通知他们。",
    nameLabel: "姓名",
    phoneLabel: "电话号码",
    saveBtn: "保存联系人",
    backBtn: "← 返回",
    saved: "✅ 联系人已成功保存。"
  },
  vi: {
    title: "Liên Hệ Khẩn Cấp",
    instructions: "Thêm tối đa 3 liên hệ khẩn cấp để được thông báo trong trường hợp khẩn cấp.",
    nameLabel: "Tên",
    phoneLabel: "Số điện thoại",
    saveBtn: "Lưu liên hệ",
    backBtn: "← Quay lại",
    saved: "✅ Đã lưu liên hệ thành công."
  },
  tl: {
    title: "Mga Emergency Contact",
    instructions: "Magdagdag ng hanggang 3 emergency contact na tatawagan sa oras ng emergency.",
    nameLabel: "Pangalan",
    phoneLabel: "Numero ng Telepono",
    saveBtn: "I-save ang Mga Contact",
    backBtn: "← Bumalik",
    saved: "✅ Matagumpay na na-save ang mga contact."
  },
  ar: {
    title: "جهات الاتصال في حالات الطوارئ",
    instructions: "أضف ما يصل إلى 3 جهات اتصال للطوارئ ليتم إخطارهم في حالة الطوارئ.",
    nameLabel: "الاسم",
    phoneLabel: "رقم الهاتف",
    saveBtn: "احفظ جهات الاتصال",
    backBtn: "← رجوع",
    saved: "✅ تم حفظ جهات الاتصال بنجاح."
  }
},

  map: {
    es: { backBtn: "← Volver", unknown: "Actividad desconocida", noAddress: "Sin dirección" },
    en: { backBtn: "← Back", unknown: "Unknown activity", noAddress: "No address provided" },
    zh: { backBtn: "← 返回", unknown: "未知活动", noAddress: "没有提供地址" },
    vi: { backBtn: "← Quay lại", unknown: "Hoạt động không xác định", noAddress: "Không có địa chỉ" },
    tl: { backBtn: "← Bumalik", unknown: "Hindi alam na aktibidad", noAddress: "Walang address" },
    ar: { backBtn: "← رجوع", unknown: "نشاط غير معروف", noAddress: "لا يوجد عنوان" }
  },
  shared: {
  en: {
    panicAlert: "🚨 EMERGENCY: Contacting your emergency contacts and showing your legal rights...",
    configure: "⚙️ Configure Emergency Contacts",
    trigger: "🚨 Trigger Emergency"
  },
  es: {
    panicAlert: "🚨 EMERGENCIA: Contactando a tus contactos de emergencia y mostrando tus derechos legales...",
    configure: "⚙️ Configurar Contactos de Emergencia",
    trigger: "🚨 Activar Emergencia"
  },
  zh: {
    panicAlert: "🚨 紧急情况：正在联系您的紧急联系人并显示您的法律权利...",
    configure: "⚙️ 配置紧急联系人",
    trigger: "🚨 启动紧急模式"
  },
  vi: {
    panicAlert: "🚨 KHẨN CẤP: Đang liên hệ với các liên hệ khẩn cấp của bạn và hiển thị quyền hợp pháp của bạn...",
    configure: "⚙️ Cấu hình liên hệ khẩn cấp",
    trigger: "🚨 Kích hoạt khẩn cấp"
  },
  tl: {
    panicAlert: "🚨 EMERGENCY: Nakikipag-ugnayan sa iyong mga emergency contact at ipinapakita ang iyong mga legal na karapatan...",
    configure: "⚙️ I-configure ang Mga Emergency Contact",
    trigger: "🚨 I-trigger ang Emergency"
  },
  ar: {
    panicAlert: "🚨 طارئ: يتم الاتصال بجهات الاتصال الخاصة بك وعرض حقوقك القانونية...",
    configure: "⚙️ إعداد جهات الاتصال في حالات الطوارئ",
    trigger: "🚨 تفعيل الطوارئ"
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

  if (document.getElementById("title")) document.getElementById("title").textContent = t.title;
  if (document.getElementById("description")) document.getElementById("description").textContent = t.description;
  if (document.getElementById("btn-report")) document.getElementById("btn-report").textContent = t.report;
  if (document.getElementById("btn-map")) document.getElementById("btn-map").textContent = t.map;
  if (document.getElementById("btn-rights")) document.getElementById("btn-rights").textContent = t.rights;

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

    const typeOptions = document.querySelector("#activityType");
    if (typeOptions && translations["report"][lang].types) {
      const typeMap = translations["report"][lang].types;
      const options = typeOptions.options;
      for (let i = 0; i < options.length; i++) {
        const val = options[i].value;
        if (val && typeMap[val]) {
          options[i].textContent = typeMap[val];
        }
      }
    }
  }

  if (pageKey === "map" && document.getElementById("backButton")) {
    document.getElementById("backButton").textContent = t.backBtn;
  }

  if (pageKey === "settings") {
    if (document.getElementById("title")) document.getElementById("title").textContent = t.title;
    if (document.getElementById("instructions")) document.getElementById("instructions").textContent = t.instructions;
    if (document.getElementById("saveBtn")) document.getElementById("saveBtn").textContent = t.saveBtn;
    if (document.getElementById("backButton")) document.getElementById("backButton").textContent = t.backBtn;
    for (let i = 1; i <= 3; i++) {
      if (document.getElementById(`nameLabel${i}`)) document.getElementById(`nameLabel${i}`).textContent = t.nameLabel;
      if (document.getElementById(`phoneLabel${i}`)) document.getElementById(`phoneLabel${i}`).textContent = t.phoneLabel;
    }
  }
}

function triggerEmergency() {
  const lang = getLang();
  const alertText = translations.shared[lang]?.panicAlert || translations.shared["en"].panicAlert;

  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0,0,0,0.6)";
  modal.style.zIndex = "9999";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";

  const box = document.createElement("div");
  box.style.background = "white";
  box.style.padding = "2rem";
  box.style.borderRadius = "10px";
  box.style.maxWidth = "400px";
  box.style.textAlign = "center";
  box.innerHTML = `
    <p style="font-size: 1.2rem;">🚨 <strong>${alertText}</strong></p>
    <div style="margin-top: 1rem;">
      <button onclick="window.location.href='settings.html'" style="margin: 0.5rem;">⚙️ ${lang === "es" ? "Configurar Contactos de Emergencia" : "Configure Emergency Contacts"}</button>
      <button onclick="handleEmergencyTrigger()" style="margin: 0.5rem;">🚨 ${lang === "es" ? "Activar Emergencia" : "Trigger Emergency"}</button>
    </div>
  `;

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = lang === "es" ? "Cancelar" : "Cancel";
  cancelBtn.style.marginTop = "1rem";
  cancelBtn.onclick = () => document.body.removeChild(modal);

  box.appendChild(cancelBtn);
  modal.appendChild(box);
  document.body.appendChild(modal);
}

function handleEmergencyTrigger() {
  const contacts = JSON.parse(localStorage.getItem("emergencyContacts") || "[]");
  if (contacts.length === 0) {
    alert("⚠️ No emergency contacts found. Please set them up first.");
    window.location.href = "settings.html";
    return;
  }

  const message = contacts.map((c, i) => `${i + 1}. ${c.name} - ${c.phone}`).join("\n");
  alert("🚨 Alerting the following contacts:\n\n" + message + "\n\n(This would send messages in a real system.)");

  // Optionally: trigger logic like sending SMS via Twilio or Firebase Functions
}
