import { useState } from "react";
import { Link } from "react-router-dom";
import "./Batalha.css";

function Batalha({ listaSaiyajins }) {
  const [lutador1, setLutador1] = useState(null);
  const [lutador2, setLutador2] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const simularBatalha = () => {
    if (!lutador1 || !lutador2) {
      alert("Selecione dois lutadores para iniciar a batalha!");
      return;
    }

    if (lutador1.id === lutador2.id) {
      alert("Escolha personagens diferentes para a luta!");
      return;
    }

    setCarregando(true);
    setResultado(null);

    // Pequeno delay dramático simulando leitura de Scouter / Carregando Ki
    setTimeout(() => {
      // Cálculo baseado no poder oficial do scouter + bônus se estiver evoluído
      const bonus1 = lutador1.estagio > 1 ? 1.5 : 1;
      const bonus2 = lutador2.estagio > 1 ? 1.5 : 1;

      const poderTotal1 = (lutador1.poderDeLuta || 10000) * bonus1;
      const poderTotal2 = (lutador2.poderDeLuta || 10000) * bonus2;

      let vencedor;
      if (poderTotal1 > poderTotal2) {
        vencedor = lutador1;
      } else if (poderTotal2 > poderTotal1) {
        vencedor = lutador2;
      } else {
        // Empate raro, decide na sorte
        vencedor = Math.random() > 0.5 ? lutador1 : lutador2;
      }

      setResultado(vencedor);
      setCarregando(false);
    }, 1500);
  };

  return (
    <div className="container-batalha">
      <div className="header-batalha">
        <h1>Arena de Batalha Z (Scouter Ativado)</h1>
        <p>
          Selecione dois oponentes para comparar seus poderes de luta e simular
          o combate!
        </p>
        <Link to="/" className="btn-voltar-home">
          Voltar ao Início
        </Link>
      </div>

      <div className="arena-selecao">
        {/* Lutador 1 */}
        <div className="card-lutador">
          <h3>Lutador 1</h3>
          <select
            className="select-personagem"
            onChange={(e) => {
              const char = listaSaiyajins.find(
                (s) => s.id === Number(e.target.value),
              );
              setLutador1(char);
              setResultado(null);
            }}
            defaultValue=""
          >
            <option value="" disabled>
              Escolha um lutador...
            </option>
            {listaSaiyajins.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nome} (Estágio {s.estagio})
              </option>
            ))}
          </select>

          {lutador1 && (
            <div className="preview-lutador">
              <img src={lutador1.caminhoImagem} alt={lutador1.nome} />
              <h4>{lutador1.nome}</h4>
              <p>Saga: {lutador1.saga}</p>
              <p className="scouter-texto">
                ⚡ Poder de Luta:{" "}
                <strong>
                  {(
                    lutador1.poderDeLuta * (lutador1.estagio > 1 ? 1.5 : 1)
                  ).toLocaleString()}
                </strong>
              </p>
            </div>
          )}
        </div>

        <div className="vs-badge">VS</div>

        {/* Lutador 2 */}
        <div className="card-lutador">
          <h3>Lutador 2</h3>
          <select
            className="select-personagem"
            onChange={(e) => {
              const char = listaSaiyajins.find(
                (s) => s.id === Number(e.target.value),
              );
              setLutador2(char);
              setResultado(null);
            }}
            defaultValue=""
          >
            <option value="" disabled>
              Escolha um lutador...
            </option>
            {listaSaiyajins.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nome} (Estágio {s.estagio})
              </option>
            ))}
          </select>

          {lutador2 && (
            <div className="preview-lutador">
              <img src={lutador2.caminhoImagem} alt={lutador2.nome} />
              <h4>{lutador2.nome}</h4>
              <p>Saga: {lutador2.saga}</p>
              <p className="scouter-texto">
                ⚡ Poder de Luta:{" "}
                <strong>
                  {(
                    lutador2.poderDeLuta * (lutador2.estagio > 1 ? 1.5 : 1)
                  ).toLocaleString()}
                </strong>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="container-botao-lutar">
        <button
          className="btn-lutar"
          onClick={simularBatalha}
          disabled={carregando}
        >
          {carregando
            ? "Lendo Scouter... Carregando Ki..."
            : "INICIAR COMBATE ⚡"}
        </button>
      </div>

      {/* Resultado da Batalha */}
      {resultado && (
        <div className="resultado-batalha animate-fade">
          <h2>🏆 Vencedor do Combate:</h2>
          <div className="vencedor-destaque">
            <img
              src={resultado.proximaImagem || resultado.caminhoImagem}
              alt={resultado.nome}
            />
            <h3>{resultado.nome}</h3>
            <p>Sua força avassaladora garantiu a vitória na arena!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Batalha;
