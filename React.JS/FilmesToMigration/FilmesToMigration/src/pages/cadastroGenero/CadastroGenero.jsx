import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Lista from "../../components/lista/Lista";

// Chamando a nossa api
import api from "../../Services/services"
// importando o uso do state
import { useEffect, useState } from "react";

import Swal from 'sweetalert2';

const CadastroGenero = () => {
    //armazena o valor digitado no campo de nome do gênero. Começa como string vazia.
    const [nomeGenero, setNomeGenero] = useState('');
    const [listaGeneros, setListaGeneros] = useState([]);

    function alerta(icone, msg) {
        // alert
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        Toast.fire({
            icon: icone,
            title: msg
        });
        //   fim do alert

    }

    //Função assíncrona: usada porque há uma chamada à API (requisição HTTP) que é assíncrona.
    //É correto e necessário usar async no seu código atual porque você está usando await. => vamos usar o await quando estivermos esperando a resposta da api
    // Evite async em funções que não usam await, para manter o código mais limpo, rápido e previsível.
    async function cadastrarGenero(e) {
        e.preventDefault();
        //Verifica se o usuário não digitou nada (ou só espaços). Se estiver vazio, mostra alerta e encerra a função.
        if (nomeGenero.trim() === "") {
            alerta("warning", "Preencha o nome do gênero!");

            return;
        }
        try {
            //Faz a requisição(post) e espera até que dê certo, se der, ele dá um alert.

            //⚠ A propriedade "nome" deve ser a mesma que está na API!!!
            //A função await pausa a execução até receber a resposta da API.
            await api.post('/genero', { nome: nomeGenero });

            alerta("success", "Cadastro feito com sucesso!");

            // // alert de sucesso
            // const Toast = Swal.mixin({
            //     toast: true,
            //     position: "top-end",
            //     showConfirmButton: false,
            //     timer: 5000,
            //     timerProgressBar: true,
            //     didOpen: (toast) => {
            //         toast.onmouseenter = Swal.stopTimer;
            //         toast.onmouseleave = Swal.resumeTimer;
            //     }
            // });

            // Toast.fire({
            //     icon: "success",
            //     title: "Cadastro feito com sucesso!"
            // });

            // fim do alert de sucesso
            setNomeGenero(''); // Limpa o campo após cadastro
            listarGenero(); // <- Aqui você chama a função



        } catch (error) {

            alerta("error", "Erro ao cadastrar gênero!");

            // alert
            // const Toast = Swal.mixin({
            //     toast: true,
            //     position: "top-end",
            //     showConfirmButton: false,
            //     timer: 5000,
            //     timerProgressBar: true,
            //     didOpen: (toast) => {
            //         toast.onmouseenter = Swal.stopTimer;
            //         toast.onmouseleave = Swal.resumeTimer;
            //     }
            // });

            // Toast.fire({
            //     icon: "error",
            //     title: "Erro ao cadastrar gênero"
            // });
            //   fim do alert
            console.error(error);
        }
    }

    async function listarGenero() {
        try {
            const resposta = await api.get('/genero');
            //Atualiza o estado com os dados retornados pela API.
            setListaGeneros(resposta.data);
        } catch (error) {
            console.error("Erro ao buscar gêneros", error);
        }
    }

    async function excluirGenero(genero) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: true
        });
        swalWithBootstrapButtons.fire({
            title: "Deseja excluir?",
            text: "Você não conseguirá reverter!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            reverseButtons: true
        }).then(async(result) => {
            // Precisou adionar um async para funcionar o await
            if (result.isConfirmed) {

                // Adicionar aqui a requisição

                 try {
                    await api.delete(`/genero/${genero.idGenero}`);
                    // alert("Gênero excluído com sucesso!");
                    listarGenero(); // Atualiza a lista após excluir
                } catch (error) {
                    // alert("Erro ao excluir gênero.");
                    console.error(error);
                }

                swalWithBootstrapButtons.fire({
                    title: "Deletado!",
                    text: "O gênero foi deletado!",
                    icon: "success"
                });

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "O gênero não foi deletado!",
                    icon: "error"
                });
            }
        });
    }

    async function editarGenero(genero) {
        const { value: novoGenero } = await Swal.fire({
            title: "Altere o nome do gênero",
            input: "text",
            inputLabel: "Gênero atualizado",
            // Adicionei o valor do input:
            inputValue: genero.nome,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                return "Preencha o gênero atualizado!";
                }
            }
            });
        // validei se ele realmente existe
        if (novoGenero) {
            try{
                await api.put(`/genero/${genero.idGenero}`, { nome: novoGenero });
                Swal.fire(`O novo gênero é ${novoGenero}`);
                listarGenero();
            }catch(error){
                console.error(error);
            }
        }
    }

    useEffect(() => {
        listarGenero();
        console.log("feito aqui");
    }, []);
    //[] (array de dependências vazio) Diz ao React: "Execute o efeito apenas uma vez, quando o componente for montado (renderizado pela primeira vez)", e nunca mais.




    return (
        <>
            <Header />
            <main>
                <Cadastro
                    //Define o título que será exibido no formulário
                    tituloCadastro="Cadastro de Gênero"
                    // esconde o select de genero
                    visibilidade="none"
                    // Define o texto que aparece dentro do campo de input
                    placeholder="gênero"
                    // ----------------------------------------------------
                    // Propriedades voltada ao cadastro:

                    //Função que será chamada ao enviar o formulário (onSubmit)
                    funcCadastro={cadastrarGenero}
                    //Valor atual do campo de texto
                    valor={nomeGenero}
                    //Função que atualiza o estado do valor no componente pai sempre que o usuário digita no campo
                    setValor={setNomeGenero}
                />

                <Lista
                    tituloLista="Lista de Gêneros"
                    visibilidade="none"

                    //Chama o método para validar:
                    lista={listaGeneros}
                    //Identifica o tipo de lista:
                    tipoLista="genero"


                    funcExcluir = {excluirGenero}
                    funcEditar = {editarGenero}
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;