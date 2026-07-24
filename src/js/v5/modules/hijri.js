// ======================================
// Jadwal Sholat V5
// Hijri Module
// ======================================

import moment from "moment-hijri";


export function tampilTanggalHijriah(){

  const tanggalHijriah =
  document.getElementById("tanggalHijriah");


  if(!tanggalHijriah) return;


  const sekarang =
  new Date();


  const masehi =
  sekarang.toLocaleDateString(
    "id-ID",
    {
      weekday:"long",
      day:"numeric",
      month:"long",
      year:"numeric"
    }
  );


  const hijri =
  moment(sekarang);


  const bulanHijriah = [

    "Muharram",
    "Safar",
    "Rabiul Awal",
    "Rabiul Akhir",
    "Jumadil Awal",
    "Jumadil Akhir",
    "Rajab",
    "Syaban",
    "Ramadhan",
    "Syawal",
    "Zulkaidah",
    "Zulhijah"

  ];


  const hasil =

  `${hijri.iDate()} ${
    bulanHijriah[hijri.iMonth()]
  } ${
    hijri.iYear()
  } H`;


  tanggalHijriah.textContent =
  `${masehi} • ${hasil}`;

}



export function updateBulanHijriah(){

 const bulanHijriah =
 document.getElementById("bulanHijriah");


 const bulanMasehi =
 document.getElementById("bulanMasehi");


 if(
 !bulanHijriah ||
 !bulanMasehi
 ) return;


 const sekarang =
 new Date();


 const parts =
 new Intl.DateTimeFormat(
 "en-TN-u-ca-islamic",
 {
  month:"numeric",
  year:"numeric"
 }
 ).formatToParts(sekarang);


 const bulan =
 parseInt(
  parts.find(
   p=>p.type==="month"
  ).value
 );


 const tahun =
 parts.find(
  p=>p.type==="year"
 ).value;


 const nama = [

 "Muharram",
 "Safar",
 "Rabiul Awal",
 "Rabiul Akhir",
 "Jumadil Awal",
 "Jumadil Akhir",
 "Rajab",
 "Sya'ban",
 "Ramadhan",
 "Syawal",
 "Dzulqa'dah",
 "Dzulhijjah"

 ];


 bulanHijriah.textContent =
 `${nama[bulan-1]} ${tahun} H`;


 bulanMasehi.textContent =
 sekarang.toLocaleDateString(
 "id-ID",
 {
  month:"long",
  year:"numeric"
 }
 );

}
