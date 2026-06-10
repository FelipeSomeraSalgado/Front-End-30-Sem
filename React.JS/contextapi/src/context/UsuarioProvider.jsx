import { useState } from "react"
import { UsuarioContext } from "./UsuarioContext"
import { useEffect } from "react"

const UsuarioProvider = ( {children} ) => {
    const [usuario, setUsuario] = useState(null)
    // const [listaUsuarios, setListaUsuarios] = useState([])
    

    //ciclo de vida
   useEffect(() => {
    // ao montar o componente,pega os dados do usuário do localStorage
        const usuarioStorage = JSON.parse(localStorage.getItem("usuario")) || ""
        setUsuario(usuarioStorage)
    }, []) 

    return (
        <UsuarioContext.Provider
            value={{
                usuario, 
                setUsuario
            }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}


export default UsuarioProvider