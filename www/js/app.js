document.addEventListener("DOMContentLoaded", () => {

document.getElementById("kota").textContent = "Memuat lokasi...";

document.getElementById("fajr").textContent = "04:35";
document.getElementById("sunrise").textContent = "05:56";
document.getElementById("dhuhr").textContent = "11:48";
document.getElementById("asr").textContent = "15:10";
document.getElementById("maghrib").textContent = "17:42";
document.getElementById("isha").textContent = "18:54";

document.getElementById("nextPrayer").textContent = "Magrib 17:42";

let sisa = 3600;

setInterval(() => {

if (sisa > 0) sisa--;

let jam = Math.floor(sisa / 3600);
let menit = Math.floor((sisa % 3600) / 60);
let detik = sisa % 60;

document.getElementById("countdown").textContent =
`${String(jam).padStart(2,'0')}:${String(menit).padStart(2,'0')}:${String(detik).padStart(2,'0')}`;

},1000);

});
