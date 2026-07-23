import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function SaiyajinCard({
  nome,
  caminhoImagem,
  estagio,
  evoluirSaiyajin,
  id,
  isFavorito,
  toggleFavorito,
}) {
  const registrarClick = (destino) => {
    console.log("Evento de clique enviado, destino:", destino);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "click",
      destino: destino,
    });
  };

  return (
    <div className="CardSaiyajin">
      <div className="image-box">
        <Link
          to={`/${id}`}
          onClick={() => registrarClick(nome)}
          title={`Ir para a página de detalhes de ${nome}`}
          aria-label={`Ir para a página de detalhes de ${nome}`}
        >
          <img
            src={caminhoImagem}
            width={200}
            height={240}
            alt={nome}
            loading="lazy"
          />
        </Link>
      </div>

      <h2>{nome}</h2>
      <p>Estágio: {estagio}</p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            registrarClick(`Evoluir: ${nome}`);
            evoluirSaiyajin(id);
          }}
          title={`Evoluir o personagem ${nome}`}
          aria-label={`Evoluir o personagem ${nome}`}
        >
          Evoluir
        </motion.button>

        <button
          onClick={() => toggleFavorito(id)}
          title={
            isFavorito
              ? `Remover ${nome} dos favoritos`
              : `Adicionar ${nome} aos favoritos`
          }
          aria-label={
            isFavorito
              ? `Remover ${nome} dos favoritos`
              : `Adicionar ${nome} aos favoritos`
          }
          style={{
            cursor: "pointer",
            fontSize: "20px",
            background: "transparent",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "5px 10px",
          }}
        >
          {isFavorito ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}

export default SaiyajinCard;
