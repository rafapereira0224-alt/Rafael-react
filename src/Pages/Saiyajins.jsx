import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import saiyajins from '../Data/saiyajins';
import '../Pages/Saiyajins.css';


function Saiyajins({ listaSaiyajins, evoluirSaiyajin }) {
  const { saiyajinsId } = useParams();
  const saiyajin = listaSaiyajins.find((s) => s.id === Number(saiyajinsId));

  if (!saiyajin) return <h1>Saiyajin não encontrado</h1>;

useEffect(() => {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    
    window.stop(); 
  }, []);

  if (!saiyajin) return <h1>Saiyajin não encontrado</h1>;

  return (
  <div className="container-detalhe-final" style={{ backgroundImage: `url(${saiyajin.imagemFundo})` }}>
    
    {/* Tudo fica dentro do card-detalhe */}
    <div className="card-detalhe">
      <h1>{saiyajin.nome}</h1>
      <img src={saiyajin.caminhoImagem} alt={saiyajin.nome} />
      <p>Estágio: {saiyajin.estagio}</p>

      <div className="container-botoes">
  {saiyajin.estagio === 1 && (
    <button className="btn-padrao btn-evoluir" onClick={() => evoluirSaiyajin(saiyajin.id)}>
      Evoluir
    </button>
  )}
  <Link to="/Rafael-react/" className="btn-padrao btn-voltar">
    Voltar
  </Link>
</div>
    </div>
    
  </div>
);
}

export default Saiyajins;