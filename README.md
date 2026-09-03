# 🕌 Prayer Times — Chrome Extension

<p align="center">
  <img src="icons/icon128.png" width="96" height="96" alt="Prayer Times Logo" style="border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.25);" />
</p>

<p align="center">
  <b>Daqiqasigacha aniq namoz vaqtlari, jonli ortga hisoblash va mayin ovozli eslatmalar.</b><br>
  <i>Ultra-zamonaviy Apple/Vercel minimalist dizayni, 9 ta til va Manifest V3 arxitekturasi.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Manifest-V3-10b981?style=flat-square" alt="Manifest V3">
  <img src="https://img.shields.io/badge/Platform-Chrome%20%7C%20Edge%20%7C%20Brave-blue?style=flat-square" alt="Browsers">
  <img src="https://img.shields.io/badge/Languages-9%20ta%20til-f59e0b?style=flat-square" alt="9 Languages">
  <img src="https://img.shields.io/badge/Privacy-100%25%20Local-0ea5e9?style=flat-square" alt="Privacy First">
  <img src="https://img.shields.io/badge/License-MIT-gray?style=flat-square" alt="License">
</p>

---

## 📖 Dastur haqida (Overview)

**Prayer Times** — kundalik ibodatlarni o'z vaqtida bajarishda ko'maklashuvchi, brauzer orqa fonda yopiq bo'lsa ham ish stoli bildirishnomalari va mayin ovozli signallar bilan eslatib turuvchi zamonaviy Google Chrome kengaytmasi.

Kengaytma ortiqcha yuklamalardan holi, batareya va xotirani tejovchi sof **Vanilla JavaScript (ES Modules)** va **Chrome Extension Manifest V3** standartlari asosida yaratilgan.

---

## ✨ Asosiy Imkoniyatlar (Features)

* 🎯 **100% Aniq vaqtlar:** O'zbekiston Musulmonlari Idorasining rasmiy taqvimiga daqiqasigacha mos.
* ⏳ **Jonli Ortga Hisoblash (Live Countdown):** Keyingi namozgacha qolgan vaqt soniyalarigacha aniq hisoblab boriladi.
* 📍 **O‘zbekistonning barcha 14 ta hududi va 210+ tuman/shaharlari:**
  * Toshkent shahri, Toshkent viloyati, Samarqand, Andijon, Farg‘ona, Namangan, Buxoro, Navoiy, Qashqadaryo, Surxondaryo, Xorazm, Jizzax, Sirdaryo hamda Qoraqalpog‘iston Respublikasining barcha tumanlarigacha daqiqasigacha aniq O‘MI rasmiy taqvimi.
* 🌐 **9 ta Til qo‘llab-quvvatlanadi:**
  * 🇺🇿 O‘zbekcha (Lotin)
  * 🇺🇿 Ўзбекча (Кирилл)
  * <img src="icons/flags/qr.png" width="18" height="13" alt="Qoraqalpog‘iston bayrog‘i" style="vertical-align: middle;" /> Qaraqalpaqsha
  * 🇰🇿 Қазақша
  * 🇰🇬 Кыргызча
  * 🇹🇯 Тоҷикӣ
  * 🇹🇷 Türkçe
  * 🇷🇺 Русский
  * 🇬🇧 English
* 🎨 **Mavzular (Themes):** 🌙 Qorong'u (Dark), ☀️ Yorug' (Light) va ⚡ Avto (Tizimga moslashuvchi).
* 🖼️ **Zamonaviy Apple-uslubidagi Ikonkalar (Squircle):**
  * *🟢 Zumrad Hilol*, *🕌 Oltin Masjid*, *🌅 Shom Shafag'i*, *💠 Islomiy Yulduz*.
  * Sozlamalardan tanlangan ikonka real vaqtda yuqori burchakdagi bosh logoda ham aks etadi.
