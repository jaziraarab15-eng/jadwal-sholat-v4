// ======================================
// Jadwal Sholat V5
// Qibla Module
// ======================================

import { Motion } from "@capacitor/motion";
import {
  Coordinates,
  Qibla
} from "adhan";

import { State } from "../core/state.js";


export function calculateQibla(){

  if(
    !State.latitude ||
    !State.longitude
  ){

    console.error(
      "Lokasi belum tersedia untuk kiblat"
    );

    return null;

  }


  const coordinates =
    new Coordinates(
      Number(State.latitude),
      Number(State.longitude)
    );


  const arah =
    Qibla(coordinates);


  State.qibla = arah;


  const degree =
    document.getElementById("qiblaDegree");


  if(degree){

    degree.textContent =
    `${arah.toFixed(1)}°`;

  }


  return arah;

}



export async function startCompass(){

 const needle =
 document.getElementById("needle");


 const degree =
 document.getElementById("qiblaDegree");


 if(!needle) return;


 await Motion.addListener(
 "orientation",
 (event)=>{


   const heading =
   event.alpha ?? 0;


   needle.style.transform =
   `rotate(${State.qibla - heading}deg)`;


   if(degree){

     degree.textContent =
     `${Math.round(State.qibla)}°`;

   }


 });


}
