// prayerTimes.js - 100% O'zbekiston Musulmonlari Idorasi (O'MI) rasmiy taqvimi

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

export function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Rasmiy O'zbekiston Musulmonlari Idorasi taqvimi (namoz-vaqti.uz)
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
 * Asosiy yuklovchi funksiya
 */
export async function fetchPrayerTimes(regionKey = 'tashkent') {
  const region = REGIONS[regionKey] || REGIONS.tashkent;
  const todayKey = getTodayKey();
  const cacheKey = `prayer_omi_${regionKey}_${todayKey}`;

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

  // 2. Rasmiy API'dan olish
  try {
    const result = await fetchOfficialUzbekistan(region.slug || 'Toshkent', todayKey);
    if (result) {
      if (typeof chrome !== 'undefined' && chrome.storage?.local) {
        await chrome.storage.local.set({ [cacheKey]: result });
      }
      return result;
    }
  } catch (err) {
    console.warn("namoz-vaqti.uz yuklashda xatolik:", err);
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
    city: region.name || "Toshkent shahri",
    source: "O'zbekiston Musulmonlari Idorasi",
    sourceId: "muslim_uz",
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
