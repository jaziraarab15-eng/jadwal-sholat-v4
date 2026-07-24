// ======================================
// Jadwal Sholat V5
// Countdown Module
// ======================================

import { State } from "../core/state.js";


export function startCountdown(prayer){

  const nextPrayer =
  document.getElementById("nextPrayer");

  const countdown =
  document.getElementById("countdown");


  if(!prayer) return;


  const jadwal = [

    {
      nama:"Subuh",
      waktu:prayer.fajr
    },

    {
      nama:"Syuruq",
      waktu:prayer.sunrise
    },

    {
      nama:"Zuhur",
      waktu:prayer.dhuhr
    },

    {
      nama:"Ashar",
      waktu:prayer.asr
    },

    {
      nama:"Magrib",
      waktu:prayer.maghrib
    },

    {
      nama:"Isya",
      waktu:prayer.isha
    }

  ];


  const sekarang =
  new Date();


  let berikutnya =
  jadwal.find(
    j => j.waktu > sekarang
  );


  if(!berikutnya){

    berikutnya = {

      nama:"Subuh",

      waktu:
      new Date(
        prayer.fajr.getTime()
        +
        24*60*60*1000
      )

    };

  }


  State.nextPrayer =
  berikutnya;


  if(nextPrayer){

    nextPrayer.textContent =
    berikutnya.nama;

  }


  function update(){

    const sisa =
    berikutnya.waktu.getTime()
    -
    Date.now();


    if(sisa <= 0){

      if(countdown)
      countdown.textContent =
      "00:00:00";

      return;

    }


    const jam =
    Math.floor(
      sisa / 3600000
    );


    const menit =
    Math.floor(
      (sisa % 3600000)
      /
      60000
    );


    const detik =
    Math.floor(
      (sisa % 60000)
      /
      1000
    );


    if(countdown){

      countdown.textContent =
      `${String(jam).padStart(2,"0")}:`+
      `${String(menit).padStart(2,"0")}:`+
      `${String(detik).padStart(2,"0")}`;

    }

  }


  update();


  if(State.countdownInterval){

    clearInterval(
      State.countdownInterval
    );

  }


  State.countdownInterval =
  setInterval(
    update,
    1000
  );

}
