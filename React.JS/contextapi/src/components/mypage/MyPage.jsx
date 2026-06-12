import { useContext } from "react"
import { UsuarioContext } from "../../context/UsuarioContext"

const MyPage = () => {

    const {usuario} = useContext(UsuarioContext)

    return (
        <div>
            <h2>Página MyPage</h2>
            <p>Dados do usuário: {usuario}</p>
        </div>
    )
}

export default MyPage