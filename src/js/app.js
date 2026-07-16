import { Geolocation } from "@capacitor/geolocation";

import {
  PrayerTimes,
  Coordinates,
  CalculationMethod,
  Madhab
} from "adhan";

async function mulai() {
  const kota = document.getElementById("kota");
  const nextPrayer = document.getElementById("nextPrayer");
  const countdown = document.getElementById("countdown");

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
