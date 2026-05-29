import "./CadastroFilme.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import { Alerta } from "../../components/alerta/Alerta";
import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from "sweetalert2";
import Lista from "../../components/lista/Lista";

const CadastroFilmes = () => {
    // States e Variáveis
    const [valor, setValor] = useState("")
    const [editar, setEditar] = useState(false)
    const [listaFilmes, setListaFilmes] = useState([])
    const [listaGeneros, setListaGeneros] = useState([])

    //Get
    const getGeneros = async () => {
        try {
            const retornoAPI = await api.get("/Genero"); // chama a api
            setListaGeneros(retornoAPI.data); // preencher o array listaGeneros
        } catch (error) {
            alert("Problemas ao carregar os dados da API");
            Alerta({
                title: "Cadastro de Gênero",
                text: "Problemas ao carregar os dados da API",
                icon: "error",
                confirmButtonText: "OK",
            });
            console.log(error);
        }
    };


    //-------------------//


    const getFilmes = async () => {
        try {
            const retornoAPI = await api.get("/Filme"); // chama a api
            setListaFilmes(retornoAPI.data); // preencher o array listaGeneros
        } catch (error) {
            alert("Problemas ao carregar os dados da API");
            Alerta({
                title: "Cadastro de Filme",
                text: "Problemas ao carregar os dados da API",
                icon: "error",
                confirmButtonText: "OK",
            });
            console.log(error);
        }
    };
    //Post
    const cadastrarFilme = async (e) => {
        e.preventDefault();

        // Validar o formulário
        if (valor.trim().length == 0) {

            Alerta({
                title: "Testeee",
                text: "Preencher o Filme",
                icon: "warning",
                confirmButtonText: "Legal",
            })

            return false;
        }
        const objCadastros = {
            nome: valor,
        };
        // cadastrar na api com post
        try {
            const retornoAPI = await api.post("/Filme", objCadastros); //cadastra na api
            // alert("Cadastrado com sucesso"); //avisa o usuário que deu certo
            Alerta({
                title: "Cadastro de Filme",
                text: `${valor} cadastrado com sucesso`,
                icon: "success",
                confirmButtonText: "Top!",
            });

            getFilmes(); // atualiza a listagem na tela
            limparFormulario(); //limpar formulário
        } catch (error) {
            alert("Erro ao cadastrar na API");
            Alerta({
                title: "Cadastro de Filmes",
                text: "Cadastrado com sucesso",
                icon: "error",
                confirmButtonText: "Ok!",
            });
            console.log(error);
        }
    };
    //Put
    const preEditar = (item) => {
        setEditar(true);
        setValor(item.nome);
        setId(item.idFilme);
    };
    const editarFilme = async () => {
        if (valor.trim().length == 0) {
            alert("Preencher o Filme");
            return false;
        }
        const objEditar = {
            idFilme: id,
            nome: valor,
        };
        // cadastrar na api com o put
        try {
            const retornoAPI = await api.put(`/Filme/${id}`, objEditar);
            limparFormulario();
            getFilmes();
            // alert("Gênero atualizado");
            Alerta({
                title: "Cadastro de Filme",
                text: "Filme atualizado",
                icon: "success",
                confirmButtonText: "Ok",
            });
        } catch (error) {
            // alert("Erro ao atualiar os dados na API");
            Alerta({
                title: "Cadastro de Filme",
                text: "Erro ao atualiar os dados na API",
                icon: "error",
                confirmButtonText: "Ok",
            });

            console.log(error);
        }
    };

    //Delete
    const excluirFilme = async (item) => {
        const result = await Alerta({
            title: "Cadastro de Filme",
            text: `Quer apagar o filme ${item.nome}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Apagar",
            cancelButtonText: "Jamais",
        })

        if (!result.isConfirmed) {//se não quer apagar para por aqui
            return false;
        }

        try {//se quer apagar, chama a API
            const retornoAPI = await api.delete(`/Filme/${item.idFilme}`); // chama a api

            if (retornoAPI.status == 200 || retornoAPI.status == 204) {
                // alert("Apagado com sucesso");
                Alerta({
                    title: "Cadastro de Filme",
                    text: "Apagado com sucesso",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
                getFilmes();
            } else {
                // alert("Problemas ao apagar o gênero");
                Alerta({
                    title: "Cadastro de Filme",
                    text: "Problemas ao apagar o Filme",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
        } catch (error) {
            // alert("Problemas ao carregar os dados da API");
            Alerta({
                title: "Cadastro de Filme",
                text: "Problemas ao carregar os dados da API",
                icon: "error",
                confirmButtonText: "Ok",
            });
            console.log(error);
        }
    };

    //Funções Auxiliares
    const limparFormulario = () => {
        setValor("");
        setEditar(false);
        setId(0); // resetar o id
    };

    
    //Ciclo de vida
    useEffect(() => {
        getGeneros();
        getFilmes();
    }, []);

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    //Define o título que será exibido no formulário
                    tituloCadastro="Cadastro de Filme"
                    // esconde o select de genero
                    //visibilidade="none"
                    // Define o texto que aparece dentro do campo de input
                    placeholder="filme"
                    // ----------------------------------------------------
                    // Propriedades voltada ao cadastro:

                    //Função que será chamada ao enviar o formulário (onSubmit)
                    funcCadastro={editar ? editarFilme : cadastrarFilme}
                    //Valor atual do campo de texto
                    valor={valor}
                    //Função que atualiza o estado do valor no componente pai sempre que o usuário digita no campo
                    setValor={setValor}
                    btnEditar={editar}
                    cancelarEdicao={limparFormulario}
                    listaGeneros={listaGeneros}
                />

                {/* Lista de Gêneros */}
                <Lista
                    tituloLista="Lista de Filme"
                    //visibilidade="none"
                    //Chama o método para validar:
                    lista={listaFilmes}
                    //Identifica o tipo de lista:
                    tipoLista="filme"
                    funcExcluir={excluirFilme}
                    funcEditar={preEditar}
                />
            </main>
            <Footer />
        </>
    );
}

export default CadastroFilmes;