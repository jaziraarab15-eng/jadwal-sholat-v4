// ======================================
// Jadwal Sholat V5
// Notification Module
// ======================================

import { LocalNotifications } from "@capacitor/local-notifications";
import { CONFIG } from "../core/config.js";


export async function buatChannelAdzan(){

  await LocalNotifications.createChannel({

    id: CONFIG.NOTIFICATION.CHANNEL,

    name: "Adzan",

    description:
    "Notifikasi waktu sholat dengan suara adzan",

    importance: 5,

    sound: "adzan.mp3",

    vibration: true

  });


  await LocalNotifications.createChannel({

    id: CONFIG.NOTIFICATION.CHANNEL_SUBUH,

    name: "Adzan Subuh",

    description:
    "Notifikasi khusus Subuh",

    importance: 5,

    sound: "adzan_subuh.mp3",

    vibration: true

  });

}



export async function jadwalkanNotifikasi(prayer){

  if(
    localStorage.getItem("notifAktif")
    === "false"
  ){

    return;

  }


  await LocalNotifications.cancel({

    notifications:[
      {id:1},
      {id:2},
      {id:3},
      {id:4},
      {id:5}
    ]

  });


  const sekarang =
  new Date();


  const daftar = [

    {
      id:1,
      title:"🕌 Waktu Subuh",
      waktu:prayer.fajr
    },

    {
      id:2,
      title:"🕌 Waktu Zuhur",
      waktu:prayer.dhuhr
    },

    {
      id:3,
      title:"🕌 Waktu Ashar",
      waktu:prayer.asr
    },

    {
      id:4,
      title:"🕌 Waktu Magrib",
      waktu:prayer.maghrib
    },

    {
      id:5,
      title:"🕌 Waktu Isya",
      waktu:prayer.isha
    }

  ];


  for(const item of daftar){

    if(item.waktu > sekarang){

      await LocalNotifications.schedule({

        notifications:[{

          id:item.id,

          title:item.title,

          body:
          "Telah masuk waktu sholat",

          channelId:
          item.id === 1
          ?
          CONFIG.NOTIFICATION.CHANNEL_SUBUH
          :
          CONFIG.NOTIFICATION.CHANNEL,

          schedule:{
            at:item.waktu
          }

        }]

      });

    }

  }

}
