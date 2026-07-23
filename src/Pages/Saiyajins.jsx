import { useParams, Link } from "react-router-dom";
import "../Pages/Saiyajins.css";

function Saiyajins({ listaSaiyajins, evoluirSaiyajin }) {
  const { saiyajinsId } = useParams();
  const saiyajin = listaSaiyajins.find((s) => s.id === Number(saiyajinsId));

  if (!saiyajin)
    return (
      <h1 style={{ color: "white", textAlign: "center" }}>
        Saiyajin não encontrado
      </h1>
    );

  return (
    <div
      className="container-detalhe-final"
      style={{ backgroundImage: `url(${saiyajin.imagemFundo})` }}
    >
      <div className="container-wrapper-duplo">
        <div className="card-estilo-padrao">
          <h2 style={{ color: "#ffcc00" }}>Sobre {saiyajin.nome}:</h2>
          <p className="texto-descricao">{saiyajin.descricao}</p>
        </div>

        <div className="card-estilo-padrao">
          <h1>{saiyajin.nome}</h1>
          <img src={saiyajin.caminhoImagem} alt={saiyajin.nome} />
          <p>Estágio: {saiyajin.estagio}</p>

          <div className="container-botoes">
            {saiyajin.estagio === 1 && (
              <button
                className="btn-padrao btn-evoluir"
                onClick={() => evoluirSaiyajin(saiyajin.id)}
              >
                Evoluir
              </button>
            )}
              <Link to="/" className="btn-padrao btn-voltar">Voltar</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Saiyajins;
