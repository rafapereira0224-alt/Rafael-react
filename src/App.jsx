import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Saiyajins from "./Pages/Saiyajins";
import saiyajinsData from "./Data/saiyajins";

function App() {
  const [listaSaiyajins, setListaSaiyajins] = useState(saiyajinsData);
  const [favoritos, setFavoritos] = useState([]);

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

  const [carregou, setCarregou] = useState(false);

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
  }

  function toggleFavorito(id) {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Rafael-react/"
          element={
            <Home
              listaSaiyajins={listaSaiyajins}
              evoluirSaiyajin={evoluirSaiyajin}
              favoritos={favoritos}
              toggleFavorito={toggleFavorito}
            />
          }
        />
        <Route
          path="/Rafael-react/:saiyajinsId"
          element={
            <Saiyajins
              listaSaiyajins={listaSaiyajins}
              evoluirSaiyajin={evoluirSaiyajin}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
