import React, { useRef, useState } from "react";
import { musicasData } from "../Data/musicasData";
import { Link } from "react-router-dom";
import "../Components/Musica/Musicas.css";

function Musicas() {
  const audioRefs = useRef({});
  const [playingId, setPlayingId] = useState(null);

  const handlePlay = (id) => {
    if (playingId !== null && playingId !== id) {
      audioRefs.current[playingId].pause();
    }
    setPlayingId(id);
  };

  return (
    <div className="container-jukebox">
      <h1 className="titulo-jukebox">Jukebox Dragon Ball</h1>
      <br />
      <Link to="/" className="link-voltar">
        ← Voltar para Início
      </Link>

      <div className="grid-musicas">
        {musicasData.map((musica) => (
          <div key={musica.id} className="card-musica">
            <h3>{musica.nome}</h3>
            <p>Saga: {musica.saga}</p>

            <audio
              controls
              preload="metadata"
              ref={(el) => (audioRefs.current[musica.id] = el)}
              onPlay={() => handlePlay(musica.id)}
            >
              <source src={musica.url} type="audio/mpeg" />
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Musicas;
