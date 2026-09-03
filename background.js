// background.js - Fon xizmati (Service Worker)

import { fetchPrayerTimes, PRAYER_NAMES } from './prayerTimes.js';

const ALARM_PERIODIC_CHECK = 'periodic_prayer_check';

// Extension o'rnatilganda yoki brauzer ishga tushganda
chrome.runtime.onInstalled.addListener(() => {
  console.log("Namoz vaqtlari kengaytmasi ishga tushdi");
  setupAlarms();
  // Har 30 daqiqada jadvalni yangilab turish
  chrome.alarms.create(ALARM_PERIODIC_CHECK, { periodInMinutes: 30 });
});

chrome.runtime.onStartup.addListener(() => {
  setupAlarms();
});

// Sozlamalarni o'qish
async function getSettings() {
  const defaults = {
    city: 'tashkent',
    source: 'muslim_uz', // O'MI yoki mwl (Dunyo Islom Markazi)
    soundType: 'azan',
    volume: 0.8
  };
  try {
    const res = await chrome.storage.local.get(['settings']);
    return res.settings ? { ...defaults, ...res.settings } : defaults;
  } catch {
    return defaults;
  }
}

// Bugungi namozlar uchun signallarni (Alarms) rejalashtirish
export async function setupAlarms() {
  const settings = await getSettings();
  const timings = await fetchPrayerTimes(settings.city);
  if (!timings) return;

  const now = new Date();
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  for (const prayer of prayers) {
    const timeStr = timings[prayer];
    if (!timeStr) continue;

    const [hours, minutes] = timeStr.split(':').map(Number);
    const prayerTime = new Date();
    prayerTime.setHours(hours, minutes, 0, 0);

    const alarmName = `prayer_${prayer}_${timeStr}`;

    // Faqat hali o'tib ketmagan vaqtlar uchun alarm qo'yamiz
    if (prayerTime.getTime() > now.getTime()) {
      chrome.alarms.create(alarmName, {
        when: prayerTime.getTime()
      });
      console.log(`Rejalashtirildi: ${prayer} - ${timeStr}`);
    }
  }
}

// Offscreen audio hujjatini faollashtirish
async function ensureOffscreenDocument() {
  const existing = await chrome.offscreen.hasDocument?.();
  if (existing) return;

  try {
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: ['AUDIO_PLAYBACK'],
      justification: 'Namoz vaqti ovozli xabarnomasini ijro etish'
    });
  } catch (err) {
    console.warn("Offscreen yaratishda xato (ehtimol allaqachon mavjud):", err);
  }
}

// Ovoz ijro etish
async function playAudio(soundType, volume) {
  if (soundType === 'mute') return;
  await ensureOffscreenDocument();
  chrome.runtime.sendMessage({
    type: 'PLAY_SOUND',
    soundType: soundType,
    volume: volume
  }).catch(err => console.log("Ovoz yuborishda:", err));
}

// Tizimli bildirishnoma chiqarish
function showNotification(title, message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: title,
    message: message,
    priority: 2,
    requireInteraction: true // Foydalanuvchi ko'rguncha ekranda turadi
  });
}

// Alarms hodisalari
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === ALARM_PERIODIC_CHECK) {
    await setupAlarms();
    return;
  }

  if (alarm.name.startsWith('prayer_')) {
    const parts = alarm.name.split('_');
    const prayerKey = parts[1];
    const timeStr = parts[2] || '';
    const prayerName = PRAYER_NAMES[prayerKey] || prayerKey;

    const settings = await getSettings();

    // 1. Tizimli bildirishnoma (brauzer minimallashtirilgan bo'lsa ham ekranda chiqadi)
    showNotification(
      `🕌 ${prayerName} namozi vaqti kirdi!`,
      `Vaqt: ${timeStr}. Mintaqa: ${settings.city.toUpperCase()}`
    );

    // 2. Tanlangan ovozni chalish (Azon, mayin ohang yoki qo'ng'iroq)
    await playAudio(settings.soundType, settings.volume);
  }
});

// Popup bilan muloqot (Test qilish va qayta yuklash)
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === 'RELOAD_ALARMS') {
    setupAlarms().then(() => sendResponse({ ok: true }));
    return true;
  }

  if (req.type === 'TEST_NOTIFICATION') {
    getSettings().then(settings => {
      showNotification(
        "🕌 Sinov bildirishnomasi",
        `Namoz vaqtlari xabarnomasi muvaffaqiyatli ishlamoqda (${settings.soundType})`
      );
      playAudio(req.soundType || settings.soundType, req.volume ?? settings.volume);
      sendResponse({ ok: true });
    });
    return true;
  }

  if (req.type === 'TEST_SOUND') {
    playAudio(req.soundType, req.volume).then(() => sendResponse({ ok: true }));
    return true;
  }
});
