// prayerTimes.js - O'zbekiston va xalqaro davlatlar namoz vaqtlari

import { getAllCitiesMap } from './locations.js';

export const REGIONS = getAllCitiesMap();

export const PRAYER_NAMES = {
  Fajr: "Bomdod",
  Sunrise: "Quyosh",
  Dhuhr: "Peshin",
  Asr: "Asr",
  Maghrib: "Shom",
  Isha: "Xufton"
};

export const SOURCES = {
  muslim_uz: {
    id: "muslim_uz",
    name: "O'zbekiston Musulmonlari Idorasi",
    method: 3,
    country: "Uzbekistan"
  },
  diyanet: {
    id: "diyanet",
    name: "Turkiya Diyonat (Diyanet)",
    method: 13,
    country: "Turkey"
  },
  umm_al_qura: {
    id: "umm_al_qura",
    name: "Saudiya Arabistoni (Umm al-Qura, Makka)",
    method: 4,
    country: "Saudi Arabia"
  },
  dum_rf: {
    id: "dum_rf",
    name: "Rossiya Musulmonlari Diniy Nazorati (DUM RF)",
    method: 14,
    country: "Russia"
  },
  egypt: {
    id: "egypt",
    name: "Misr Fatvo Mahkamasi (Egyptian Authority)",
    method: 5,
    country: "Egypt"
  },
  dubai: {
    id: "dubai",
    name: "Dubay va BAA (Awqaf)",
    method: 16,
    country: "United Arab Emirates"
  },
  isna: {
    id: "isna",
    name: "Shimoliy Amerika (ISNA - AQSH / Kanada)",
    method: 2,
    country: "United States"
  },
  mwl: {
    id: "mwl",
    name: "Dunyo Islom Markazi (Muslim World League)",
    method: 3,
    country: "Uzbekistan"
  }
};

const HIJRI_MONTHS = [
  "Muharram", "Safar", "Rabi'ul avval", "Rabi'us soniy",
  "Jumodul avval", "Jumodus soniy", "Rajab", "Sha'bon",
  "Ramazon", "Shavvol", "Zulqa'da", "Zulhijja"
];

function formatHijri(raw) {
  if (!raw) return '';
  const parts = String(raw).split('-');
  if (parts.length === 3) {
    const day = parts[0];
    const mIdx = parseInt(parts[1], 10) - 1;
    const year = parts[2];
    if (mIdx >= 0 && mIdx < 12) {
      return `${day} ${HIJRI_MONTHS[mIdx]} ${year}h`;
    }
  }
  return raw;
}

export function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 1. Rasmiy O'zbekiston taqvimi (namoz-vaqti.uz - O'MI)
 */
async function fetchOfficialUzbekistan(regionSlug, todayKey) {
  const url = `https://namoz-vaqti.uz/index.php?format=json&region=${encodeURIComponent(regionSlug)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Status: ${res.status}`);
  const data = await res.json();

  if (data && data.today && data.today.times) {
    const t = data.today.times;
    return {
      Fajr: t.bomdod,
      Sunrise: t.quyosh,
      Dhuhr: t.peshin,
      Asr: t.asr,
      Maghrib: t.shom,
      Isha: t.xufton,
      date: todayKey,
      city: data.meta?.region?.name || regionSlug,
      source: "O'zbekiston Musulmonlari Idorasi",
      sourceId: "muslim_uz",
      hijri: "21 Safar 1448h"
    };
  }
  throw new Error("Ma'lumot topilmadi");
}

/**
 * 2. Xalqaro davlatlar hisob-kitobi (Turkiya Diyonat, Saudiya, Rossiya, Misr, BAA, ISNA, MWL)
 */
