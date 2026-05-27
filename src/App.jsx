import { useEffect, useState } from "react";
import "./App.css";
import SaiyajinCard from "./Components/SaiyajinCard/SaiyajinCard";
import SaiyajinButton from "./Components/SaiyajinButton/SaiyajinButton";
import fundoDBZ from './assets/img-1031584-dragon-ball.jpg';
import saiyajins from "./Data/saiyajins";
import musicaDBZ from "./assets/dragonball.mp3";

function App() {
  const [playerAudio] = useState(new Audio(musicaDBZ));
  
  useEffect(() => {
    playerAudio.loop = true;
  }, [playerAudio]);

  function tocarMusica() {
    playerAudio.play();
  }

  function pararMusica() {
    playerAudio.pause();
    playerAudio.currentTime = 0; 
  }
  
  const [listaSaiyajins, setListaSaiyajins] = useState([
    { nome: "VEGITO",  estagio: 1, caminhoImagem: saiyajins['VEGITO'].imagem },
    { nome: "GOHAN",  estagio: 1, caminhoImagem: saiyajins['GOHAN'].imagem },
    { nome: "FREEZA",  estagio: 1, caminhoImagem: saiyajins['FREEZA'].imagem },
    { nome: "GOKU",  estagio: 1, caminhoImagem: saiyajins['GOKU'].imagem },
    { nome: "VEGETA",  estagio: 1, caminhoImagem: saiyajins['VEGETA'].imagem },
    { nome: "GOGETA",  estagio: 1, caminhoImagem: saiyajins['GOGETA'].imagem }
  ]);

  const [qtdEvoluidos, setQtdEvoluidos] = useState(0);
  useEffect(() => {
    let saiyajinsEvoluidos = listaSaiyajins.filter(saiyajin => saiyajin.estagio > 1);
    setQtdEvoluidos(saiyajinsEvoluidos.length);
  }, [listaSaiyajins]);
  function evoluirSaiyajin(nomeAtual) {
    const novaLista = listaSaiyajins.map((saiyajin) => {
      if (saiyajin.nome === nomeAtual) {
      
        const proximaEvolucao = saiyajins[nomeAtual].evolucao;
        
        if (!proximaEvolucao) {
          return saiyajin;
        }

        return {
          nome: proximaEvolucao,                          
          estagio: 2,                                        
          caminhoImagem: saiyajins[proximaEvolucao].imagem  
        };
      }
      return saiyajin;
    });
    
    setListaSaiyajins(novaLista);
  }

  return (
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      minHeight: '100vh',
      backgroundImage: `url(${fundoDBZ})`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ color: '#fff', textShadow: '2px 2px 4px #000' }}>Saiyajins</h1>

      <h2 style={{ color: '#fff', textShadow: '1px 1px 3px #000' }}>
        Quantidade de saiyajins evoluidos: {qtdEvoluidos}
      </h2>
      <section id="center">
        {
        listaSaiyajins.map((saiyajin, index) => (
          <SaiyajinCard
            key={index}
            nome={saiyajin.nome}
            estagio={saiyajin.estagio}
            caminhoImagem={saiyajin.caminhoImagem}
            evoluirSaiyajin={() => evoluirSaiyajin(saiyajin.nome)} 
          />
        ))
        }
      </section>
      <div style={{ 
        marginTop: '35px', 
        marginBottom: '20px',
        display: 'flex', 
        justifyContent: 'center',
        gap: '15px' 
      }}>
        <button 
          onClick={tocarMusica}
          style={{
            padding: '12px 24px',
            backgroundColor: '#ff6f00', /* Laranja */
            border: '2px solid #fff',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            textShadow: '1px 1px 2px #000'
          }}
        >
          ▶ Soltar o Som
        </button>

        <button 
          onClick={pararMusica}
          style={{
            padding: '12px 24px',
            backgroundColor: '#0d47a1', 
            color: 'white',
            border: '2px solid #fff',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            textShadow: '1px 1px 2px #000'
          }}
        >
          ■ Parar Música
        </button>
      </div>
    </div>
  );
}

export default App;