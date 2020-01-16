import React, { useState, useEffect } from "react";
import "./global.css";
import "./app.css";
import "./Sidebar.css";
import "./Main.css";
import api from "./services/api";


import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

// Componente - Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Propriedade - Informações que um componente PAI passa para o componente FILHO
// Estado - Informações mantidas pelo component ( imutabilidade )

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data);
      console.log(response);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post("/devs", data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit = {handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key = {dev._id} dev = {dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
