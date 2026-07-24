// ======================================
// Jadwal Sholat V5
// Location Module
// ======================================

import { Geolocation } from "@capacitor/geolocation";
import { State } from "../core/state.js";
import { CONFIG } from "../core/config.js";


export async function initLocation() {

  const kota =
    document.getElementById("kota");

  const statusLokasi =
    document.getElementById("statusLokasi");


  try {

    const izin =
      await Geolocation.requestPermissions();


    if (izin.location !== "granted") {

      if (kota)
        kota.textContent =
        "Izin lokasi ditolak";

      return false;

    }


    try {

      const posisi =
        await Geolocation.getCurrentPosition({

          enableHighAccuracy:true,
          timeout:10000

        });


      State.latitude =
        posisi.coords.latitude;

      State.longitude =
        posisi.coords.longitude;


      localStorage.setItem(
        "lastLat",
        State.latitude
      );


      localStorage.setItem(
        "lastLon",
        State.longitude
      );


      if(statusLokasi)
      statusLokasi.textContent =
      "📍 Mengikuti lokasi saat ini";


    } catch {


      State.latitude =
      Number(localStorage.getItem("lastLat"));


      State.longitude =
      Number(localStorage.getItem("lastLon"));


      if(statusLokasi)
      statusLokasi.textContent =
      "📍 Menggunakan lokasi terakhir";


    }


    if(!State.latitude || !State.longitude){

      if(kota)
      kota.textContent =
      "Lokasi belum tersedia";

      return false;

    }


    await ambilNamaKota();


    return true;


  } catch(err){

    console.error(
      "Location error:",
      err
    );

    return false;

  }

}



async function ambilNamaKota(){

 const kota =
 document.getElementById("kota");


 try {


 const url =
 `${CONFIG.API.NOMINATIM}?format=json&lat=${State.latitude}&lon=${State.longitude}`;


 const res =
 await fetch(url);


 const data =
 await res.json();


 const alamat =
 data.address;


 const namaKota =
 `${alamat.city ||
 alamat.town ||
 alamat.village ||
 alamat.county}, ${alamat.state}`;


 State.city =
 namaKota;


 localStorage.setItem(
 "lastCity",
 namaKota
 );


 if(kota)
 kota.textContent =
 namaKota;


 } catch {


 const terakhir =
 localStorage.getItem("lastCity");


 if(kota){

   kota.textContent =
   terakhir ?
   `📍 ${terakhir}` :
   "Lokasi tidak diketahui";

 }


 }


}
