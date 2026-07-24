// ======================================
// Jadwal Sholat V5
// Navigation UI
// ======================================


export function initNavigation(){


const homeBtn =
document.getElementById("homeBtn");

const sholatBtn =
document.getElementById("sholatBtn");

const kiblatBtn =
document.getElementById("kiblatBtn");

const bulanBtn =
document.getElementById("bulanBtn");

const menuBtn =
document.getElementById("menuBtn");


const homePage =
document.getElementById("homePage");

const sholatPage =
document.getElementById("sholatPage");

const kiblatPage =
document.getElementById("kiblatPage");

const bulanPage =
document.getElementById("bulanPage");

const menuPage =
document.getElementById("menuPage");

const quranBtn =
document.getElementById("quranBtn");

const quranPage =
document.getElementById("quranPage");


function tampilHalaman(halaman){

document
.querySelectorAll(".page")
.forEach(page=>{

 page.style.display="none";

});


if(halaman){

 halaman.style.display="block";

}

}



if(homeBtn)
homeBtn.onclick =
()=>tampilHalaman(homePage);


if(sholatBtn)
sholatBtn.onclick =
()=>tampilHalaman(sholatPage);


if(kiblatBtn)
kiblatBtn.onclick =
()=>tampilHalaman(kiblatPage);


if(bulanBtn)
bulanBtn.onclick =
()=>tampilHalaman(bulanPage);

if(quranBtn)
quranBtn.onclick =
()=>tampilHalaman(quranPage);

if(menuBtn)
menuBtn.onclick =
()=>tampilHalaman(menuPage);



// Side Menu

const menuHeaderBtn =
document.getElementById(
"menuHeaderBtn"
);


const sideMenu =
document.getElementById(
"sideMenu"
);


const menuOverlay =
document.getElementById(
"menuOverlay"
);



function bukaMenu(){

if(sideMenu)
sideMenu.classList.add("open");

if(menuOverlay)
menuOverlay.classList.add("show");

}



function tutupMenu(){

if(sideMenu)
sideMenu.classList.remove("open");

if(menuOverlay)
menuOverlay.classList.remove("show");

}



if(menuHeaderBtn)
menuHeaderBtn.onclick =
bukaMenu;


if(menuOverlay)
menuOverlay.onclick =
tutupMenu;



window.showPage = function(id){

  document
    .querySelectorAll(".page")
    .forEach(page=>{
      page.style.display = "none";
    });

  const halaman =
    document.getElementById(id);

  if(halaman){
    halaman.style.display = "block";
  }

};

window.tutupMenu =
tutupMenu;


}
