import "./produto.css"
import { useEffect, useState } from "react"
import img from '../../assets/image.jpg'
import api from "../../services/services"


export default function Produto() {

    //states e variáveis
    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState("")
    const [descricao, setDescricao] = useState("")
    const [quantidade, setQuantidade] = useState("")
    const [imagem, setImagem] = useState(img)
    const [editar, setEditar] = useState(false)
    const [produtoId, setProdutoId] = useState(0) //usado no editar
    //lista de produtos na tela
    const [arrProdutos, setArrProdutos] = useState([])

    //ciclos de vida e funcoes
    async function cadastrarProduto(e) {
        e.preventDefault() //nao deixa o formulario ser postado 

        //validar o furmlário  
        if (nome.trim().length == 0 || isNaN(preco) || descricao.trim().length == 0 || isNaN(quantidade)) {
            alert("Preencha os campos corretamente")
            return false;
        }

        //gera o objeto que vai para a api
        //object short sintaxe
        const objCadastro = {
            nome: nome,
            preco: preco,
            descricao: descricao,
            quantidade: quantidade,
            imagem: imagem
        }

        console.log(objCadastro)

        //cadastrar na api
        try {
            const retornoAPI = await api.post("/produtos", objCadastro)

            console.log(retornoAPI)

            //validando o retorno da api

            if (retornoAPI.status == 201) {
                const dadosCadastrados = await retornoAPI.data
                // console.log(dadosCadastrados) dado que acabou de ser cadastrado
                setArrProdutos([...arrProdutos, dadosCadastrados])
                alert("Produto cadastrado com sucesso")
                //limpar o formulário
                limparForm()

            } else {
                alert("Problema inesperado")
            }

        } catch (e) {
            console.log("Não foi possível salvar os dados")
            console.log(e)
        }
        //gerar o fetch para fazer o post

    }

    //funcao que reinicia os states para limpar o formulário
    function limparForm() {
        setNome("")
        setPreco("")
        setDescricao("")
        setQuantidade("")
        setImagem(img)
        setProdutoId(null)
    }

    //funcao para deletar o produto
    async function deletarProduto(id) {

        
        if (!confirm("Deseja realmente apagar o produto?")) {
            return false;
        }


        try {
            const retornoAPI = await api.delete(`/produtos/${id}`)

            if (retornoAPI.status == 200 && retornoAPI.statusText == "OK") {
                alert("Produto apagado com sucesso")

                //gerar uma nova lista com os produtos que sobraram
                const novaLista = arrProdutos.filter((prod) => {
                    return prod.id != id
                })

                setArrProdutos(novaLista)

            } else {
                alert("Algum erro ocorreu ao apagar")
            }


        } catch (e) {
            console.log("Erro ao apagar o produto")
            console.log(e)
        }
    }

    //funcao para editar o produto
    async function editarProduto(e) {

        if (nome.trim().length == 0 || isNaN(preco) || preco <= 0 || descricao.trim().length == 0 || isNaN(quantidade) || quantidade <= 0) {
            alert("Preencha os campos corretamente")
            return false;
        }

        const objCadastro = {
            nome: nome,
            preco: preco,
            descricao: descricao,
            quantidade: quantidade,
            imagem: imagem
        }

        try {
            //fazer o put para editar os dados
            const retornoAPI = await api.put(`/produtos/${produtoId}`, objCadastro)

            if (retornoAPI.status == 200) {
                alert("Produto alterado com sucesso")
                getProdutos()
                limparForm()
                setEditar(false)
            } else {
                alert("Erro ao editar")
            }

        } catch (e) {
            console.log("Erro ao atualizar o produto")
            console.log(e)
        }
    }

    //funcao para buscar os produtos na api
    async function getProdutos() {
        try {
            //faz a requisicao na api
            const retornoAPI = await axios.get("/produtos")
            //transforma o retorno que é json em objeto javascript
            const dados = await retornoAPI.data
            //inserir os dados state
            setArrProdutos(dados)
        } catch (e) {
            console.log("Erro ao buscar os produtos")
            console.log(e)
        }
    }

    //ciclo de vida do componente
    useEffect(() => {
        getProdutos()
    }, [])

    //desenho do componente na tela em si
    return (
        <>
            <header className="cabecalho">
                <h1 className="titulo--cinza" >SENAI</h1>
                <h1 className="titulo--vermelho">LOJA</h1>
            </header>

            <form className="formzin" action="" onSubmit={(editar) ? editarProduto : cadastrarProduto}>
                {/* <div className="input--image">
                    <input className="input--metade" type="text" id="imagem" placeholder="Image" onChange={(e) => setProduto({ ...produto, imagem: e.target.value })} />
                </div> */}
                <div className="input--dados">

                    <input className="input--metade" type="text" value={nome} id="nome" placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
                    <input className="input--metade" type="number" value={preco} id="preco" placeholder="Preço" onChange={(e) => setPreco(parseFloat(e.target.value))} />
                    <input className="input--metade" type="number" value={quantidade} id="quantidade" placeholder="Quantidade" onChange={(e) => setQuantidade(parseInt(e.target.value))} />
                    <input className="input--metade" type="text" value={descricao} id="descricao" placeholder="Descrição" onChange={(e) => setDescricao(e.target.value)} />

                </div>

                {/* condicional para mostrar o botão */}
                {editar && <button type="button" className="btn--cancelar" onClick={() => {
                    setEditar(false) //faz esconder o botão editar
                    limparForm()
                }}>Cancelar</button>}
                <button type="submit" className="btn--cadastro">{editar ? "Editar Produto" : "Adicionar Produto"}</button>

            </form>


            <section className="produtos">
                {arrProdutos.map((prod) => (
                    <div key={prod.id} className="produto">
                        <h2>{prod.nome}</h2>
                        <p>Preço: R$ {prod.preco.toFixed(2)}</p>
                        <p>Descrição: {prod.descricao}</p>
                        <p>Quantidade: {prod.quantidade}</p>
                        <img src={img} alt={prod.nome} />

                        <a href="" onClick={(e) => {
                            e.preventDefault()
                            deletarProduto(prod.id)
                        }}>Apagar</a>

                        <button className="btn--comprar">Comprar</button>

                        <a href="" onClick={(e) => {
                            e.preventDefault()
                            //mostrar dados no form pra editar

                            setEditar(true) // faz o botão aparecer
                            setProdutoId(prod.id)
                            setNome(prod.nome)
                            setPreco(prod.preco)
                            setQuantidade(prod.quantidade)
                            setDescricao(prod.descricao)
                            setImagem(prod.imagem || img)
                        }}>Editar</a>

                    </div>
                ))}
            </section>
        </>
    )
}// fim do componente