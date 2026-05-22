import "./CadastroGenero.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import { useEffect, useState } from "react";
import Lista from "../../components/lista/Lista";
import api from "../../services/services";

const CadastroGenero = () => {

    // variaveis e states
    const [valor, setValor] = useState("");

    const [listaGeneros, setListaGeneros] = useState([]);


    const excluirGenero = (item) => {
        if(!confirm(`Deseja realmente excluir o gênero ${item.nome}?`)) {
            return false;
        }
         try {
            const retornoAPI = await api.delete(`/Genero/${item.idGenero}`);
            alert("Gênero excluído com sucesso!");
            setListaGeneros(retornoAPI.data);

        } 
        catch (error) {
            alert("Problema ao carregar os dados na API");
        }
    };

    const editarGenero = () => {
        alert("Função editar gênero em desenvolvimento");
    };

    //funções e ciclo de vida
    const getGeneros = async () => {
        //chama a API
        try {
            const retornoAPI = await api.get("/Genero");

            //preencher o array lisytaGeneros
            setListaGeneros(retornoAPI.data);
        } catch (error) {
            alert("Problema ao carregar os dados na API");
        }
    }


    const CadastrarGenero = async (e) => {
        e.preventDefault();

        if (valor.trim().length = 0) {
            alert("Por favor, informe o nome do gênero");
            return false;
        }

        const objetoGenero = {
            nome: valor
        }

        try {
            const resposta = await api.post("/Genero", objetoGenero);
            alert("Gênero cadastrado com sucesso!");
            getGeneros(); // Atualiza a lista de gêneros após o cadastro
        } catch (error) {
            alert("Problema ao cadastrar o gênero na API");
            console.log(error);
        }
    };//fim da função cadastrarGenero

    const limparformulario = () => {
        setValor("");
    }


    //ciclo da vida
    useEffect(() => {
        getGeneros();
    }, []); // O array vazio [] garante que o useEffect seja executado apenas uma vez, quando o componente for montado.


    const cadastrarGenero = (e) => {
        e.preventDefault();

        alert(`Função cadastrar gênero em desenlvolvimento`);
        // Aqui você pode adicionar a lógica para enviar o gênero para um backend ou atualizar uma lista local
    }

    //O JSX em si (XML E HMTL)
    return (
        <>
            <Header />
            <main>
                {/*Form de cadastro de Genero*/}

                <Cadastro
                    //Define o título que será exibido no formulário
                    tituloCadastro="Gênero de Filme"
                    // esconde o select de genero
                    visibilidade="none"
                    // Define o texto que aparece dentro do campo de input
                    placeholder="gênero"
                    // ----------------------------------------------------
                    // Propriedades voltada ao cadastro:

                    //Função que será chamada ao enviar o formulário (onSubmit)
                    funcCadastro={cadastrarGenero}
                    //Valor atual do campo de texto
                    valor={valor}
                    //Função que atualiza o estado do valor no componente pai sempre que o usuário digita no campo
                    setValor={setValor}

                />
                {/*Lista de gêneros cadastrados*/}

                <Lista
                    tituloLista="Lista de Gêneros"
                    visibilidade="none"

                    //Chama o método para validar:
                    lista={listaGeneros}
                    //Identifica o tipo de lista:
                    tipoLista="genero"

                    funcExcluir={excluirGenero}
                    funcEditar={editarGenero}
                />


            </main>
            <Footer />
        </>
    );
}

export default CadastroGenero;
