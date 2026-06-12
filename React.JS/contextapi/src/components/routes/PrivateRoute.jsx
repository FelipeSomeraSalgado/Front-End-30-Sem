import { useContext } from "react"
import UsuarioContext from "../../context/UsuarioContext"
import { Navigate } from "react-router-dom"

// componente para rotas privadas
const PrivateRoute = ({children}) => {
    // recupera os dados do usua
    const {usuario} = useContext(UsuarioContext)
    // se o usuario estiver logado pode acessar o children (children)
    // senão redireciona para a Home (/)
    return usuario ? children : <Navigate to="/" />

}

export default PrivateRoute