async function fetchInternationalMethod(cityName, countryName, methodId = 3, todayKey) {
  const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(cityName)}&country=${encodeURIComponent(countryName)}&method=${methodId}&school=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API status: ${res.status}`);
  const json = await res.json();

  if (json && json.data && json.data.timings) {
    const raw = json.data.timings;
    return {
      Fajr: raw.Fajr.substring(0, 5),
      Sunrise: raw.Sunrise.substring(0, 5),
      Dhuhr: raw.Dhuhr.substring(0, 5),
      Asr: raw.Asr.substring(0, 5),
      Maghrib: raw.Maghrib.substring(0, 5),
      Isha: raw.Isha.substring(0, 5),
      date: todayKey,
      city: cityName,
      source: "Xalqaro hisob-kitob",
      sourceId: String(methodId),
      hijri: formatHijri(json.data.date?.hijri?.date) || ''
    };
  }
  throw new Error("Xalqaro taqvim topilmadi");
}

/**
 * Asosiy yuklovchi funksiya
 */
export async function fetchPrayerTimes(regionKey = 'tashkent', sourceKey = 'muslim_uz') {
  const region = REGIONS[regionKey] || REGIONS.tashkent;
  const sourceDef = SOURCES[sourceKey] || SOURCES.muslim_uz;
  const todayKey = getTodayKey();
  const cacheKey = `prayer_v3_${regionKey}_${sourceKey}_${todayKey}`;

  // 1. Keshni tekshirish
  try {
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      const cached = await chrome.storage.local.get([cacheKey]);
      if (cached && cached[cacheKey]) {
        return cached[cacheKey];
      }
    }
  } catch (e) {
    console.warn("Kesh xatosi:", e);
  }

  // 2. Tanlangan mintaqa va manba bo'yicha olish
  try {
    let result = null;

    // Agar O'zbekiston shahri bo'lsa va O'MI tanlangan bo'lsa
    if (region.country === 'Uzbekistan' && sourceKey === 'muslim_uz') {
      try {
        result = await fetchOfficialUzbekistan(region.slug, todayKey);
      } catch (err) {
        console.warn("namoz-vaqti.uz yuklanmadi, xalqaro manba sinab ko'rilmoqda:", err);
        result = await fetchInternationalMethod(region.name, region.country, 3, todayKey);
      }
    } else {
      // Turkiya, Saudiya, Rossiya, Misr, BAA, AQSH, Qozog'iston, Tojikiston, Qirg'iziston...
      const method = sourceDef.method || 3;
      result = await fetchInternationalMethod(region.name, region.country, method, todayKey);
    }

    if (result) {
      if (typeof chrome !== 'undefined' && chrome.storage?.local) {
        await chrome.storage.local.set({ [cacheKey]: result });
      }
      return result;
    }
  } catch (e) {
    console.error("Yuklashda xatolik:", e);
  }

  // 3. Zaxira qiymat
  return {
    Fajr: "04:29",
    Sunrise: "05:51",
    Dhuhr: "12:22",
    Asr: "16:58",
    Maghrib: "18:57",
    Isha: "20:15",
    date: todayKey,
    city: region.name,
    source: sourceDef.name,
    sourceId: sourceKey,
    fallback: true
  };
}

export function getNextPrayer(timings) {
  const now = new Date();
  const prayersOrder = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

  for (const prayer of prayersOrder) {
    const timeStr = timings[prayer];
    if (!timeStr) continue;

    const [hours, minutes] = timeStr.split(':').map(Number);
    const prayerDate = new Date();
    prayerDate.setHours(hours, minutes, 0, 0);

    if (prayerDate > now) {
      const diffMs = prayerDate.getTime() - now.getTime();
      return {
        key: prayer,
        name: PRAYER_NAMES[prayer],
        time: timeStr,
        targetDate: prayerDate,
        diffMs: diffMs
      };
    }
  }

  // Ertangi Bomdod
  const [fajrHours, fajrMinutes] = (timings.Fajr || "04:29").split(':').map(Number);
  const tomorrowFajr = new Date();
  tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
  tomorrowFajr.setHours(fajrHours, fajrMinutes, 0, 0);

  return {
    key: "Fajr",
    name: PRAYER_NAMES.Fajr + " (ertaga)",
    time: timings.Fajr,
    targetDate: tomorrowFajr,
    diffMs: tomorrowFajr.getTime() - now.getTime()
  };
}
