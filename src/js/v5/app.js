// ======================================
// Jadwal Sholat V5 Premium
// Main Controller
// ======================================


import { State } from "./core/state.js";

import { initLocation } 
from "./modules/location.js";

import { loadPrayerTimes } 
from "./modules/prayer.js";

import { calculateQibla, startCompass }
from "./modules/qibla.js";

import { buatChannelAdzan, jadwalkanNotifikasi }
from "./modules/notification.js";

import { startCountdown }
from "./modules/countdown.js";

import { tampilJadwalBulanan }
from "./modules/monthly.js";

import {
  tampilTanggalHijriah,
  updateBulanHijriah
}
from "./modules/hijri.js";


import { renderPrayer }
from "./ui/renderPrayer.js";

import { initNavigation }
from "./ui/navigation.js";

import { initTasbih }
from "./ui/tasbih.js";

import { initClock }
from "./ui/clock.js";



// ======================================
// START APP
// ======================================

async function startApp(){


console.log(
"🕌 Jadwal Sholat V5 Starting..."
);



await buatChannelAdzan();


await initLocation();


const prayer =
loadPrayerTimes();



if(prayer){


renderPrayer(prayer);


await jadwalkanNotifikasi(
prayer
);


startCountdown(
prayer
);


calculateQibla();


startCompass();


tampilJadwalBulanan();


}



tampilTanggalHijriah();

updateBulanHijriah();


initNavigation();

initTasbih();

initClock();



console.log(
"✅ V5 Ready"
);


}



document.addEventListener(
"DOMContentLoaded",
startApp
);
