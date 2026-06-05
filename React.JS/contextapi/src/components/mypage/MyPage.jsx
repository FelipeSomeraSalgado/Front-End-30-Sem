import { useContext } from "react"
import { UsuarioContext } from "../../context/UsuarioContext"

const MyPage = () => {
    // extrai o usuário para utilizar os seus dados
    const {usuario} = useContext(UsuarioContext)

    return (
        <div>
            <h2>Meu Blog</h2>
            <p>Dados do usuário: {usuario}</p>
        </div>
    )
}

export default MyPage