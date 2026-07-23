import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Saiyajins from "./Pages/Saiyajins";
import Musicas from "./Components/Musicas";
import saiyajinsData from "./Data/saiyajins";
import AnalyticsTracker from "./Components/Analytics Tracker/AnalyticsTracker";

function App() {
  const [listaSaiyajins, setListaSaiyajins] = useState(saiyajinsData);
  const [favoritos, setFavoritos] = useState([]);
  const [carregou, setCarregou] = useState(false);

  const [tema, setTema] = useState(
    localStorage.getItem("temaDBZ") || "saiyajin",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
    localStorage.setItem("temaDBZ", tema);
  }, [tema]);

  const alternarTema = (novoTema) => {
    setTema(novoTema);
  };

  useEffect(() => {
    const salvos = localStorage.getItem("favoritosDBZ");
    if (salvos) {
      try {
        setFavoritos(JSON.parse(salvos));
      } catch (e) {
        console.error("Erro ao ler localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (carregou) {
      localStorage.setItem("favoritosDBZ", JSON.stringify(favoritos));
    } else {
      setCarregou(true);
    }
  }, [favoritos]);

  function evoluirSaiyajin(id) {
    setListaSaiyajins((prev) =>
      prev.map((s) =>
        s.id === id && s.estagio === 1
          ? { ...s, estagio: 2, caminhoImagem: s.proximaImagem }
          : s,
      ),
    );
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "clique_evoluir", saiyajin_id: id });
  }

  function toggleFavorito(id) {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  }

  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              listaSaiyajins={listaSaiyajins}
              evoluirSaiyajin={evoluirSaiyajin}
              favoritos={favoritos}
              toggleFavorito={toggleFavorito}
              alternarTema={alternarTema}
              tema={tema}
            />
          }
        />
        <Route
          path="/:saiyajinsId"
          element={
            <Saiyajins
              listaSaiyajins={listaSaiyajins}
              evoluirSaiyajin={evoluirSaiyajin}
              alternarTema={alternarTema}
              tema={tema}
            />
          }
        />
        <Route path="/musicas" element={<Musicas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
