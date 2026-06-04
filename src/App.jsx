import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Saiyajins from "./Pages/Saiyajins";
import saiyajinsData from "./Data/saiyajins";

function App() {
  const [listaSaiyajins, setListaSaiyajins] = useState(saiyajinsData);

  function evoluirSaiyajin(id) {
    setListaSaiyajins(prev => prev.map(s => 
      s.id === id && s.estagio === 1 ? { ...s, estagio: 2, caminhoImagem: s.proximaImagem } : s
    ));
  }

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Rafael-react/" element={<Home listaSaiyajins={listaSaiyajins} evoluirSaiyajin={evoluirSaiyajin} />} />
        <Route path="/Rafael-react/:saiyajinsId" element={<Saiyajins listaSaiyajins={listaSaiyajins} evoluirSaiyajin={evoluirSaiyajin} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;