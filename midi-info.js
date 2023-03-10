let accesoMIDI;
function actualizarInformaciĆ³nMIDI() {
  navigator
    .requestMIDIAccess()
    .then((acceso) => {
      accesoMIDI = acceso;
      document.querySelector("#info-midi").innerText =
        "Modelo del controlador MIDI: " +
        Array.from(acceso.inputs.values())[0].name;
      acceso.onstatechange = (e) => {
        document.querySelector("#info-midi").innerText =
          e.port.state === "connected"
            ? "Modelo del controlador MIDI: " + e.port.name
            : "No hay controlador MIDI conectado";
      };
    })
    .catch((error) => {
      //console.error("No se ha podido acceder al dispositivo MIDI", error);
      document.querySelector("#info-midi").innerText =
        "No hay controlador MIDI conectado";
    });
}

setInterval(actualizarInformaciĆ³nMIDI, 1000);
actualizarInformaciĆ³nMIDI();