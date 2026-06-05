import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UsuarioContext } from "../../context/UsuarioContext";

//componente para rotas privadas
const PrivateRoute = ({children}) => {
    //recupera os dados do ususario 
    const {usuario} = useContext(UsuarioContext)
    //se o usuario estiver logado pode acessar (childern)
    //se não redireciona para a página Home
    return usuario ? children : <Navigate to="/" />
}

export default PrivateRoute;