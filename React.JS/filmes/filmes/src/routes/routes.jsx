import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Filmes from "../pages/cadastroFilme/CadastroFilme";
import Gêneros from "../pages/cadastroGenero/CadastroGenero";

const Rotas = () => {
    return (
        <BrowserRouter>
        {/* aqui iria o header*/}
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/filmes" element={<Filmes />} />
            <Route path="/generos" element={<Gêneros />} />
        </Routes>
        {/* aqui iria o footer*/}
        </BrowserRouter>
    );
}

export default Rotas;