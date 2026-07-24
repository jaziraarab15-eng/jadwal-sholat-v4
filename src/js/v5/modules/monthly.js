// ======================================
// Jadwal Sholat V5
// Monthly Prayer Module
// ======================================

import {
  PrayerTimes,
  Coordinates,
  CalculationMethod,
  Madhab
} from "adhan";

import { State } from "../core/state.js";


export function tampilJadwalBulanan(){

  const box =
  document.getElementById("jadwalBulanan");


  if(!box) return;


  if(
    !State.latitude ||
    !State.longitude
  ){

    box.innerHTML =
    "Lokasi belum tersedia";

    return;

  }


  const koordinat =
  new Coordinates(
    Number(State.latitude),
    Number(State.longitude)
  );


  const method =
  localStorage.getItem("method")
  ||
  State.method;


  const params =
  CalculationMethod[method]();


  const madhab =
  localStorage.getItem("madhab")
  ||
  State.madhab;


  params.madhab =
  Madhab[madhab];


  const sekarang =
  new Date();


  const tahun =
  sekarang.getFullYear();


  const bulan =
  sekarang.getMonth();


  const jumlahHari =
  new Date(
    tahun,
    bulan + 1,
    0
  ).getDate();


  box.innerHTML = "";


  let html = "";


  for(
    let i = 1;
    i <= jumlahHari;
    i++
  ){

    const tanggal =
    new Date(
      tahun,
      bulan,
      i
    );


    const prayer =
    new PrayerTimes(
      koordinat,
      tanggal,
      params
    );


    html += `

    <div class="month-row">

      <span class="date">
        ${i}
      </span>


      <span>
        ${
          formatWaktu(prayer.fajr)
        }
      </span>


      <span>
        ${
          formatWaktu(prayer.dhuhr)
        }
      </span>


      <span>
        ${
          formatWaktu(prayer.asr)
        }
      </span>


      <span>
        ${
          formatWaktu(prayer.maghrib)
        }
      </span>


      <span>
        ${
          formatWaktu(prayer.isha)
        }
      </span>


    </div>

    `;

  }


  box.innerHTML = html;

}



function formatWaktu(date){

 return date.toLocaleTimeString(
  "id-ID",
  {
    hour:"2-digit",
    minute:"2-digit"
  }
 );

}
