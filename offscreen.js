// offscreen.js - Haqiqiy to'liq va qisqa azon hamda turli audio fayllarni ijro etish

const SOUND_FILES = {
  // Haqiqiy inson ovozidagi azonlar
  azan_full: 'audio/azan_full.m4a',    // To'liq azon (boshidan oxirigacha ~3 daqiqa)
  azan_short: 'audio/azan_short.m4a',  // Qisqa azon (28 soniya)
  azan_real: 'audio/azan_short.m4a',
  azan: 'audio/azan_short.m4a',
  takbeer: 'audio/takbeer.wav',

  // Mayin musiqiy ohanglar
  soft_chime: 'audio/soft_chime.wav',
  chime: 'audio/soft_chime.wav',
  harp: 'audio/harp.wav',
  piano: 'audio/piano.wav',
  gong: 'audio/gong.wav',

  // Qisqa signallar
  digital_bell: 'audio/digital_bell.wav',
  bell: 'audio/digital_bell.wav',
  marimba: 'audio/marimba.wav',
  pulse: 'audio/pulse.wav'
};

let currentAudio = null;

function playLocalSound(soundType, volume = 0.8) {
  if (soundType === 'mute') return;

  const fileName = SOUND_FILES[soundType] || SOUND_FILES.azan_short;
  const audioUrl = chrome.runtime.getURL(fileName);

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(audioUrl);
  currentAudio.volume = Math.max(0, Math.min(1, volume));
  currentAudio.play().catch(err => {
    console.error("Audio ijro etishda xatolik:", err);
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PLAY_SOUND') {
    const { soundType = 'azan_short', volume = 0.8 } = message;
    playLocalSound(soundType, volume);
    sendResponse({ status: 'ok', soundType });
  }
  return true;
});
