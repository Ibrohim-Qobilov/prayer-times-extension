// popup.js - Kafolatlangan yuklanish, Dark/Light/Auto mavzu, 3 bosqichli joylashuv

import { fetchPrayerTimes, getNextPrayer } from './prayerTimes.js';
import { TRANSLATIONS } from './i18n.js';
import { COUNTRIES, findLocationByCity } from './locations.js';

let countdownInterval = null;
let currentTimings = null;
let currentLang = 'uz_lat';

// Standart rasmiy vaqtlar (Tarmoq kutmasdan darhol ko'rsatish uchun)
const DEFAULT_TIMINGS = {
  Fajr: "04:29",
  Sunrise: "05:51",
  Dhuhr: "12:22",
  Asr: "16:58",
  Maghrib: "18:57",
  Isha: "20:15",
  hijri: "21 Safar 1448h",
  city: "Toshkent shahri"
};

// Sozlamalarni olish
async function loadSettings() {
  const defaults = {
    city: 'tashkent',
    source: 'muslim_uz',
    soundType: 'soft_chime',
    iconStyle: 'v1_emerald',
    lang: 'uz_lat',
    theme: 'dark',
    volume: 0.8
  };
  try {
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      const res = await chrome.storage.local.get(['settings']);
      return res.settings ? { ...defaults, ...res.settings } : defaults;
    }
  } catch (e) {
    console.warn("Storage xatosi:", e);
  }
  return defaults;
}

// Sozlamalarni saqlash
async function saveSettings(newSettings) {
  const current = await loadSettings();
  const updated = { ...current, ...newSettings };
  if (typeof chrome !== 'undefined' && chrome.storage?.local) {
    await chrome.storage.local.set({ settings: updated });
    chrome.runtime?.sendMessage?.({ type: 'RELOAD_ALARMS' });
  }
  return updated;
}

// Mavzu (Dark, Light, Auto) tatbiq qilish
function applyTheme(theme = 'dark') {
  let activeTheme = theme;
  if (theme === 'auto') {
    activeTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  document.documentElement.setAttribute('data-theme', activeTheme);
}

// Sana ko'rinishlarini yangilash (Milodiy va Hijriy)
function updateDates(hijriText) {
  const hijriElem = document.getElementById('hijriDate');
  const gregElem = document.getElementById('gregorianDate');

  if (hijriElem) {
    hijriElem.textContent = hijriText || (currentTimings && currentTimings.hijri) || "21 Safar 1448h";
  }

  if (gregElem) {
    const now = new Date();
    const day = now.getDate();
    const months = {
      uz_lat: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"],
      uz_cyr: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
      qr: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr"],
      kz: ["қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым", "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан"],
      kg: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
      tj: ["январ", "феврал", "март", "апрел", "май", "июн", "июл", "август", "сентябр", "октябр", "ноябр", "декабр"],
      tr: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
      ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
      en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    };

    const monthList = months[currentLang] || months.uz_lat;
    const mName = monthList[now.getMonth()];

    if (currentLang === 'en') {
      gregElem.textContent = `${mName} ${day}`;
    } else if (currentLang.startsWith('uz') || currentLang === 'qr') {
      gregElem.textContent = `${day}-${mName}`;
    } else {
      gregElem.textContent = `${day} ${mName}`;
    }
  }
}

const LANG_DATA = {
  uz_lat: { flag: '🇺🇿', text: "O'zbekcha (Lotin)", isImg: false },
  uz_cyr: { flag: '🇺🇿', text: "Ўзбекча (Кирилл)", isImg: false },
  qr: { flag: 'icons/flags/qr.png', text: "Qaraqalpaqsha", isImg: true },
  kz: { flag: '🇰🇿', text: "Қазақша", isImg: false },
  kg: { flag: '🇰🇬', text: "Кыргызча", isImg: false },
  tj: { flag: '🇹🇯', text: "Тоҷикӣ", isImg: false },
  tr: { flag: '🇹🇷', text: "Türkçe", isImg: false },
  ru: { flag: '🇷🇺', text: "Русский", isImg: false },
  en: { flag: '🇬🇧', text: "English", isImg: false }
};

function updateLangUI(lang) {
  const display = document.getElementById('selectedLangDisplay');
  const data = LANG_DATA[lang] || LANG_DATA.uz_lat;
  if (display) {
    if (data.isImg) {
      display.innerHTML = `<img src="${data.flag}" class="flag-badge-img" alt="Qaraqalpaqstan"> <span class="lang-label-text">${data.text}</span>`;
    } else {
      display.innerHTML = `<span class="flag-badge">${data.flag}</span> <span class="lang-label-text">${data.text}</span>`;
    }
  }

  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-lang') === lang);
  });

  const langSelect = document.getElementById('langSelect');
  if (langSelect) langSelect.value = lang;
}

