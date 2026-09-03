// locations.js - Davlat -> Viloyat/Hudud -> Shahar 3 bosqichli ierarxiya

export const COUNTRIES = {
  uz: {
    id: "uz",
    name: "🇺🇿 O'zbekiston",
    defaultSource: "muslim_uz",
    provinces: {
      tashkent_vil: {
        id: "tashkent_vil",
        name: "Toshkent shahri va viloyati",
        cities: {
          tashkent: { id: "tashkent", name: "Toshkent shahri", slug: "Toshkent", country: "Uzbekistan" },
          angren: { id: "angren", name: "Angren", slug: "Angren", country: "Uzbekistan" },
          bekabad: { id: "bekabad", name: "Bekobod", slug: "Bekobod", country: "Uzbekistan" },
          chirchiq: { id: "chirchiq", name: "Chirchiq", slug: "Chirchiq", country: "Uzbekistan" },
          olmaliq: { id: "olmaliq", name: "Olmaliq", slug: "Olmaliq", country: "Uzbekistan" }
        }
      },
      samarkand_vil: {
        id: "samarkand_vil",
        name: "Samarqand viloyati",
        cities: {
          samarkand: { id: "samarkand", name: "Samarqand shahri", slug: "Samarqand", country: "Uzbekistan" },
          kattakurgan: { id: "kattakurgan", name: "Kattaqo'rg'on", slug: "Kattaqo'rg'on", country: "Uzbekistan" },
          urgut: { id: "urgut", name: "Urgut", slug: "Urgut", country: "Uzbekistan" }
        }
      },
      andijan_vil: {
        id: "andijan_vil",
        name: "Andijon viloyati",
        cities: {
          andijan: { id: "andijan", name: "Andijon shahri", slug: "Andijon", country: "Uzbekistan" },
          asaka: { id: "asaka", name: "Asaka", slug: "Asaka", country: "Uzbekistan" },
          xonobod: { id: "xonobod", name: "Xonobod", slug: "Xonobod", country: "Uzbekistan" }
        }
      },
      fergana_vil: {
        id: "fergana_vil",
        name: "Farg'ona viloyati",
        cities: {
          fergana: { id: "fergana", name: "Farg'ona shahri", slug: "Farg'ona", country: "Uzbekistan" },
          kokand: { id: "kokand", name: "Qo'qon", slug: "Qo'qon", country: "Uzbekistan" },
          margilan: { id: "margilan", name: "Marg'ilon", slug: "Marg'ilon", country: "Uzbekistan" },
          rishton: { id: "rishton", name: "Rishton", slug: "Rishton", country: "Uzbekistan" }
        }
      },
      namangan_vil: {
        id: "namangan_vil",
        name: "Namangan viloyati",
        cities: {
          namangan: { id: "namangan", name: "Namangan shahri", slug: "Namangan", country: "Uzbekistan" },
          chust: { id: "chust", name: "Chust", slug: "Chust", country: "Uzbekistan" },
          pop: { id: "pop", name: "Pop", slug: "Pop", country: "Uzbekistan" }
        }
      },
      bukhara_vil: {
        id: "bukhara_vil",
        name: "Buxoro viloyati",
        cities: {
          bukhara: { id: "bukhara", name: "Buxoro shahri", slug: "Buxoro", country: "Uzbekistan" },
          gijduvon: { id: "gijduvon", name: "G'ijduvon", slug: "G'ijduvon", country: "Uzbekistan" },
          qorakol: { id: "qorakol", name: "Qorako'l", slug: "Qorako'l", country: "Uzbekistan" }
        }
      },
      navoiy_vil: {
        id: "navoiy_vil",
        name: "Navoiy viloyati",
        cities: {
          navoiy: { id: "navoiy", name: "Navoiy shahri", slug: "Navoiy", country: "Uzbekistan" },
          zarafshan: { id: "zarafshan", name: "Zarafshon", slug: "Zarafshon", country: "Uzbekistan" }
        }
      },
      qashqadaryo_vil: {
        id: "qashqadaryo_vil",
        name: "Qashqadaryo viloyati",
        cities: {
          qarshi: { id: "qarshi", name: "Qarshi shahri", slug: "Qarshi", country: "Uzbekistan" },
          shahrisabz: { id: "shahrisabz", name: "Shahrisabz", slug: "Shahrisabz", country: "Uzbekistan" },
          muborak: { id: "muborak", name: "Muborak", slug: "Muborak", country: "Uzbekistan" }
        }
      },
      surxondaryo_vil: {
        id: "surxondaryo_vil",
        name: "Surxondaryo viloyati",
        cities: {
          termiz: { id: "termiz", name: "Termiz shahri", slug: "Termiz", country: "Uzbekistan" },
          denov: { id: "denov", name: "Denov", slug: "Denov", country: "Uzbekistan" },
          boysun: { id: "boysun", name: "Boysun", slug: "Boysun", country: "Uzbekistan" }
        }
      },
      xorazm_vil: {
        id: "xorazm_vil",
        name: "Xorazm viloyati",
        cities: {
          urgench: { id: "urgench", name: "Urganch shahri", slug: "Urganch", country: "Uzbekistan" },
          khiva: { id: "khiva", name: "Xiva", slug: "Xiva", country: "Uzbekistan" }
        }
      },
      qoraqalpogiston: {
        id: "qoraqalpogiston",
        name: "Qoraqalpog'iston Respublikasi",
        cities: {
          nukus: { id: "nukus", name: "Nukus shahri", slug: "Nukus", country: "Uzbekistan" },
          tortkol: { id: "tortkol", name: "To'rtko'l", slug: "To'rtko'l", country: "Uzbekistan" }
        }
      },
      jizzax_vil: {
        id: "jizzax_vil",
        name: "Jizzax viloyati",
        cities: {
          jizzakh: { id: "jizzakh", name: "Jizzax shahri", slug: "Jizzax", country: "Uzbekistan" },
          zomin: { id: "zomin", name: "Zomin", slug: "Zomin", country: "Uzbekistan" }
        }
      },
      sirdaryo_vil: {
        id: "sirdaryo_vil",
        name: "Sirdaryo viloyati",
        cities: {
          guliston: { id: "guliston", name: "Guliston shahri", slug: "Guliston", country: "Uzbekistan" },
          yangiyer: { id: "yangiyer", name: "Yangiyer", slug: "Yangiyer", country: "Uzbekistan" }
        }
      }
    }
  },
  kz: {
    id: "kz",
    name: "🇰🇿 Qozog'iston",
    defaultSource: "mwl",
    provinces: {
      astana_city: {
        id: "astana_city",
        name: "Ostona shahri",
        cities: { astana: { id: "astana", name: "Ostona (Astana)", slug: "Astana", country: "Kazakhstan" } }
      },
      almaty_city: {
        id: "almaty_city",
        name: "Olmaota shahri",
        cities: { almaty: { id: "almaty", name: "Olmaota (Almaty)", slug: "Almaty", country: "Kazakhstan" } }
      },
      shymkent_city: {
        id: "shymkent_city",
        name: "Chimkent shahri",
        cities: { shymkent: { id: "shymkent", name: "Chimkent", slug: "Shymkent", country: "Kazakhstan" } }
      },
      karaganda_vil: {
        id: "karaganda_vil",
        name: "Qarag'andi viloyati",
        cities: { karaganda: { id: "karaganda", name: "Qarag'andi", slug: "Karaganda", country: "Kazakhstan" } }
      },
      aktobe_vil: {
        id: "aktobe_vil",
        name: "Aqto'be viloyati",
        cities: { aktobe: { id: "aktobe", name: "Aqto'be", slug: "Aktobe", country: "Kazakhstan" } }
      }
    }
  },
  kg: {
    id: "kg",
    name: "🇰🇬 Qirg'iziston",
    defaultSource: "mwl",
    provinces: {
      chuy_vil: {
        id: "chuy_vil",
        name: "Chuy viloyati va Bishkek",
        cities: { bishkek: { id: "bishkek", name: "Bishkek", slug: "Bishkek", country: "Kyrgyzstan" } }
      },
      osh_vil: {
        id: "osh_vil",
        name: "O'sh viloyati",
        cities: { osh: { id: "osh", name: "O'sh shahri", slug: "Osh", country: "Kyrgyzstan" } }
      },
      jalalabad_vil: {
        id: "jalalabad_vil",
        name: "Jalolobod viloyati",
        cities: { jalalabad: { id: "jalalabad", name: "Jalolobod", slug: "Jalal-Abad", country: "Kyrgyzstan" } }
      }
    }
  },
  tj: {
    id: "tj",
    name: "🇹🇯 Tojikiston",
    defaultSource: "mwl",
    provinces: {
      dushanbe_city: {
        id: "dushanbe_city",
        name: "Dushanbe shahri",
        cities: { dushanbe: { id: "dushanbe", name: "Dushanbe", slug: "Dushanbe", country: "Tajikistan" } }
      },
      sogd_vil: {
        id: "sogd_vil",
        name: "So'g'd viloyati",
        cities: {
          khujand: { id: "khujand", name: "Xo'jand", slug: "Khujand", country: "Tajikistan" },
          panjakent: { id: "panjakent", name: "Panjakent", slug: "Panjakent", country: "Tajikistan" }
        }
      },
      khatlon_vil: {
        id: "khatlon_vil",
        name: "Xatlon viloyati",
        cities: { bokhtar: { id: "bokhtar", name: "Boxtar", slug: "Bokhtar", country: "Tajikistan" } }
      }
    }
  },
  tr: {
    id: "tr",
    name: "🇹🇷 Turkiya",
    defaultSource: "diyanet",
    provinces: {
      marmara_reg: {
        id: "marmara_reg",
        name: "Marmara mintaqasi",
        cities: {
          istanbul: { id: "istanbul", name: "Istanbul", slug: "Istanbul", country: "Turkey" },
          bursa: { id: "bursa", name: "Bursa", slug: "Bursa", country: "Turkey" }
        }
      },
      ic_anadolu_reg: {
        id: "ic_anadolu_reg",
        name: "Ichki Anadolu",
        cities: {
          ankara: { id: "ankara", name: "Ankara", slug: "Ankara", country: "Turkey" },
          konya: { id: "konya", name: "Konya", slug: "Konya", country: "Turkey" }
        }
      },
      ege_reg: {
        id: "ege_reg",
        name: "Egey mintaqasi",
        cities: { izmir: { id: "izmir", name: "Izmir", slug: "Izmir", country: "Turkey" } }
      },
      akdeniz_reg: {
        id: "akdeniz_reg",
        name: "O'rta yer dengizi",
        cities: { antalya: { id: "antalya", name: "Antalya", slug: "Antalya", country: "Turkey" } }
      }
    }
  },
  ru: {
    id: "ru",
    name: "🇷🇺 Rossiya",
    defaultSource: "dum_rf",
    provinces: {
      moscow_region: {
        id: "moscow_region",
        name: "Moskva mintaqasi",
        cities: { moscow: { id: "moscow", name: "Moskva", slug: "Moscow", country: "Russia" } }
      },
      spb_region: {
        id: "spb_region",
        name: "Sankt-Peterburg mintaqasi",
        cities: { spb: { id: "spb", name: "Sankt-Peterburg", slug: "Saint Petersburg", country: "Russia" } }
      },
      tatarstan_region: {
        id: "tatarstan_region",
        name: "Tatariston",
        cities: { kazan: { id: "kazan", name: "Qozon (Kazan)", slug: "Kazan", country: "Russia" } }
      },
      bashkortostan_region: {
        id: "bashkortostan_region",
        name: "Boshqirdiston",
        cities: { ufa: { id: "ufa", name: "Ufa", slug: "Ufa", country: "Russia" } }
      }
    }
  },
  sa: {
    id: "sa",
    name: "🇸🇦 Saudiya Arabistoni",
    defaultSource: "umm_al_qura",
    provinces: {
      makkah_region: {
        id: "makkah_region",
        name: "Makka viloyati",
        cities: {
          makkah: { id: "makkah", name: "Makka", slug: "Makkah", country: "Saudi Arabia" },
          jeddah: { id: "jeddah", name: "Jidda", slug: "Jeddah", country: "Saudi Arabia" }
        }
      },
      madinah_region: {
        id: "madinah_region",
        name: "Madina viloyati",
        cities: { madinah: { id: "madinah", name: "Madina", slug: "Madinah", country: "Saudi Arabia" } }
      },
      riyadh_region: {
        id: "riyadh_region",
        name: "Riyoz viloyati",
        cities: { riyadh: { id: "riyadh", name: "Riyoz", slug: "Riyadh", country: "Saudi Arabia" } }
      }
    }
  },
  ae: {
    id: "ae",
    name: "🇦🇪 BAA",
    defaultSource: "dubai",
    provinces: {
      dubai_emirate: {
        id: "dubai_emirate",
        name: "Dubay amirligi",
        cities: { dubai_city: { id: "dubai_city", name: "Dubay", slug: "Dubai", country: "United Arab Emirates" } }
      },
      abudhabi_emirate: {
        id: "abudhabi_emirate",
        name: "Abu-Dabi amirligi",
        cities: { abudhabi: { id: "abudhabi", name: "Abu-Dabi", slug: "Abu Dhabi", country: "United Arab Emirates" } }
      }
    }
  },
  world: {
    id: "world",
    name: "🌍 Boshqa davlatlar",
    defaultSource: "mwl",
    provinces: {
      europe_reg: {
        id: "europe_reg",
        name: "Yevropa",
        cities: {
          london: { id: "london", name: "London (UK)", slug: "London", country: "United Kingdom" },
          berlin: { id: "berlin", name: "Berlin (Germaniya)", slug: "Berlin", country: "Germany" },
          paris: { id: "paris", name: "Parij (Fransiya)", slug: "Paris", country: "France" }
        }
      },
      americas_reg: {
        id: "americas_reg",
        name: "Shimoliy Amerika",
        cities: {
          newyork: { id: "newyork", name: "Nyu-York (AQSH)", slug: "New York", country: "United States" },
          toronto: { id: "toronto", name: "Toronto (Kanada)", slug: "Toronto", country: "Canada" }
        }
      },
      asia_reg: {
        id: "asia_reg",
        name: "Sharqiy Osiyo",
        cities: {
          seoul: { id: "seoul", name: "Seul (Janubiy Koreya)", slug: "Seoul", country: "South Korea" },
          tokyo: { id: "tokyo", name: "Tokio (Yaponiya)", slug: "Tokyo", country: "Japan" }
        }
      }
    }
  }
};

// Shahar ID bo'yicha qidirish
export function findLocationByCity(cityId) {
  for (const [cKey, country] of Object.entries(COUNTRIES)) {
    for (const [pKey, province] of Object.entries(country.provinces)) {
      if (province.cities[cityId]) {
        return {
          countryKey: cKey,
          countryName: country.name,
          provinceKey: pKey,
          provinceName: province.name,
          city: province.cities[cityId]
        };
      }
    }
  }
  // Standart Toshkent
  return {
    countryKey: "uz",
    countryName: "🇺🇿 O'zbekiston",
    provinceKey: "tashkent_vil",
    provinceName: "Toshkent shahri va viloyati",
    city: COUNTRIES.uz.provinces.tashkent_vil.cities.tashkent
  };
}

// Barcha shaharlarni yassi (flat) xarita sifatida olish
export function getAllCitiesMap() {
  const map = {};
  for (const country of Object.values(COUNTRIES)) {
    for (const province of Object.values(country.provinces)) {
      for (const [cId, cityObj] of Object.entries(province.cities)) {
        map[cId] = cityObj;
      }
    }
  }
  return map;
}
