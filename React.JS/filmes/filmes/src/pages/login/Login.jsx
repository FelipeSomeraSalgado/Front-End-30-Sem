import "./Login.css";
import Botao from "../../components/botao/Botao";
import Logo from "../../assets/img/logo.svg";
import { useContext, useEffect, useState } from "react";
import { UsuarioContext } from "../../context/UsuarioContext";
import { useNavigate } from "react-router-dom";
import Alert from "sweetalert2";
import  api from "../../services/Services"
import { jwtDecode } from "jwt-decode"

const Login = () => {
  //   state global (UsuarioContext)
  const { usuario, setUsuario } = useContext(UsuarioContext);
  // state local
  //******************** novoUsuario = email **************
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const login = async () => {

    if (email.trim().length === 0 || senha.trim().length === 0) {
      Alert({
        title: "Login",
        text: "Preencha todos os campos para continuar",
        icon: "warning",
        confirmButtonText: "OK",
      })
      return false;
    }

    const dadosLogin = {
      email: email,
      senha: senha,
    };

    try {
      const retornoAPI = await api.post("/login", dadosLogin);
      console.log("Retorno da API");
      console.log(retornoAPI.data);
     //pega o token que retornou da API
      const token = retornoAPI.data.token
      //decodifica o token
      const ususarioDecoded = jwtDecode(token)
      console.log(usuarioDecoded);

      // guarda os dados na Context do Usuário (global)
      setUsuario(ususarioDecoded);
      // guarda os dados no navegador localStorage
      localStorage.setItem("usuario", JSON.stringify(usuarioDecoded)); // pegar o dado e colocar no storage
      //limpa os campos do formulário
      setEmail("");
      setSenha("");
      //envia o usuário logado para a rota de gêneros
      navigate("/generos");

    } catch (error) {
      Alert({
        title: "Login",
        text: "Preencha todos os campos para continuar",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const verificaLogin = () => {
    const logado = JSON.stringify(localStorage.getItem("usuario"));

    if (logado != undefined || logado != null) {
      setUsuario(usuario);
      navigate("/generos");
    }
  };

  // carrega os dados do login
  useEffect(() => {
    verificaLogin();
  }, []);

  return (
    <main className="main_login">
      <div className="banner"></div>
      <section className="section_login">
        <img src={Logo} alt="Logo do Filmoteca" />
        <form action="" className="form_login">
          <h1>Login</h1>
          <div className="campos_login">
            <div className="campo_input">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="campo_input">
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                name="senha"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                }}
              />
            </div>
          </div>
          <Botao nomeDoBotao="Entrar" btnLogin={true} fnLogin={login} />
        </form>
      </section>
    </main>
  );
};

export default Login;