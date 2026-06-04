import { useEffect, useState } from "react";
import SaiyajinCard from "../Components/SaiyajinCard/SaiyajinCard";
import fundoDBZ from '../assets/img-1031584-dragon-ball.jpg';
import musicaDBZ from "../assets/dragonball.mp3";
import '../app.css';
import '../Components/SaiyajinButton/SaiyajinButton.css';

function Home({ listaSaiyajins, evoluirSaiyajin }) {
  const [playerAudio] = useState(new Audio(musicaDBZ));
  const [qtdEvoluidos, setQtdEvoluidos] = useState(0);

  useEffect(() => {
    playerAudio.loop = true;
    
    return () => {
      playerAudio.pause();
      playerAudio.currentTime = 0;
    };
  }, [playerAudio]);

  useEffect(() => {
    let saiyajinsEvoluidos = listaSaiyajins.filter(saiyajin => saiyajin.estagio > 1);
    setQtdEvoluidos(saiyajinsEvoluidos.length);
  }, [listaSaiyajins]);

  function tocarMusica() {
    playerAudio.play();
  }

  function pararMusica() {
    playerAudio.pause();
    playerAudio.currentTime = 0;
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundImage: `url(${fundoDBZ})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '40px 20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#fff', textShadow: '2px 2px 4px #000' }}>Dragon Ball</h1>

      <h2 style={{ color: '#fff', textShadow: '1px 1px 3px #000' }}>
        Quantidade de personagens evoluidos: {qtdEvoluidos}
      </h2>

      <section id="center" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '120px',             
        justifyItems: 'center',
        width: '100%',
        maxWidth: '1000px',       
        marginTop: '30px'         
      }}>
        {listaSaiyajins.map((saiyajin) => (
          <SaiyajinCard
            key={saiyajin.id}
            id={saiyajin.id}
            nome={saiyajin.nome}
            estagio={saiyajin.estagio}
            caminhoImagem={saiyajin.caminhoImagem}
            evoluirSaiyajin={() => evoluirSaiyajin(saiyajin.id)}
          />
        ))}
      </section>

      <div style={{
        marginTop: '35px',
        display: 'flex',        
        flexDirection: 'row',  
        justifyContent: 'center',
        gap: '15px'            
      }}>
        <button onClick={tocarMusica} className="musicButton playButton">
          ▶ Soltar o Som
        </button>
        <button onClick={pararMusica} className="musicButton stopButton">
          ■ Parar Música
        </button>
      </div>
    </div>
  );
}

export default Home;