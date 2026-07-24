// ======================================
// Jadwal Sholat V5
// Digital Clock UI
// ======================================


export function initClock(){

  const jam =
  document.getElementById("jamDigital");


  if(!jam) return;


  function updateJam(){

    jam.textContent =
    new Date().toLocaleTimeString(
      "id-ID",
      {
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit"
      }
    );

  }


  updateJam();


  setInterval(
    updateJam,
    1000
  );

}
