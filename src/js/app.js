import { Geolocation } from "@capacitor/geolocation";

import {
  PrayerTimes,
  Coordinates,
  CalculationMethod,
  Madhab
} from "adhan";

async function mulai() {
  const kota = document.getElementById("kota");
 const jadwal = [
  { nama: "Subuh", waktu: prayer.fajr },
  { nama: "Syuruq", waktu: prayer.sunrise },
  { nama: "Zuhur", waktu: prayer.dhuhr },
  { nama: "Ashar", waktu: prayer.asr },
  { nama: "Magrib", waktu: prayer.maghrib },
  { nama: "Isya", waktu: prayer.isha }
];

const sekarang = new Date();

let berikutnya = jadwal.find(j => j.waktu > sekarang);

if (!berikutnya) {
  berikutnya = jadwal[0];
  berikutnya.waktu.setDate(berikutnya.waktu.getDate() + 1);
}

nextPrayer.textContent = berikutnya.nama;

function updateCountdown() {
  const sisa = berikutnya.waktu - new Date();

  const jam = Math.floor(sisa / 3600000);
  const menit = Math.floor((sisa % 3600000) / 60000);
  const detik = Math.floor((sisa % 60000) / 1000);

  countdown.textContent =
    `${String(jam).padStart(2, "0")}:` +
    `${String(menit).padStart(2, "0")}:` +
    `${String(detik).padStart(2, "0")}`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

  try {
    const izin = await Geolocation.requestPermissions();

    if (izin.location !== "granted") {
      kota.textContent = "Izin lokasi ditolak";
      return;
    }

    const posisi = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true
    });

    const lat = posisi.coords.latitude.toFixed(6);
    const lon = posisi.coords.longitude.toFixed(6);

    kota.textContent = `Lat: ${lat} | Lon: ${lon}`;

const coordinates = new Coordinates(
  parseFloat(lat),
  parseFloat(lon)
);

const params = CalculationMethod.Singapore();
params.madhab = Madhab.Shafi;

const prayer = new PrayerTimes(
  coordinates,
  new Date(),
  params
);

document.getElementById("fajr").textContent =
  prayer.fajr.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  });

document.getElementById("sunrise").textContent =
  prayer.sunrise.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  });

document.getElementById("dhuhr").textContent =
  prayer.dhuhr.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  });

document.getElementById("asr").textContent =
  prayer.asr.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  });

document.getElementById("maghrib").textContent =
  prayer.maghrib.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  });

document.getElementById("isha").textContent =
  prayer.isha.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  });

nextPrayer.textContent = "Jadwal Hari Ini";
countdown.textContent = "Berhasil dihitung";
  } catch (err) {
    console.error(err);
    kota.textContent = "Gagal mengambil lokasi";
    nextPrayer.textContent = "Error";
    countdown.textContent = "--:--:--";
  }
}

mulai();
