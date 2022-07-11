import { Routes, Route } from "react-router-dom";

import AuthProvider from "./context/AuthContext";
import ClientesProvider from "./context/ClientesContext";
import AportesProvider from "./context/AportesContext";




import  Header  from './components/Header';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { AportesListPage } from "./pages/AportesListPage";
import GastosListPage from "./pages/GastosListPage";
import ClientesListPage from "./pages/ClientesListPage";
import TrabajadoresListPage from "./pages/TrabajadoresListPage";
import TrabajadorDetail from "./components/TrabajadorDetail";
import ClienteDetailItem from "./components/Clientes/ClienteDetailItem";
import TiendaProvider from "./context/TiendaContext";
import GastosProvider from "./context/GastosContext";



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AportesProvider>
          <GastosProvider>
        <TiendaProvider>
        <Header />
        <Routes>
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/aportes/" element={<AportesListPage />}/>
            <Route path="/gastos/" element={<GastosListPage />}/>           
            <Route path="/clientes/" element={<ClientesProvider><ClientesListPage /></ClientesProvider>}/>
            <Route path="/clientes/:clienteId/" element={<ClientesProvider><ClienteDetailItem /></ClientesProvider>}/>
            <Route path="/trabajadores/" element={<TrabajadoresListPage />}/>
            <Route path="/trabajadores/:trabajadorId/" element={<TrabajadorDetail />}/>
        </Routes>
        </TiendaProvider>
          </GastosProvider>
        </AportesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
