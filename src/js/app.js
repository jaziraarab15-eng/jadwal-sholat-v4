import { Geolocation } from "@capacitor/geolocation";
import { Motion } from "@capacitor/motion";
import { LocalNotifications } from "@capacitor/local-notifications";

import {
  PrayerTimes,
  Coordinates,
  CalculationMethod,
  Madhab,
  Qibla
} from "adhan";

let countdownInterval;

async function
jadwalkanNotifikasi(prayer) {

if (localStorage.getItem("notifAktif") === "false") {
  return;
}

  await LocalNotifications.cancel({ notifications: [
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }
  ]});

  const sekarang = new Date();

  const data = [
    { id: 1, title: "🕌 Waktu Subuh", waktu: prayer.fajr },
    { id: 2, title: "🕌 Waktu Zuhur", waktu: prayer.dhuhr },
    { id: 3, title: "🕌 Waktu Ashar", waktu: prayer.asr },
    { id: 4, title: "🕌 Waktu Magrib", waktu: prayer.maghrib },
    { id: 5, title: "🕌 Waktu Isya", waktu: prayer.isha }
  ];

  for (const item of data) {
    if (item.waktu > sekarang) {
      await LocalNotifications.schedule({
        notifications: [{
          id: item.id,
          title: item.title,
          body: "Telah masuk waktu sholat",
          channelId: "adzan",
          schedule: { at: item.waktu }
        }]
      });
    }
  }
}

async function buatChannelAdzan() {

  await LocalNotifications.createChannel({
    id: "adzan",
    name: "Adzan",
    description: "Notifikasi waktu sholat dengan suara adzan",
    importance: 5,
    sound: "adzan.mp3",
    vibration: true
  });

}

async function mulai() {
  const kota = document.getElementById("kota");

const izinNotif = await LocalNotifications.requestPermissions();

if (izinNotif.display !== "granted") {
  console.log("Izin notifikasi ditolak");
}

await buatChannelAdzan();

  try {
    const izin = await Geolocation.requestPermissions();

    if (izin.location !== "granted") {
      kota.textContent = "Izin lokasi ditolak";
      return;
    }

    let lat;
let lon;

try {
  const posisi = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 10000
  });

  lat = posisi.coords.latitude.toFixed(6);
  lon = posisi.coords.longitude.toFixed(6);

  // Simpan lokasi terakhir
  localStorage.setItem("lastLat", lat);
  localStorage.setItem("lastLon", lon);

document.getElementById("statusLokasi").textContent =
  "📍 Mengikuti lokasi saat ini";

} catch {

  lat = localStorage.getItem("lastLat");
  lon = localStorage.getItem("lastLon");

document.getElementById("statusLokasi").textContent =
  "📍 Menggunakan lokasi terakhir";

  if (!lat || !lon) {
    kota.textContent = "Belum ada lokasi tersimpan";
    return;
  }

  kota.textContent = "📍 Menggunakan lokasi terakhir";
}

// Simpan lokasi terakhir
localStorage.setItem("lastLat", lat);
localStorage.setItem("lastLon", lon);

try {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );

  const data = await res.json();

  const alamat = data.address;

  const namaKota =
  `${alamat.city || alamat.town || alamat.village || alamat.county}, ${alamat.state}`;

kota.textContent = namaKota;

localStorage.setItem("lastCity", namaKota);

const tanggalHijriah = document.getElementById("tanggalHijriah");

const sekarang = new Date();

const masehi = sekarang.toLocaleDateString("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
});

const hijriah = new Intl.DateTimeFormat("id-TN-u-ca-islamic", {
  day: "numeric",
  month: "long",
  year: "numeric"
}).format(sekarang);

tanggalHijriah.textContent = `${masehi} • ${hijriah} H`;

} catch {
  const lastCity = localStorage.getItem("lastCity");

  if (lastCity) {
    kota.textContent = `📍 ${lastCity}`;
  } else {
    kota.textContent = `Lat: ${lat} | Lon: ${lon}`;
  }
}

const coordinates = new Coordinates(
  parseFloat(lat),
  parseFloat(lon)
);

  arahKiblat = Qibla(coordinates);

document.getElementById("qiblaDegree").textContent =
  `${arahKiblat.toFixed(1)}°`;

const method =
  localStorage.getItem("method") || "Singapore";

const params =
  CalculationMethod[method]();

const madhab =
  localStorage.getItem("madhab") || "Shafi";

params.madhab = Madhab[madhab];

const prayer = new PrayerTimes(
  coordinates,
  new Date(),
  params
);

await jadwalkanNotifikasi(prayer);

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

