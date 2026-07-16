import { Geolocation } from "@capacitor/geolocation";
import { Motion } from "@capacitor/motion";

import {
  PrayerTimes,
  Coordinates,
  CalculationMethod,
  Madhab,
  Qibla
} from "adhan";

async function mulai() {
  const kota = document.getElementById("kota");

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

try {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );

  const data = await res.json();

  const alamat = data.address;

  kota.textContent =
    `${alamat.city || alamat.town || alamat.village || alamat.county}, ` +
    `${alamat.state}`;

} catch {
  kota.textContent = `Lat: ${lat} | Lon: ${lon}`;
}

const coordinates = new Coordinates(
  parseFloat(lat),
  parseFloat(lon)
);
 
const arahKiblat = Qibla(coordinates);

document.getElementById("qiblaDegree").textContent =
  `${arahKiblat.toFixed(1)}°`;

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

document.getElementById("sunriseHome").textContent =
  prayer.sunrise.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  });

document.getElementById("dhuhrHome").textContent =
  prayer.dhuhr.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  });

document.getElementById("maghribHome").textContent =
  prayer.maghrib.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  });

const jadwal = [
  { nama: "Subuh", waktu: prayer.fajr },
  { nama: "Syuruq", waktu: prayer.sunrise },
  { nama: "Zuhur", waktu: prayer.dhuhr },
  { nama: "Ashar", waktu: prayer.asr },
  { nama: "Magrib", waktu: prayer.maghrib },
  { nama: "Isya", waktu: prayer.isha }
];

let sekarang = new Date();

let berikutnya = jadwal.find(j => j.waktu > sekarang);

if (!berikutnya) {
  berikutnya = {
    nama: "Subuh",
    waktu: new Date(prayer.fajr.getTime() + 24 * 60 * 60 * 1000)
  };
}

nextPrayer.textContent = berikutnya.nama;

function updateCountdown() {
  const sisa = berikutnya.waktu.getTime() - Date.now();

  if (sisa <= 0) {
    countdown.textContent = "00:00:00";
    return;
  }

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

  } catch (err) {
    console.error(err);
    kota.textContent = "Gagal mengambil lokasi";
    nextPrayer.textContent = "Error";
    countdown.textContent = "--:--:--";
  }
}

mulai();

const homeBtn = document.getElementById("homeBtn");
const sholatBtn = document.getElementById("sholatBtn");
const kiblatBtn = document.getElementById("kiblatBtn");
const bulanBtn = document.getElementById("bulanBtn");
const menuBtn = document.getElementById("menuBtn");

const homePage = document.getElementById("homePage");
const sholatPage = document.getElementById("sholatPage");
const kiblatPage = document.getElementById("kiblatPage");
const bulanPage = document.getElementById("bulanPage");
const menuPage = document.getElementById("menuPage");

function tampilHalaman(halaman) {
  homePage.style.display = "none";
  sholatPage.style.display = "none";
  kiblatPage.style.display = "none";
  bulanPage.style.display = "none";
  menuPage.style.display = "none";

  halaman.style.display = "block";
}

homeBtn.onclick = () => tampilHalaman(homePage);
sholatBtn.onclick = () => tampilHalaman(sholatPage);
kiblatBtn.onclick = () => tampilHalaman(kiblatPage);
bulanBtn.onclick = () => tampilHalaman(bulanPage);
menuBtn.onclick = () => tampilHalaman(menuPage);

const needle = document.getElementById("needle");
const qiblaDegree = document.getElementById("qiblaDegree");

const ARAH_KIBLAT = 295;

Motion.addListener("orientation", (event) => {
  const heading = event.alpha ?? 0;

  needle.style.transform =
    `rotate(${ARAH_KIBLAT - heading}deg)`;

  qiblaDegree.textContent =
    `${Math.round(ARAH_KIBLAT)}°`;
});
