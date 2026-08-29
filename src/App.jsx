import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Saiyajins from "./Pages/Saiyajins";
import Musicas from "./Components/Musicas";
import saiyajinsData from "./Data/saiyajins";
import AnalyticsTracker from "./Components/Analytics Tracker/AnalyticsTracker";
import { achievementsData } from "./Data/achievementsData";
import AchievementToast from "./Components/AchievementToast";
import { playSound } from "./soundEffects";
import Batalha from "./Pages/Batalha";

function App() {
  const [listaSaiyajins, setListaSaiyajins] = useState(saiyajinsData);
  const [favoritos, setFavoritos] = useState([]);
  const [carregou, setCarregou] = useState(false);
  const [novaConquistaToast, setNovaConquistaToast] = useState(null);

  const [achievements, setAchievements] = useState(() => {
    const salvas = localStorage.getItem("achievementsDBZ");
    if (salvas) {
      try {
        return JSON.parse(salvas);
      } catch (e) {
        console.error("Erro ao ler conquistas do localStorage", e);
      }
    }
    return achievementsData;
  });

  const [tema, setTema] = useState(
    localStorage.getItem("temaDBZ") || "saiyajin",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
    localStorage.setItem("temaDBZ", tema);
  }, [tema]);

  const alternarTema = (novoTema) => {
    setTema(novoTema);
    unlockAchievement("theme_changer");
  };

  useEffect(() => {
    localStorage.setItem("achievementsDBZ", JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    const salvos = localStorage.getItem("favoritosDBZ");
    if (salvos) {
      try {
        setFavoritos(JSON.parse(salvos));
      } catch (e) {
        console.error("Erro ao ler favoritos", e);
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

  const unlockAchievement = (id) => {
    setAchievements((prev) => {
      const encontrada = prev.find((ach) => ach.id === id);

      if (encontrada && !encontrada.unlocked) {
        setNovaConquistaToast(encontrada);
        playSound("conquista");
      }

      return prev.map((ach) =>
        ach.id === id && !ach.unlocked ? { ...ach, unlocked: true } : ach,
      );
    });
  };

  const verificarConquistas = (novaLista, novosFavoritos) => {
    const qtdEvoluidos = novaLista.filter((s) => s.estagio > 1).length;
    const totalSaiyajins = novaLista.length;
    const qtdFavoritos = novosFavoritos.length;

    if (qtdEvoluidos >= 1) unlockAchievement("first_evolution");
    if (qtdEvoluidos >= 3) unlockAchievement("evolution_3");
    if (qtdEvoluidos >= 5) unlockAchievement("evolution_5");
    if (qtdEvoluidos >= 10) unlockAchievement("evolution_10");
    if (qtdEvoluidos >= 15) unlockAchievement("evolution_15");
    if (totalSaiyajins > 0 && qtdEvoluidos === totalSaiyajins) {
      unlockAchievement("evolution_all");
    }

    if (qtdFavoritos >= 1) unlockAchievement("favoriter");
    if (qtdFavoritos >= 3) unlockAchievement("collector_3");
    if (qtdFavoritos >= 5) unlockAchievement("collector_5");
    if (qtdFavoritos >= 10) unlockAchievement("collector_10");
  };

  function evoluirSaiyajin(id) {
    let novaLista;
    setListaSaiyajins((prev) => {
      novaLista = prev.map((s) =>
        s.id === id && s.estagio === 1
          ? { ...s, estagio: 2, caminhoImagem: s.proximaImagem }
          : s,
      );
      verificarConquistas(novaLista, favoritos);
      return novaLista;
    });

    playSound("evoluir");

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "clique_evoluir", saiyajin_id: id });
  }

  function toggleFavorito(id) {
    setFavoritos((prev) => {
      const novosFavoritos = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];

      verificarConquistas(listaSaiyajins, novosFavoritos);
      return novosFavoritos;
    });

    playSound("favorito");
  }

  return (
    <HashRouter>
      <AnalyticsTracker />

      <AchievementToast
        conquista={novaConquistaToast}
        onClose={() => setNovaConquistaToast(null)}
      />

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
              unlockAchievement={unlockAchievement}
              achievements={achievements}
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
        <Route
          path="/batalha"
          element={<Batalha listaSaiyajins={listaSaiyajins} />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
