// ======================================
// Jadwal Sholat V5
// Prayer Times Module
// ======================================

import {
  PrayerTimes,
  Coordinates,
  CalculationMethod,
  Madhab
} from "adhan";

import { State } from "../core/state.js";


export function loadPrayerTimes(){

  if(
    !State.latitude ||
    !State.longitude
  ){

    console.error(
      "Koordinat belum tersedia"
    );

    return null;

  }


  const coordinates =
    new Coordinates(
      Number(State.latitude),
      Number(State.longitude)
    );


  const method =
    localStorage.getItem("method")
    ||
    State.method;


  const params =
    CalculationMethod[method]();


  const madhab =
    localStorage.getItem("madhab")
    ||
    State.madhab;


  params.madhab =
    Madhab[madhab];


  const prayer =
    new PrayerTimes(
      coordinates,
      new Date(),
      params
    );


  State.prayer = prayer;


  return prayer;

}