// Hapus highlight sebelumnya
[
  "rowFajr",
  "rowSunrise",
  "rowDhuhr",
  "rowAsr",
  "rowMaghrib",
  "rowIsha"
].forEach(id => {
  document.getElementById(id).classList.remove("active");
});

const now = new Date();

let aktif = "rowIsha";

if (now >= prayer.fajr && now < prayer.sunrise) {
  aktif = "rowFajr";
} else if (now >= prayer.sunrise && now < prayer.dhuhr) {
  aktif = "rowSunrise";
} else if (now >= prayer.dhuhr && now < prayer.asr) {
  aktif = "rowDhuhr";
} else if (now >= prayer.asr && now < prayer.maghrib) {
  aktif = "rowAsr";
} else if (now >= prayer.maghrib && now < prayer.isha) {
  aktif = "rowMaghrib";
}

document.getElementById(aktif).classList.add("active");

// Tema otomatis siang & malam
if (now >= prayer.maghrib || now < prayer.fajr) {
  document.body.classList.add("night");
} else {
  document.body.classList.remove("night");
}

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

if (countdownInterval) {
  clearInterval(countdownInterval);
}

countdownInterval = setInterval(updateCountdown, 1000);

} catch (err) {
  console.error(err);

  if (!localStorage.getItem("lastLat")) {
    kota.textContent = "Gagal mengambil lokasi";
    nextPrayer.textContent = "Error";
    countdown.textContent = "--:--:--";
  }
}
}

mulai();

const refreshHeaderBtn = document.getElementById("refreshHeaderBtn");

refreshHeaderBtn.onclick = async () => {

  const status = document.getElementById("statusRefresh");

  status.style.display = "block";

  refreshHeaderBtn.disabled = true;
  refreshHeaderBtn.classList.add("loading");

  try {
    await mulai();
  } finally {
    status.style.display = "none";
    refreshHeaderBtn.disabled = false;
    refreshHeaderBtn.classList.remove("loading");
  }

};

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

halaman.classList.remove("page");
void halaman.offsetWidth;
halaman.classList.add("page");

}

homeBtn.onclick = () => tampilHalaman(homePage);
sholatBtn.onclick = () => tampilHalaman(sholatPage);
kiblatBtn.onclick = () => tampilHalaman(kiblatPage);
bulanBtn.onclick = () => tampilHalaman(bulanPage);
menuBtn.onclick = () => tampilHalaman(menuPage);

const needle = document.getElementById("needle");
const qiblaDegree = document.getElementById("qiblaDegree");

let arahKiblat = 295;

Motion.addListener("orientation", (event) => {
  const heading = event.alpha ?? 0;

  needle.style.transform =
  `rotate(${arahKiblat - heading}deg)`;

qiblaDegree.textContent =
  `${Math.round(arahKiblat)}°`;

});

function updateJam() {
  const jam = document.getElementById("jamDigital");

  if (!jam) return;

  jam.textContent = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

updateJam();
setInterval(updateJam, 1000);

const notifSwitch = document.getElementById("notifSwitch");

if (notifSwitch) {

  notifSwitch.checked =
    localStorage.getItem("notifAktif") !== "false";

  notifSwitch.onchange = async () => {

  localStorage.setItem(
    "notifAktif",
    notifSwitch.checked
  );

  if (!notifSwitch.checked) {

    await LocalNotifications.cancel({
      notifications: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 }
      ]
    });

  } else {

    await mulai();

  }

};

}

const adzanSwitch = document.getElementById("adzanSwitch");

if (adzanSwitch) {

  adzanSwitch.checked =
    localStorage.getItem("adzanAktif") === "true";

  adzanSwitch.onchange = () => {
    localStorage.setItem(
      "adzanAktif",
      adzanSwitch.checked
    );
  };

}

const vibrateSwitch = document.getElementById("vibrateSwitch");

if (vibrateSwitch) {

  vibrateSwitch.checked =
    localStorage.getItem("vibrateAktif") !== "false";

  vibrateSwitch.onchange = () => {

    localStorage.setItem(
      "vibrateAktif",
      vibrateSwitch.checked
    );

  };

}

const methodSelect = document.getElementById("methodSelect");

if (methodSelect) {

  methodSelect.value =
    localStorage.getItem("method") || "Singapore";

  methodSelect.onchange = () => {

    localStorage.setItem(
      "method",
      methodSelect.value
    );

    mulai();

  };

}

const madhabSelect = document.getElementById("madhabSelect");

if (madhabSelect) {

  madhabSelect.value =
    localStorage.getItem("madhab") || "Shafi";

  madhabSelect.onchange = () => {

    localStorage.setItem(
      "madhab",
      madhabSelect.value
    );

    mulai();

  };

}
