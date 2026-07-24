// ======================================
// Jadwal Sholat V5
// Quran Module
// ======================================


const API =
"https://equran.id/api/v2/surat";



export async function loadSurah(){


const box =
document.getElementById("surahList");


if(!box) return;



try {


box.innerHTML =
"⏳ Memuat daftar surah...";



const res =
await fetch(API);



const data =
await res.json();



const daftar =
data.data;



tampilkanSurah(daftar);



window.daftarSurah =
daftar;



const search =
document.getElementById("quranSearch");



if(search){

search.oninput = ()=>{


const keyword =
search.value.toLowerCase();



const hasil =
daftar.filter(
surah =>
surah.namaLatin
.toLowerCase()
.includes(keyword)
);



tampilkanSurah(hasil);



};


}



}catch(err){


console.error(
"Quran error:",
err
);


box.innerHTML =
"❌ Gagal memuat Al-Qur'an";


}


}




function tampilkanSurah(data){


const box =
document.getElementById("surahList");


if(!box) return;



box.innerHTML = "";



data.forEach(surah=>{


const item =
document.createElement("div");


item.className =
"row";



item.innerHTML = `

<span>
${surah.nomor}.
${surah.namaLatin}
</span>

<span>
${surah.arti}
</span>

`;



box.appendChild(item);



});


}