// Tilni butun interfeysga tatbiq etish
function applyTranslations(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.uz_lat;
  currentLang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  document.documentElement.lang = lang.startsWith('uz') ? 'uz' : lang;
  updateDates();
  updateLangUI(lang);
}

// Vaqtlarni HTML elementlariga yozish
function applyTimings(timings) {
  if (!timings) return;
  currentTimings = timings;

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.uz_lat;
  const prayers = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const now = new Date();

  prayers.forEach(p => {
    const timeElem = document.getElementById(`time-${p}`);
    const statusElem = document.getElementById(`status-${p}`);
    const row = document.querySelector(`.prayer-row[data-prayer="${p}"]`);

    if (timeElem && timings[p]) {
      timeElem.textContent = timings[p];
    }

    if (row && timings[p]) {
      const [h, m] = timings[p].split(':').map(Number);
      const pDate = new Date();
      pDate.setHours(h, m, 0, 0);

      row.classList.remove('passed', 'current');
      if (statusElem) statusElem.textContent = '';

      if (pDate < now) {
        row.classList.add('passed');
        if (statusElem) statusElem.textContent = t.passed;
      }
    }
  });

  updateDates(timings.hijri);
  startCountdown();
}

// Jonli Countdown (ortga hisoblash)
function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);

  function update() {
    if (!currentTimings) return;
    const next = getNextPrayer(currentTimings);
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.uz_lat;

    const nameElem = document.getElementById('nextPrayerName');
    const timeElem = document.getElementById('nextPrayerTime');
    const timerElem = document.getElementById('countdownTimer');

    const prayerKeyLower = next.key.toLowerCase();
    const localizedPrayerName = t[prayerKeyLower] || next.name;

    if (nameElem) nameElem.textContent = localizedPrayerName;
    if (timeElem) timeElem.textContent = next.time || '--:--';

    // Qatorni belgilash
    document.querySelectorAll('.prayer-row').forEach(r => r.classList.remove('current'));
    const activeRow = document.querySelector(`.prayer-row[data-prayer="${next.key}"]`);
    if (activeRow) {
      activeRow.classList.add('current');
      const statusElem = document.getElementById(`status-${next.key}`);
      if (statusElem) statusElem.textContent = t.next;
    }

    if (next.diffMs <= 0) {
      render();
      return;
    }

    const totalSeconds = Math.max(0, Math.floor(next.diffMs / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = n => String(n).padStart(2, '0');
    if (timerElem) {
      timerElem.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
  }

  update();
  countdownInterval = setInterval(update, 1000);
}

// 3 Bosqichli Joylashuv dropdownlarini to'ldirish
function setupLocationDropdowns(currentCityId) {
  const countrySelect = document.getElementById('countrySelect');
  const provinceSelect = document.getElementById('provinceSelect');
  const citySelect = document.getElementById('citySelect');

  if (!countrySelect || !provinceSelect || !citySelect) return;

  const locInfo = findLocationByCity(currentCityId);

  // 1. Davlatlarni to'ldirish
  countrySelect.innerHTML = '';
  for (const [cKey, country] of Object.entries(COUNTRIES)) {
    const opt = document.createElement('option');
    opt.value = cKey;
    opt.textContent = country.name;
    if (cKey === locInfo.countryKey) opt.selected = true;
    countrySelect.appendChild(opt);
  }

  // 2. Viloyatlarni to'ldirish funksiyasi
  function populateProvinces(cKey, selectedPKey) {
    provinceSelect.innerHTML = '';
    const country = COUNTRIES[cKey];
    if (!country) return;

    let firstPKey = null;
    for (const [pKey, province] of Object.entries(country.provinces)) {
      if (!firstPKey) firstPKey = pKey;
      const opt = document.createElement('option');
      opt.value = pKey;
      opt.textContent = province.name;
      if (pKey === selectedPKey) opt.selected = true;
      provinceSelect.appendChild(opt);
    }
    return selectedPKey || firstPKey;
  }

  // 3. Shaharlarni to'ldirish funksiyasi
  function populateCities(cKey, pKey, selectedCityKey) {
    citySelect.innerHTML = '';
    const country = COUNTRIES[cKey];
    if (!country) return;
    const province = country.provinces[pKey];
    if (!province) return;

    let firstCityKey = null;
    for (const [cId, cityObj] of Object.entries(province.cities)) {
      if (!firstCityKey) firstCityKey = cId;
      const opt = document.createElement('option');
      opt.value = cId;
      opt.textContent = cityObj.name;
      if (cId === selectedCityKey) opt.selected = true;
      citySelect.appendChild(opt);
    }
    return selectedCityKey || firstCityKey;
  }

  // Boshlang'ich to'ldirish
  const activePKey = populateProvinces(locInfo.countryKey, locInfo.provinceKey);
  populateCities(locInfo.countryKey, activePKey, currentCityId);

  // Davlat o'zgarganda
  countrySelect.onchange = async () => {
    const newCountryKey = countrySelect.value;
    const newCountry = COUNTRIES[newCountryKey];
    const newPKey = populateProvinces(newCountryKey);
    const newCityKey = populateCities(newCountryKey, newPKey);

    let newSource = newCountry.defaultSource || 'muslim_uz';
    const sourceSelect = document.getElementById('sourceSelect');
    if (sourceSelect) sourceSelect.value = newSource;

    await saveSettings({ city: newCityKey, source: newSource });
    await render();
  };

  // Viloyat o'zgarganda
  provinceSelect.onchange = async () => {
    const cKey = countrySelect.value;
    const pKey = provinceSelect.value;
    const newCityKey = populateCities(cKey, pKey);

    await saveSettings({ city: newCityKey });
    await render();
  };

  // Shahar o'zgarganda
  citySelect.onchange = async () => {
    const newCityKey = citySelect.value;
    await saveSettings({ city: newCityKey });
    await render();
  };
}

// Yuqori chap burchakdagi bosh logoni ham tanlangan ikonka bilan yangilash
function updateBrandIcon(iconStyle = 'v1_emerald') {
  const brandImg = document.getElementById('brandIconImg');
  if (brandImg) {
    brandImg.src = `icons/variants/${iconStyle}_48.png`;
  }
}

// Asosiy render funksiyasi
async function render() {
  const settings = await loadSettings();

  // 1. Mavzuni qo'llash (Dark, Light, Auto)
  applyTheme(settings.theme || 'dark');

  // 2. Tilni qo'llash
  applyTranslations(settings.lang || 'uz_lat');

  // 3. Joylashuv dropdownlarini sozlash
  setupLocationDropdowns(settings.city || 'tashkent');

  // 4. Dastlab darhol zaxira/kesh vaqtlarini chizamiz
  if (!currentTimings) {
    applyTimings(DEFAULT_TIMINGS);
  }

  // Sozlamalarni UI elementlariga o'rnatish
  const sourceSelect = document.getElementById('sourceSelect');
  const soundSelect = document.getElementById('soundSelect');
  const langSelect = document.getElementById('langSelect');
  const volumeSlider = document.getElementById('volumeSlider');
  const volumeValue = document.getElementById('volumeValue');

  if (sourceSelect) sourceSelect.value = settings.source;
  if (soundSelect) soundSelect.value = settings.soundType;
  if (langSelect && settings.lang) langSelect.value = settings.lang;
  if (volumeSlider) {
    volumeSlider.value = Math.round(settings.volume * 100);
    if (volumeValue) volumeValue.textContent = `${Math.round(settings.volume * 100)}%`;
  }

  // Segmented mavzu tugmalarini faollashtirish
  const currentTheme = settings.theme || 'dark';
  document.querySelectorAll('.theme-segment-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-theme') === currentTheme);
  });

  // Vizual ikonka kartochkalarini faollashtirish
  const currentIcon = settings.iconStyle || 'v1_emerald';
  document.querySelectorAll('.icon-card-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-icon') === currentIcon);
  });

  // 6. Headerdagi asosiy logoni ham yangilash
  updateBrandIcon(currentIcon);

  // 5. Tanlangan shahar bo'yicha vaqtlarni olish
  try {
    const fetched = await fetchPrayerTimes(settings.city, settings.source);
    if (fetched) {
      applyTimings(fetched);
    }
  } catch (err) {
    console.warn("Vaqtlarni yuklashda ogohlantirish:", err);
  }
}

