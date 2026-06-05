import { useContext } from "react"
import { Link } from "react-router-dom"
import { UsuarioContext } from "../../context/UsuarioContext"

const Header = () => {
    const { usuario, setUsuario } = useContext(UsuarioContext)

    return (

        <header>
            <nav>
                <Link to={"/"}>Home</Link> {" "}
                <Link to="/perfil">Pefil</Link>{" "}
                <Link to="/myPage">My Blog</Link>{" "}
                <span>( {usuario} )</span>
                <button
                    onClick={() => {
                        setUsuario(null);
                    }}
                >
                    Sair
                </button>
            </nav>
        </header>
    )
}

export default Header