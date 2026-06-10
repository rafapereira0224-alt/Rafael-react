import { useEffect, useState } from "react";
import SaiyajinCard from "../Components/SaiyajinCard/SaiyajinCard";
import fundoDBZ from "../assets/img-1031584-dragon-ball.jpg";
import musicaDBZ from "../assets/dragonball.mp3";
import "../app.css";
import "../Components/SaiyajinButton/SaiyajinButton.css";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

function Home({ listaSaiyajins, evoluirSaiyajin, favoritos, toggleFavorito }) {
  const [playerAudio] = useState(new Audio(musicaDBZ));

  const qtdEvoluidos = listaSaiyajins.filter(
    (saiyajin) => saiyajin.estagio > 1,
  ).length;

  useEffect(() => {
    playerAudio.loop = true;
    return () => {
      playerAudio.pause();
      playerAudio.currentTime = 0;
    };
  }, [playerAudio]);

  function tocarMusica() {
    playerAudio.play();
  }
  function pararMusica() {
    playerAudio.pause();
    playerAudio.currentTime = 0;
  }

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
    <div
      translate="no"
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${fundoDBZ})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "40px 20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "#fff", textShadow: "2px 2px 4px #000" }}>
        Dragon Ball
      </h1>

      <h2 style={{ color: "#fff", textShadow: "1px 1px 3px #000" }}>
        Quantidade de personagens evoluidos: {qtdEvoluidos}
      </h2>
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#fff",
          padding: "5px 15px",
          borderRadius: "25px",
          border: "2px solid #ffcc00",
          marginBottom: "20px",
        }}
      >
     
        <motion.div
          animate={{
            scale: isFocused ? 1.2 : 1,
            rotate: isFocused ? 360 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <FaSearch style={{ color: "#555", marginRight: "10px" }} />
        </motion.div>

        <input
          type="text"
          placeholder="Buscar personagem..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)} 
          style={{
            border: "none",
            outline: "none",
            padding: "5px",
            width: "200px",
            background: "transparent",
          }}
        />
      </div>

      <div className="container-filtros">
        {[
          "todos",
          "sayajin",
          "vilao",
          "z-fighters",
          "divindade",
          "anti-heroi",
          "favoritos",
        ].map((tipo) => (
          <button
            key={tipo}
            onClick={() => setCategoriaAtiva(tipo)}
            className={`btn-filtro ${categoriaAtiva === tipo ? "ativo" : ""}`}
          >
            {tipo === "z-fighters" ? "Z-FIGHTERS" : tipo.toUpperCase()}
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
              evoluirSaiyajin={() => evoluirSaiyajin(saiyajin.id)}
              isFavorito={favoritos.includes(saiyajin.id)}
              toggleFavorito={toggleFavorito}
            />
          </motion.div>
        ))}
      </section>
      <div
        style={{
          marginTop: "35px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "15px",
        }}
      >
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
