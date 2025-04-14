// import "./App.css";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import { HashRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DetailSurat from "./pages/DetailSurat";
import About from "./pages/About"; 
import TafsirSurat from "./pages/TafsirSurat";

// Dalam <Routes>
<Route path="/tafsir/:id" element={<TafsirSurat />} />


function App() {
  return (
    <>
      <div className="d-flex row">
        {/* Ganti menggunakan HashRouter karena akan di-deploy di github pages */}
        <HashRouter> 
          <div className="col-3">
            <Navbar />
          </div>
          <div className="col-9">
            <Content>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/surat/:id" element={<DetailSurat />} />
                <Route path="/about" element={<About />} /> {/* Sudah benar */}
                <Route path="/tafsir/:id" element={<TafsirSurat />} />
              </Routes>
            </Content>
          </div>
        </HashRouter>
      </div>
    </>
  );
}

export default App;