* 📅 **Ikki tomonlama sana:** Milodiy va Hijriy sanalar birgalikda (`3-sentabr · 21 Safar 1448h`).
* 🔔 **Mayin Ovozli Eslatmalar:** Azon va takbir o'rniga ish va ta'lim jarayoniga xalaqit bermaydigan mayin musiqiy signallar (*Shamol qo'ng'irog'i, Arfa, Sokin Pianino, Gong, Marimba, Tamchi*) va ovozsiz rejim.
* 🔒 **100% Maxfiylik (Privacy First):** Hech qanday shaxsiy ma'lumotlar serverga yuborilmaydi, analitika yoki kuzatuvchi kodlar yo'q.

---

## 📡 Ma'lumot manbai (Official Data Source)

* 🏛️ **Rasmiy manba:** O'zbekiston Musulmonlari Idorasi (O'MI / `muslim.uz`).
* 🔗 **API portali:** [namoz-vaqti.uz](https://namoz-vaqti.uz/) — O'zbekiston Respublikasi Vazirlar Mahkamasi huzuridagi Din ishlari bo'yicha qo'mita ma'lumotlariga asoslangan rasmiy davlat taqvimi.
* 📍 **Qamrov:** Toshkent shahri, Toshkent viloyati, Samarqand, Andijon, Farg'ona, Namangan, Buxoro, Navoiy, Qashqadaryo, Surxondaryo, Xorazm, Jizzax, Sirdaryo hamda Qoraqalpog'iston Respublikasi (barcha shahar va tumanlar).
* 🛡️ **Hech qanday uchinchi tomon yoki chet el API'lari ishlatilmaydi:** Dastur faqat O'zbekistonning rasmiy tasdiqlangan taqvimi bilan 100% daqiqasigacha mos ishlaydi.

---

## 📁 Loyiha tuzilishi (Project Structure)

```text
prayer-times-extension/
├── manifest.json       # Chrome Manifest V3 konfiguratsiyasi
├── popup.html          # Asosiy popap interfeysi
├── popup.css           # Apple/Vercel minimalist dizayn stillari
├── popup.js            # Interfeys boshqaruvi va hodisalar
├── prayerTimes.js      # API integratsiyasi va hisoblash mantiqi
├── locations.js        # 3 bosqichli davlat, viloyat va shaharlar bazasi
├── i18n.js             # 9 ta til tarjima lug'ati (uz, qr, kz, kg, tj, tr, ru, en)
├── background.js       # Fon xizmati (Service Worker, Alarms, Notifications)
├── offscreen.html      # Fon audio ijrosi uchun offscreen konteyner
├── offscreen.js        # Audio pleyer
├── audio/              # Mayin ovozli bildirishnoma signallari (.wav)
└── icons/              # Kengaytma logotiplari va bayroqlar
    ├── variants/       # 4 xil zamonaviy Squircle ikonka to'plamlari
    └── flags/          # Maxsus Retina bayroqlar (Qoraqalpog'iston va b.)
```

---

## 🚀 O'rnatish qo'llanmasi (Installation)

### Dasturchi rejimida o'rnatish:
1. Ushbu repozitoriyni yuklab oling yoki klon qiling:
   ```bash
   git clone https://github.com/Ibrohim-Qobilov/prayer-times-extension.git
   ```
2. Google Chrome (yoki Brave / Edge) brauzerini oching va manzil qatoriga kiriting:
   ```text
   chrome://extensions
   ```
3. O'ng yuqori burchakdagi **"Developer mode" (Dasturchi rejimi)** tugmasini yoqing.
4. Chap tarafdagi **"Load unpacked" (Yuklangan paketni ochish)** tugmasini bosing.
5. `prayer-times-extension` papkasini tanlang.
6. Kengaytma tayyor! Brauzer asboblar panelidagi qadash (pin) tugmasini bosing.

---

## 🛡️ Xavfsizlik va Maxfiylik (Privacy & Security)

* Kengaytma foydalanuvchining hech qanday shaxsiy ma'lumotini (ism, email, cookie, tarix) yig'maydi.
* Barcha sozlamalar (tanlangan shahar, ovoz, mavzu) faqat brauzerning ichki `chrome.storage.local` xotirasida saqlanadi.
* Tashqi tarmoq murojaatlari faqatgina namoz vaqtlari jadvalini olish uchun rasmiy API'larga qilinadi.

---

## 👤 Muallif (Author)

* **Ibrohim Qobilov** — [@Ibrohim-Qobilov](https://github.com/Ibrohim-Qobilov)

---

## 📄 Litsenziya (License)

Ushbu loyiha [MIT](LICENSE) litsenziyasi asosida tarqatiladi. Foydalanish va o'rganish uchun mutlaqo ochiq.