// Hodisalarni ulash
function setupEvents() {
  const settingsBtn = document.getElementById('settingsBtn');
  const closeSettingsBtn = document.getElementById('closeSettingsBtn');
  const mainView = document.getElementById('mainView');
  const settingsView = document.getElementById('settingsView');
  const sourceSelect = document.getElementById('sourceSelect');
  const soundSelect = document.getElementById('soundSelect');
  const langSelect = document.getElementById('langSelect');
  const volumeSlider = document.getElementById('volumeSlider');
  const volumeValue = document.getElementById('volumeValue');
  const testSoundBtn = document.getElementById('testSoundBtn');
  const testNotificationBtn = document.getElementById('testNotificationBtn');

  // Sozlamalar oynasi ochish
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      if (mainView) mainView.classList.add('hidden');
      if (settingsView) settingsView.classList.remove('hidden');
    });
  }

  // Sozlamalarni yopish
  if (closeSettingsBtn) {
    closeSettingsBtn.addEventListener('click', () => {
      if (settingsView) settingsView.classList.add('hidden');
      if (mainView) mainView.classList.remove('hidden');
    });
  }

  // Segmented Mavzu (Tema) tugmalari
  document.querySelectorAll('.theme-segment-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const newTheme = btn.getAttribute('data-theme');
      await saveSettings({ theme: newTheme });
      applyTheme(newTheme);
      document.querySelectorAll('.theme-segment-btn').forEach(b => {
        b.classList.toggle('active', b === btn);
      });
    });
  });

  // Tizim mavzusi o'zgarganda (agar Avto rejimda bo'lsa)
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', async () => {
      const settings = await loadSettings();
      if (settings.theme === 'auto') {
        applyTheme('auto');
      }
    });
  }

  // Vizual Ikonka kartochkalari
  document.querySelectorAll('.icon-card-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const iconStyle = btn.getAttribute('data-icon');
      await saveSettings({ iconStyle });
      document.querySelectorAll('.icon-card-btn').forEach(b => {
        b.classList.toggle('active', b === btn);
      });

      updateBrandIcon(iconStyle);

      try {
        if (typeof chrome !== 'undefined' && chrome.action?.setIcon) {
          await chrome.action.setIcon({
            path: {
              "16": `icons/variants/${iconStyle}_16.png`,
              "48": `icons/variants/${iconStyle}_48.png`,
              "128": `icons/variants/${iconStyle}_128.png`
            }
          });
        }
      } catch (err) {
        console.warn("Icon xatosi:", err);
      }
    });
  });

  // Maxsus bayroqli til dropdowni
  const langDropdown = document.getElementById('langDropdown');
  const langDropdownBtn = document.getElementById('langDropdownBtn');
  const langDropdownMenu = document.getElementById('langDropdownMenu');

  if (langDropdownBtn && langDropdownMenu) {
    langDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = langDropdownMenu.classList.contains('hidden');
      langDropdownMenu.classList.toggle('hidden', !isHidden);
      if (langDropdown) langDropdown.classList.toggle('open', isHidden);
    });

    document.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', async (e) => {
        e.stopPropagation();
        const selectedLang = item.getAttribute('data-lang');
        await saveSettings({ lang: selectedLang });
        updateLangUI(selectedLang);
        applyTranslations(selectedLang);
        if (currentTimings) {
          applyTimings(currentTimings);
        }
        langDropdownMenu.classList.add('hidden');
        if (langDropdown) langDropdown.classList.remove('open');
      });
    });

    document.addEventListener('click', () => {
      if (langDropdownMenu) langDropdownMenu.classList.add('hidden');
      if (langDropdown) langDropdown.classList.remove('open');
    });
  }

  // Zaxira oddiy select hodisasi
  if (langSelect) {
    langSelect.addEventListener('change', async (e) => {
      const newLang = e.target.value;
      await saveSettings({ lang: newLang });
      applyTranslations(newLang);
      if (currentTimings) {
        applyTimings(currentTimings);
      }
    });
  }

  // Hisoblash manbasi o'zgarganda
  if (sourceSelect) {
    sourceSelect.addEventListener('change', async (e) => {
      await saveSettings({ source: e.target.value });
      await render();
    });
  }

  // Ovoz tanlanganda
  if (soundSelect) {
    soundSelect.addEventListener('change', async (e) => {
      await saveSettings({ soundType: e.target.value });
    });
  }



  // Ovoz balandligi
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      if (volumeValue) volumeValue.textContent = `${e.target.value}%`;
    });
    volumeSlider.addEventListener('change', async (e) => {
      await saveSettings({ volume: Number(e.target.value) / 100 });
    });
  }

  // Ovozni sinash
  let testAudio = null;
  if (testSoundBtn) {
    testSoundBtn.addEventListener('click', () => {
      const soundType = soundSelect ? soundSelect.value : 'soft_chime';
      const volume = volumeSlider ? Number(volumeSlider.value) / 100 : 0.8;

      if (soundType !== 'mute') {
        try {
          if (testAudio) {
            testAudio.pause();
            testAudio.currentTime = 0;
          }
          testAudio = new Audio(`audio/${soundType}.wav`);
          testAudio.volume = Math.max(0, Math.min(1, volume));
          testAudio.play().catch(e => console.warn("Audio play:", e));
        } catch (e) {
          console.warn(e);
        }
      }

      if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
        chrome.runtime.sendMessage({
          type: 'TEST_SOUND',
          soundType: soundType,
          volume: volume
        });
      }
    });
  }

  // Xabarnomani sinash
  if (testNotificationBtn) {
    testNotificationBtn.addEventListener('click', () => {
      const soundType = soundSelect ? soundSelect.value : 'soft_chime';
      const volume = volumeSlider ? Number(volumeSlider.value) / 100 : 0.8;
      if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
        chrome.runtime.sendMessage({
          type: 'TEST_NOTIFICATION',
          soundType: soundType,
          volume: volume
        });
      }
    });
  }
}

// Ishga tushirish (DOM kutmasdan darhol)
function init() {
  setupEvents();
  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
