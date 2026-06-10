import { useContext, useState } from "react";
import { UsuarioContext } from "../../context/UsuarioContext";

const Perfil = () => {
  //   state global (UsuarioContext)
  const { usuario, setUsuario } = useContext(UsuarioContext);
  // state local
  const [novoUsuario, setNovoUsuario] = useState("");


  const login = () => {

    setUsuario(novoUsuario);
    localStorage.setItem("usuario", JSON.stringify(novoUsuario));
    setNovoUsuario("");
  }

  return (
    <>
      <h2>Página de perfil do usuário</h2>
      <span>Usuário: {usuario}</span>
      <p>
        <input
          type="text"
          placeholder="Novo usuário"
          value={novoUsuario}
          onChange={(e) => {
            setNovoUsuario(e.target.value)
          }}
        />
        <button
          onClick={() => {
            login()
          }}
        >
          Entrar
        </button>
      </p>
    </>
  );
};

export default Perfil;