import { Routes, Route } from "react-router-dom";

import { AportesListPage } from './pages/AportesListPage';
import  Header  from './components/Header';
import AportePage from "./pages/AportePage";


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<AportesListPage />} />
        <Route path="/aporte/:id/" element={<AportePage />} />
      </Routes>
    </div>
  );
}

export default App;
