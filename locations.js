// locations.js - 100% O'zbekiston viloyat va shaharlari (O'MI taqvimi)

export const PROVINCES = {
  tashkent_vil: {
    id: "tashkent_vil",
    name: "Toshkent shahri va viloyati",
    cities: {
      tashkent: { id: "tashkent", name: "Toshkent shahri", slug: "Toshkent" },
      angren: { id: "angren", name: "Angren", slug: "Angren" },
      bekabad: { id: "bekabad", name: "Bekobod", slug: "Bekobod" },
      chirchiq: { id: "chirchiq", name: "Chirchiq", slug: "Chirchiq" },
      olmaliq: { id: "olmaliq", name: "Olmaliq", slug: "Olmaliq" },
      yangiyol: { id: "yangiyol", name: "Yangiyo'l", slug: "Yangiyol" },
      parkent: { id: "parkent", name: "Parkent", slug: "Parkent" },
      bostanliq: { id: "bostanliq", name: "Bo'stonliq", slug: "Bostanliq" }
    }
  },
  samarkand_vil: {
    id: "samarkand_vil",
    name: "Samarqand viloyati",
    cities: {
      samarkand: { id: "samarkand", name: "Samarqand shahri", slug: "Samarqand" },
      kattakurgan: { id: "kattakurgan", name: "Kattaqo'rg'on", slug: "Kattaqorgon" },
      urgut: { id: "urgut", name: "Urgut", slug: "Urgut" },
      ishtixon: { id: "ishtixon", name: "Ishtixon", slug: "Ishtixon" },
      jomboy: { id: "jomboy", name: "Jomboy", slug: "Jomboy" }
    }
  },
  andijan_vil: {
    id: "andijan_vil",
    name: "Andijon viloyati",
    cities: {
      andijan: { id: "andijan", name: "Andijon shahri", slug: "Andijon" },
      asaka: { id: "asaka", name: "Asaka", slug: "Asaka" },
      xonobod: { id: "xonobod", name: "Xonobod", slug: "Xonobod" },
      shahrixon: { id: "shahrixon", name: "Shahrixon", slug: "Shahrixon" },
      qorgontepa: { id: "qorgontepa", name: "Qo'rg'ontepa", slug: "Qorgontepa" }
    }
  },
  fergana_vil: {
    id: "fergana_vil",
    name: "Farg'ona viloyati",
    cities: {
      fergana: { id: "fergana", name: "Farg'ona shahri", slug: "Fargona" },
      kokand: { id: "kokand", name: "Qo'qon", slug: "Qoqon" },
      margilan: { id: "margilan", name: "Marg'ilon", slug: "Margilon" },
      quvasoy: { id: "quvasoy", name: "Quvasoy", slug: "Quvasoy" },
      rishton: { id: "rishton", name: "Rishton", slug: "Rishton" }
    }
  },
  namangan_vil: {
    id: "namangan_vil",
    name: "Namangan viloyati",
    cities: {
      namangan: { id: "namangan", name: "Namangan shahri", slug: "Namangan" },
      chust: { id: "chust", name: "Chust", slug: "Chust" },
      chortoq: { id: "chortoq", name: "Chortoq", slug: "Chortoq" },
      kosonsoy: { id: "kosonsoy", name: "Kosonsoy", slug: "Kosonsoy" },
      pop: { id: "pop", name: "Pop", slug: "Pop" }
    }
  },
  bukhara_vil: {
    id: "bukhara_vil",
    name: "Buxoro viloyati",
    cities: {
      bukhara: { id: "bukhara", name: "Buxoro shahri", slug: "Buxoro" },
      gijduvon: { id: "gijduvon", name: "G'ijduvon", slug: "Gijduvon" },
      kogon: { id: "kogon", name: "Kogon", slug: "Kogon" },
      qorakol: { id: "qorakol", name: "Qorako'l", slug: "Qorakol" },
      shofirkon: { id: "shofirkon", name: "Shofirkon", slug: "Shofirkon" }
    }
  },
  navoiy_vil: {
    id: "navoiy_vil",
    name: "Navoiy viloyati",
    cities: {
      navoiy: { id: "navoiy", name: "Navoiy shahri", slug: "Navoiy" },
      zarafshan: { id: "zarafshan", name: "Zarafshon", slug: "Zarafshon" },
      uchquduq: { id: "uchquduq", name: "Uchquduq", slug: "Uchquduq" },
      nurota: { id: "nurota", name: "Nurota", slug: "Nurota" }
    }
  },
  qashqadaryo_vil: {
    id: "qashqadaryo_vil",
    name: "Qashqadaryo viloyati",
    cities: {
      qarshi: { id: "qarshi", name: "Qarshi shahri", slug: "Qarshi" },
      shahrisabz: { id: "shahrisabz", name: "Shahrisabz", slug: "Shahrisabz" },
      muborak: { id: "muborak", name: "Muborak", slug: "Muborak" },
      koson: { id: "koson", name: "Koson", slug: "Koson" },
      guzor: { id: "guzor", name: "G'uzor", slug: "Guzor" }
    }
  },
  surxondaryo_vil: {
    id: "surxondaryo_vil",
    name: "Surxondaryo viloyati",
    cities: {
      termiz: { id: "termiz", name: "Termiz shahri", slug: "Termiz" },
      denov: { id: "denov", name: "Denov", slug: "Denov" },
      boysun: { id: "boysun", name: "Boysun", slug: "Boysun" },
      sherobod: { id: "sherobod", name: "Sherobod", slug: "Sherobod" }
    }
  },
  xorazm_vil: {
    id: "xorazm_vil",
    name: "Xorazm viloyati",
    cities: {
      urgench: { id: "urgench", name: "Urganch shahri", slug: "Urganch" },
      khiva: { id: "khiva", name: "Xiva", slug: "Xiva" },
      xonqa: { id: "xonqa", name: "Xonqa", slug: "Xonqa" },
      hazorasp: { id: "hazorasp", name: "Hazorasp", slug: "Hazorasp" }
    }
  },
  qoraqalpogiston: {
    id: "qoraqalpogiston",
    name: "Qoraqalpog'iston Respublikasi",
    cities: {
      nukus: { id: "nukus", name: "Nukus shahri", slug: "Nukus" },
      tortkol: { id: "tortkol", name: "To'rtko'l", slug: "Tortkol" },
      beruniy: { id: "beruniy", name: "Beruniy", slug: "Beruniy" },
      xojayli: { id: "xojayli", name: "Xo'jayli", slug: "Xojayli" },
      qongirot: { id: "qongirot", name: "Qo'ng'irot", slug: "Qongirot" },
      chimboy: { id: "chimboy", name: "Chimboy", slug: "Chimboy" },
      moynoq: { id: "moynoq", name: "Mo'ynoq", slug: "Moynoq" }
    }
  },
  jizzax_vil: {
    id: "jizzax_vil",
    name: "Jizzax viloyati",
    cities: {
      jizzakh: { id: "jizzakh", name: "Jizzax shahri", slug: "Jizzax" },
      zomin: { id: "zomin", name: "Zomin", slug: "Zomin" },
      gallaorol: { id: "gallaorol", name: "G'allaorol", slug: "Gallaorol" }
    }
  },
  sirdaryo_vil: {
    id: "sirdaryo_vil",
    name: "Sirdaryo viloyati",
    cities: {
      guliston: { id: "guliston", name: "Guliston shahri", slug: "Guliston" },
      yangiyer: { id: "yangiyer", name: "Yangiyer", slug: "Yangiyer" },
      shirin: { id: "shirin", name: "Shirin", slug: "Shirin" }
    }
  }
};

export const COUNTRIES = {
  uz: {
    id: "uz",
    name: "🇺🇿 O'zbekiston",
    provinces: PROVINCES
  }
};

export function findLocationByCity(cityId) {
  for (const [pKey, province] of Object.entries(PROVINCES)) {
    if (province.cities[cityId]) {
      return {
        countryKey: "uz",
        provinceKey: pKey,
        cityKey: cityId,
        city: province.cities[cityId]
      };
    }
  }
  return {
    countryKey: "uz",
    provinceKey: "tashkent_vil",
    cityKey: "tashkent",
    city: PROVINCES.tashkent_vil.cities.tashkent
  };
}

export function getAllCitiesMap() {
  const map = {};
  for (const province of Object.values(PROVINCES)) {
    for (const [cId, city] of Object.entries(province.cities)) {
      map[cId] = city;
    }
  }
  return map;
}
