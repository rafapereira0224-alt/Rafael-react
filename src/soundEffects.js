let currentAudio = null;

export function playSound(tipo) {
  let audioUrl = "";

  if (tipo === "evoluir") {
    audioUrl = "/evoluir.mp3";
  } else if (tipo === "favorito") {
    audioUrl = "/conquista.mp3";
  } else if (tipo === "tirarFavorito") {
    audioUrl = "/tirar dos favoritos.mp3";
  } else if (tipo === "filtro" || tipo === "pesquisa") {
    audioUrl = "/filtro e tema.mp3";
  } else if (tipo === "conquista") {
    audioUrl = "/conquista.mp3";
  }

  if (audioUrl) {
    // Se já houver um áudio tocando, para ele para não embolar o som
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(audioUrl);
    currentAudio.volume = 0.5;

    currentAudio.play().catch((error) => {
      console.warn("Aviso de áudio bloqueado/falhou:", error);
    });
  }
}
