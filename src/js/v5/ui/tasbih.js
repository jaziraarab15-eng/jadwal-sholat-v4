// ======================================
// Jadwal Sholat V5
// Tasbih UI
// ======================================

import { State } from "../core/state.js";


export function initTasbih(){


const tasbihBtn =
document.getElementById("tasbihBtn");


const resetTasbih =
document.getElementById("resetTasbih");


const tasbihCount =
document.getElementById("tasbihCount");



if(!tasbihBtn) return;



tasbihBtn.onclick = ()=>{


State.tasbih++;


if(tasbihCount){

  tasbihCount.textContent =
  State.tasbih;

}



if(navigator.vibrate){

  navigator.vibrate(20);

}



if(
State.tasbih === 33 ||
State.tasbih === 99 ||
State.tasbih === 100
){


if(navigator.vibrate){

 navigator.vibrate(
 [300,100,300]
 );

}


alert(
"🎉 Target "
+
State.tasbih
+
" tercapai"
);


}


};



if(resetTasbih){


resetTasbih.onclick = ()=>{


State.tasbih = 0;


if(tasbihCount){

 tasbihCount.textContent =
 0;

}


};


}



}
