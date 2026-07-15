import { PrayerTimes, Coordinates, CalculationMethod } from "adhan";

async function mulai() {
  try {
    const pos = await navigator.geolocation.getCurrentPosition(
      success,
      error,
      {
        enableHighAccuracy: true,
        timeout: 10000
      }
    );

    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      document.getElementById("kota").innerText =
        `Lat: ${lat.toFixed(6)} | Lon: ${lon.toFixed(6)}`;

      hitungJadwal(lat, lon);
    }

    function error() {
      document.getElementById("kota").innerText = "GPS gagal";
    }

  } catch (e) {
    console.log(e);
  }
}

function hitungJadwal(lat, lon) {

  const coordinates = new Coordinates(lat, lon);

  const params = CalculationMethod.MuslimWorldLeague();
  params.madhab = "Shafi";

  const today = new Date();

  const prayer = new PrayerTimes(coordinates, today, params);

  const list = {
    fajr: prayer.fajr,
    sunrise: prayer.sunrise,
    dhuhr: prayer.dhuhr,
    asr: prayer.asr,
    maghrib: prayer.maghrib,
    isha: prayer.isha
  };

  document.getElementById("fajr").innerText = format(list.fajr);
  document.getElementById("sunrise").innerText = format(list.sunrise);
  document.getElementById("dhuhr").innerText = format(list.dhuhr);
  document.getElementById("asr").innerText = format(list.asr);
  document.getElementById("maghrib").innerText = format(list.maghrib);
  document.getElementById("isha").innerText = format(list.isha);

  cariBerikutnya(list);
}

function cariBerikutnya(list){

  const now = new Date();

  for(const nama in list){

    if(list[nama] > now){

      document.getElementById("nextPrayer").innerText =
        nama.toUpperCase();

      mulaiCountdown(list[nama]);

      return;
    }
  }

  document.getElementById("nextPrayer").innerText="SUBUH";
}

function mulaiCountdown(target){

  function update(){

    const now = new Date();

    let s = Math.floor((target-now)/1000);

    if(s<0) s=0;

    const h = String(Math.floor(s/3600)).padStart(2,"0");
    const m = String(Math.floor((s%3600)/60)).padStart(2,"0");
    const d = String(s%60).padStart(2,"0");

    document.getElementById("countdown").innerText =
      `${h}:${m}:${d}`;
  }

  update();

  setInterval(update,1000);
}

function format(t){

  return t.toLocaleTimeString("id-ID",{
    hour:"2-digit",
    minute:"2-digit"
  });

}

mulai();
