import Header from "../../components/header/Header";
import "./CadastroFilme.css";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import { Alerta } from "../../components/Alerta/alerta"; 
import { useEffect, useState } from "react";
import Lista from "../../components/lista/Lista";
import api from "../../services/services"; 

const CadastroFilme = () => {
  // Estados principais da tela
  const [valor, setValor] = useState(""); // Nome/Título do filme
  const [generoSelecionado, setGeneroSelecionado] = useState(""); // ID do Gênero selecionado
  const [editar, setEditar] = useState(false);
  const [idFilmeSelecionado, setIdFilmeSelecionado] = useState(null); 
  
  // Listas vindas da API
  const [listaFilmes, setListaFilmes] = useState([]);
  const [listaGeneros, setListaGeneros] = useState([]);

  // 1. Busca os gêneros cadastrados no banco de dados
  const getGeneros = async () => {
    try {
      const retornoAPI = await api.get("/Genero");
      setListaGeneros(retornoAPI.data);
    } catch (error) {
      alert("Erro ao carregar gêneros");
    }
  };

  // 2. Busca os filmes cadastrados no banco de dados
  const getFilmes = async () => {
    try {
      const retornoAPI = await api.get("/Filme");
      setListaFilmes(retornoAPI.data);
    } catch (error) {
      alert("Erro ao carregar filmes");
    }
  };

  // Carrega as listas assim que a página abre
  useEffect(() => {
    getGeneros();
    getFilmes();
  }, []);

  // 3. Prepara o formulário quando o usuário clica em "Editar" na tabela
  const preEditar = (filme) => {
    setEditar(true);
    setIdFilmeSelecionado(filme.idFilme); 
    setValor(filme.titulo);               
    
    // Captura o ID do gênero de todas as formas que a API C# pode enviar
    const idGen = 
      filme.idGenero ?? 
      filme.genero?.idGenero ?? 
      filme.idGeneroNavigation?.idGenero;
      
    if (idGen) {
      setGeneroSelecionado(idGen);
    }
  };

  // 4. Salva um novo filme (POST)
  const cadastrarFilme = async (e) => {
    e.preventDefault();
    
    // Validação rígida: Se o gênero estiver vazio, não deixa cadastrar
    if (valor.trim().length === 0 || !generoSelecionado) {
      Alerta({ title: 'Atenção', text: 'Preencha o nome do filme e selecione um gênero.', icon: 'warning' });
      return;
    }

    const formData = new FormData();
    formData.append("titulo", valor);
    formData.append("idGenero", generoSelecionado);
    formData.append("imagem", "default.jpg");

    try {
      await api.post("/Filme", formData);
      Alerta({ title: 'Sucesso', text: 'Filme cadastrado com sucesso!', icon: 'success' });
      getFilmes();
      limparFormulario();
    } catch (error) {
      Alerta({ title: 'Erro', text: 'Erro ao cadastrar o filme.', icon: 'error' });
    }
  };

  // 5. Atualiza o filme existente (PUT)
  const editarFilme = async (e) => {
    e.preventDefault();
    
    if (valor.trim().length === 0 || !generoSelecionado) {
      Alerta({ title: 'Atenção', text: 'Preencha todos os campos.', icon: 'warning' });
      return;
    }

    const formData = new FormData();
    formData.append("idFilme", idFilmeSelecionado);
    formData.append("titulo", valor);
    formData.append("idGenero", generoSelecionado);
    formData.append("imagem", "default.jpg");

    try {
      await api.put(`/Filme/${idFilmeSelecionado}`, formData);
      Alerta({ title: 'Sucesso', text: 'Filme atualizado!', icon: 'success' });
      getFilmes();
      limparFormulario();
    } catch (error) {
      Alerta({ title: 'Erro', text: 'Erro ao editar o filme.', icon: 'error' });
    }
  };

  // 6. Exclui um filme do sistema (DELETE)
  const excluirFilme = async (item) => {
    const id = item.idFilme || item; 
    if (!window.confirm("Deseja realmente excluir este filme?")) return;
    
    try {
      await api.delete(`/Filme/${id}`);
      Alerta({ title: 'Sucesso', text: 'Excluído!', icon: 'success' });
      getFilmes();
    } catch (error) {
      try {
        await api.delete(`/Filme?id=${id}`);
        Alerta({ title: 'Sucesso', text: 'Excluído!', icon: 'success' });
        getFilmes();
      } catch (subError) {
        Alerta({ title: 'Erro ao Excluir', text: 'Problemas ao excluir o filme na API.', icon: 'error' });
      }
    }
  };

  // 7. Reseta o formulário
  const limparFormulario = () => {
    setValor("");
    setGeneroSelecionado(""); // Reseta o select para a opção padrão "Selecione um gênero"
    setEditar(false);
    setIdFilmeSelecionado(null);
  };

  return (
    <>
      <Header />
      <main>
        <Cadastro
          tituloCadastro={editar ? "Editar Filme" : "Cadastrar um Filme"}
          placeholder="filme"
          funcCadastro={editar ? editarFilme : cadastrarFilme}
          valor={valor}
          setValor={setValor}
          btnEditar={editar}
          cancelarEdicao={limparFormulario}
          listaGeneros={listaGeneros}
          
          // MAPEA CADA NOME DE PROP POSSÍVEL para que o Cadastro.jsx encontre o estado correto
          generoSelecionado={generoSelecionado}
          setGeneroSelecionado={setGeneroSelecionado}
          valorGenero={generoSelecionado}
          setValorGenero={setGeneroSelecionado}
        />
        
        <Lista
          tituloLista="Lista de Filmes"
          lista={listaFilmes}
          listaGeneros={listaGeneros} 
          tipoLista="filme"
          funcExcluir={excluirFilme} 
          funcEditar={preEditar}     
        />
      </main>
      <Footer />
    </>
  );
};

export default CadastroFilme;