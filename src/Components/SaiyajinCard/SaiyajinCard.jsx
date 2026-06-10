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
  return (
    <div className="CardSaiyajin">
      <div className="image-box">
        <Link to={`/Rafael-react/${id}`}>
          <img
            src={caminhoImagem}
            width={200}
            height={240}
            alt={nome}
            title={nome}
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
    onClick={() => evoluirSaiyajin(id)}
  >
    Evoluir
  </motion.button>

        <button
          onClick={() => toggleFavorito(id)}
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
