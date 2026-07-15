import { Geolocation } from "@capacitor/geolocation";

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
    nextPrayer.textContent = "GPS Berhasil";
    countdown.textContent = "Siap menghitung jadwal";
  } catch (err) {
    console.error(err);
    kota.textContent = "Gagal mengambil lokasi";
    nextPrayer.textContent = "Error";
    countdown.textContent = "--:--:--";
  }
}

mulai();
