// ======================================
// Jadwal Sholat V5
// Quran Module
// ======================================

import { MUSHAF_DATA }
from "../data/mushafPage.js";

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

setTimeout(()=>{

tampilkanBookmark();

},300);

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

item.onclick = ()=>{

  bukaSurah(surah.nomor);

};

});


}

async function bukaSurah(nomor){

const quranPage =
document.getElementById("quranPage");

const ayatPage =
document.getElementById("ayatPage");

const namaSurah =
document.getElementById("namaSurah");

const ayatList =
document.getElementById("ayatList");


if(quranPage)
quranPage.style.display="none";


if(ayatPage)
ayatPage.style.display="block";


try{


ayatList.innerHTML =
"⏳ Memuat ayat...";


const res =
await fetch(
`https://equran.id/api/v2/surat/${nomor}`
);


const data =
await res.json();


const surat =
data.data;


namaSurah.textContent =
`📖 ${surat.namaLatin}`;


const artiSurah =
document.getElementById("artiSurah");

const jumlahAyat =
document.getElementById("jumlahAyat");


if(artiSurah){

  artiSurah.textContent =
  surat.arti;

}


if(jumlahAyat){

  jumlahAyat.textContent =
  surat.jumlahAyat + " Ayat";

}

const juzInfo =
document.getElementById("juzInfo");


const halamanInfo =
document.getElementById("halamanInfo");



const mushaf =
MUSHAF_DATA[nomor];


if(juzInfo){

juzInfo.textContent =
"📖 Juz " +
(mushaf ? mushaf.juz : "-");

}


if(halamanInfo){

halamanInfo.textContent =
"📄 Halaman " +
(mushaf ? mushaf.page : "-");

}

ayatList.innerHTML="";

// Basmalah (kecuali At-Taubah)
if(surat.nomor !== 9){

ayatList.innerHTML += `

<div class="basmalah">

بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ

</div>

`;

}

surat.ayat.forEach(ayat=>{

const div =
document.createElement("div");

div.className="ayat-box";

div.id =
"ayat-" + ayat.nomorAyat;

div.innerHTML=`

<div class="nomor-ayat">
${ayat.nomorAyat}
</div>

<div class="arab">
${ayat.teksArab}
</div>

<div class="latin">
${ayat.teksLatin}
</div>

<div class="terjemah">
${ayat.teksIndonesia}
</div>

`;

ayatList.appendChild(div);

// Simpan ayat terakhir dibaca

div.onclick = ()=>{

localStorage.setItem(
"lastQuran",
JSON.stringify({

surah: nomor,

ayat: ayat.nomorAyat

})
);


};

});

const last =
JSON.parse(
localStorage.getItem("lastQuran")
);

if(last && last.surah == nomor){

setTimeout(()=>{

const target =
document.getElementById(
"ayat-" + last.ayat
);

if(target){

target.scrollIntoView({

behavior:"smooth",

block:"center"

});

target.classList.add(
"ayat-highlight"
);

setTimeout(()=>{

target.classList.remove(
"ayat-highlight"
);

},3000);

}

},300);

}

}catch(err){

console.error(err);

ayatList.innerHTML =
"❌ Gagal memuat ayat";

}

}

document
.getElementById("backQuran")
?.addEventListener(
"click",
()=>{

document.getElementById("ayatPage").style.display="none";

document.getElementById("quranPage").style.display="block";

});

export function getLastQuran(){


const data =
localStorage.getItem("lastQuran");


if(!data) return null;


return JSON.parse(data);


}

function tampilkanBookmark(){

const card =
document.getElementById("lastReadCard");

const info =
document.getElementById("lastReadInfo");

const tombol =
document.getElementById("continueRead");


const data =
JSON.parse(
localStorage.getItem("lastQuran")
);


if(!data){

card.style.display="none";

return;

}


card.style.display="block";


const surah =
window.daftarSurah?.find(
s => s.nomor == data.surah
);

if(surah){

info.innerHTML =
`<strong>${surah.namaLatin}</strong><br>Ayat ${data.ayat}`;

}else{

info.textContent =
`Surah ${data.surah} • Ayat ${data.ayat}`;

}

tombol.onclick=()=>{

bukaSurah(data.surah);

};

}


