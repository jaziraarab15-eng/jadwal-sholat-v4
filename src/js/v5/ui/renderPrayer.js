// ======================================
// Jadwal Sholat V5
// Prayer Renderer UI
// ======================================


function formatWaktu(date){

  return date.toLocaleTimeString(
    "id-ID",
    {
      hour:"2-digit",
      minute:"2-digit"
    }
  );

}



export function renderPrayer(prayer){

  if(!prayer) return;


  const daftar = [

    ["fajr", prayer.fajr],
    ["sunrise", prayer.sunrise],
    ["dhuhr", prayer.dhuhr],
    ["asr", prayer.asr],
    ["maghrib", prayer.maghrib],
    ["isha", prayer.isha]

  ];


  daftar.forEach(([id,waktu])=>{

    const el =
    document.getElementById(id);

    if(el)
    el.textContent =
    formatWaktu(waktu);

  });



  const home = [

    ["sunriseHome", prayer.sunrise],
    ["dhuhrHome", prayer.dhuhr],
    ["asrHome", prayer.asr],
    ["maghribHome", prayer.maghrib],
    ["ishaHome", prayer.isha]

  ];


  home.forEach(([id,waktu])=>{

    const el =
    document.getElementById(id);

    if(el)
    el.textContent =
    formatWaktu(waktu);

  });



  updateActivePrayer(prayer);

}



function updateActivePrayer(prayer){


const rows = [

"rowFajr",
"rowSunrise",
"rowDhuhr",
"rowAsr",
"rowMaghrib",
"rowIsha"

];


rows.forEach(id=>{

 const el =
 document.getElementById(id);

 if(el)
 el.classList.remove("active");

});



const now =
new Date();


let aktif =
"rowIsha";


if(now >= prayer.fajr &&
now < prayer.sunrise){

 aktif="rowFajr";

}
else if(now >= prayer.sunrise &&
now < prayer.dhuhr){

 aktif="rowSunrise";

}
else if(now >= prayer.dhuhr &&
now < prayer.asr){

 aktif="rowDhuhr";

}
else if(now >= prayer.asr &&
now < prayer.maghrib){

 aktif="rowAsr";

}
else if(now >= prayer.maghrib &&
now < prayer.isha){

 aktif="rowMaghrib";

}



const row =
document.getElementById(aktif);


if(row)
row.classList.add("active");



updateBackground(prayer);

}



function updateBackground(prayer){

const now =
new Date();


let bg="isya";


if(now >= prayer.fajr &&
now < prayer.sunrise){

bg="subuh";

}
else if(now >= prayer.sunrise &&
now < prayer.dhuhr){

bg="syuruq";

}
else if(now >= prayer.dhuhr &&
now < prayer.asr){

bg="zuhur";

}
else if(now >= prayer.asr &&
now < prayer.maghrib){

bg="ashar";

}
else if(now >= prayer.maghrib &&
now < prayer.isha){

bg="maghrib";

}


document.body.className = bg;

}
