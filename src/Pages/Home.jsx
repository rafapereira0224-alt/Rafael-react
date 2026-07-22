import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import SaiyajinCard from "../Components/SaiyajinCard/SaiyajinCard";
import fundoDBZ from "../assets/img-1031584-dragon-ball.jpg";
import "../app.css";
import "../Components/SaiyajinButton/SaiyajinButton.css";
import "../Components/Musica/BotaoJukebox.css";

function Home({
  listaSaiyajins,
  evoluirSaiyajin,
  favoritos,
  toggleFavorito,
  alternarTema,
  tema,
}) {
  const qtdEvoluidos = listaSaiyajins.filter((s) => s.estagio > 1).length;
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const [termoBusca, setTermoBusca] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const listaFiltrada = listaSaiyajins.filter((s) => {
    const categoriaCorreta =
      categoriaAtiva === "todos"
        ? true
        : categoriaAtiva === "favoritos"
          ? favoritos.includes(s.id)
          : s.tipo === categoriaAtiva;

    const nomeCorreto = s.nome.toLowerCase().includes(termoBusca.toLowerCase());
    return categoriaCorreta && nomeCorreto;
  });

  return (
    <main
      translate="no"
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${fundoDBZ})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "40px 20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "var(--cor-fundo)",
        transition: "background-color 0.5s ease",
      }}
    >
      {/* Seletor rápido de tema/saga flutuante */}
      <select
        value={tema}
        onChange={(e) => alternarTema(e.target.value)}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "10px 15px",
          borderRadius: "20px",
          cursor: "pointer",
          backgroundColor: "var(--cor-acento)",
          color: "#000",
          fontWeight: "bold",
          border: "2px solid #fff",
          zIndex: 9999,
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
        }}
      >
        <option value="todos">🔥 Tema Padrão</option>
        <option value="classico">🐉 Clássico</option>
        <option value="saiyajins">💥 Saiyajins</option>
        <option value="viloes">😈 Vilões</option>
        <option value="freeza">🪐 Saga Freeza</option>
        <option value="cell">🦠 Saga Cell</option>
        <option value="boo">🩷 Saga Majin Boo</option>
        <option value="goku-black">🖤 Goku Black</option>
        <option value="torneio-do-poder">🌐 Torneio do Poder</option>
        <option value="gt">⭐ Dragon Ball GT</option>
        <option value="filmes">🎬 Filmes</option>
        <option value="herois">🛡️ Heróis</option>
      </select>

      <header className="home-header">
        <h1 className="home-titulo">Dragon Ball</h1>
        <p className="home-subtitulo">
          Explore o universo, evolua os guerreiros e filtre por categorias.
        </p>

        <div className="placar-evoluidos">
          <span>
            Personagens Evoluídos: <strong>{qtdEvoluidos}</strong>
          </span>
        </div>
      </header>

      <div className={`barra-pesquisa ${isFocused ? "focada" : ""}`}>
        <motion.div
          animate={{ scale: isFocused ? 1.2 : 1, rotate: isFocused ? 360 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaSearch className="icone-busca" />
        </motion.div>
        <input
          type="text"
          placeholder="Buscar personagem..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      <div className="container-filtros">
        {[
          { id: "todos", label: "TODOS" },
          { id: "sayajin", label: "SAYAJINS" },
          { id: "vilao", label: "VILÕES" },
          { id: "z-fighters", label: "Z-FIGHTERS" },
          { id: "divindade", label: "DIVINDADES" },
          { id: "anti-heroi", label: "ANTI-HERÓIS" },
          { id: "favoritos", label: "FAVORITOS" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaAtiva(cat.id)}
            className={`btn-filtro ${categoriaAtiva === cat.id ? "ativo" : ""}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <section
        id="center"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "120px",
          justifyItems: "center",
          width: "100%",
          maxWidth: "1000px",
          marginTop: "30px",
        }}
      >
        {listaFiltrada.map((saiyajin) => (
          <motion.div
            key={saiyajin.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <SaiyajinCard
              id={saiyajin.id}
              nome={saiyajin.nome}
              estagio={saiyajin.estagio}
              caminhoImagem={saiyajin.caminhoImagem}
              descricao={saiyajin.descricao}
              evoluirSaiyajin={() => evoluirSaiyajin(saiyajin.id)}
              isFavorito={favoritos.includes(saiyajin.id)}
              toggleFavorito={toggleFavorito}
            />
          </motion.div>
        ))}
      </section>

      <br />
      <Link to="/Rafael-react/musicas" className="link-jukebox">
        🎵 Ir para a Jukebox
      </Link>
    </main>
  );
}

export default Home;
