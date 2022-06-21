import { Routes, Route } from "react-router-dom";

import AuthProvider from "./context/AuthContext";



import  Header  from './components/Header';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { AportesListPage } from "./pages/AportesListPage";
import AporteCreate from "./components/Aportes/AporteCreate";
import AporteItem from "./components/Aportes/AporteItem";
import AporteItemUpdate from "./components/Aportes/AporteItemUpdate";
import AporteItemDelete from "./components/Aportes/AporteItemDelete";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Routes>
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/aportes/" element={<AportesListPage />}/>
            <Route path="/aportes/create/" element={<AporteCreate />} />
            <Route path="/aportes/:aporteId/" element={<AporteItem />} />
            <Route path="/aportes/:aporteId/update/" element={<AporteItemUpdate />} />
            <Route path="/aportes/:aporteId/delete/" element={<AporteItemDelete />} />
           
            
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
