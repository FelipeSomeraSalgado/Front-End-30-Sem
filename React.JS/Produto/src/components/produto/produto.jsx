import "./produto.css"
import { useEffect, useState } from "react"
import img from '../../assets/image.jpg'

export default function Produto() {

    //states e variáveis
    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState(0)
    const [descricao, setDescricao] = useState("")
    const [quantidade, setQuantidade] = useState(0)
    const [imagem, setImagem] = useState("")
    const [editar, setEditar] = useState(false)

    const [arrProdutos, setArrProdutos] = useState([])

    //ciclos de vida e funcoes
    async function cadastrarProduto(e) {
        e.preventDefault() //nao deixa o formulario ser postado 
        //validar o furmlário  

        // alert("Função Cadastrar Chamada")
        // return false;


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
            const retornoAPI = await fetch("http://localhost:3000/produtos", {
                method: "POST",
                body: JSON.stringify(objCadastro), 
                headers: {
                    "Content-Type": "application/json; charset=UTF-8 "
                }
            })

            console.log(retornoAPI)
            //validando o retorno da api
            if (retornoAPI.status == 201) {
                const dadosCadastrados = await retornoAPI.json()
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
        setPreco(0)
        setDescricao("")
        setQuantidade(0)
    }

    
    async function getProdutos() {
            try {
                //faz a requisicao na api
                const retornoAPI = await fetch("http://localhost:3000/produtos")
                //transforma o retorno que é json em objeto javascript
                const dados = await retornoAPI.json()
                //inserir os dados state
                setArrProdutos(dados)
                console.log(dados)
            } catch (e) {
                console.log("Erro ao buscar os produtos")
                console.log(e)
            }
 }

    async function deletarProduto(id) {
        try {
            const retornoAPI = await fetch(`http://localhost:3000/produtos/${id}`, {
                method: "delete",
            })

            if (retornoAPI.status == 200 && retornoAPI.statusText == "OK") {
                alert("Produto pagado com sucesso")

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

   async function editarProduto() {
        e.preventDefault() 
        // alert("Função Editar Chamada")
        try {
            const retornoAPI = await fetch("http://localhost:3000/produtos", {
                method: "PUT",
                body: JSON.stringify(objCadastro), 
                headers: {
                    "Content-Type": "application/json; charset=UTF-8 "
                }
            })

            console.log(retornoAPI)
            //validando o retorno da api
            if (retornoAPI.status == 200) {
                const dadosCadastrados = await retornoAPI.json()
                // console.log(dadosCadastrados) dado que acabou de ser cadastrado
                setArrProdutos([...arrProdutos, dadosCadastrados])
                alert("Produto Editado com sucesso")
                //limpar o formulário
                limparForm()

            } else {
                alert("Problema inesperado")
            }

        } catch (e) {
            console.log("Não foi possível salvar os dados")
            console.log(e)
        }


    }


    //ciclo de vida do componente
    useEffect(() => {
        //chamar a api e jogar os dados no state
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

                    <input className="input--metade" type="text" value={nome} id="nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <input className="input--metade" type="number" value={preco} id="preco" placeholder="Preço" value={preco} onChange={(e) => setPreco(parseFloat(e.target.value))} />
                    <input className="input--metade" type="number" value={quantidade} id="quantidade" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(parseInt(e.target.value))} />
                    <input className="input--metade" type="text" value={descricao} id="descricao" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

                </div>
                {editar && <button 
                type="button" 
                className="btn--cadastro"
                 onClick= {() => {
                    setEditar(false)
                    limparForm()
                }}
                 >
                   Cancelar
                </button>}
                {" "}
                <button type="submit" className="btn--cadastro">Adicionar Produto</button> 
                
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

                        <button className="produtos_btn-comprar">Comprar</button>

                        <a href="" onClick={(e) => {
                            e.preventDefault()

                            setEditar(true)
                            setNome(prod.nome)
                            setPreco(prod.preco)
                            setDescricao(prod.descricao)
                            setQuantidade(prod.quantidade)
                        }}>Editar</a>

                    </div>
                ))}
            </section>
        </>
    )
}