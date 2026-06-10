import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Perfil from "./components/perfil/Perfil";
import MyPage from "./components/mypage/MyPage";
import Header from "./components/header/Header";
import PrivateRoute from "./components/routes/PrivateRoute";
import CadastrarProduto from "./components/cadastrarproduto/CadastrarProduto";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />

          <Route path="/myPage" element={
            <PrivateRoute>
               <MyPage />{/* children*/}
            </PrivateRoute>
          } />
          <Route path="/cdProduto" element={
            <PrivateRoute>
              <CadastrarProduto />
            </PrivateRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;