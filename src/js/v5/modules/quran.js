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


ayatList.innerHTML="";


surat.ayat.forEach(ayat=>{


const div =
document.createElement("div");


div.className="ayat";


div.innerHTML=`

<h3>
${ayat.nomorAyat}
</h3>

<p>
${ayat.teksArab}
</p>

<p>
${ayat.teksLatin}
</p>

<p>
${ayat.teksIndonesia}
</p>

`;


ayatList.appendChild(div);


});


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

