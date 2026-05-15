import "./produto.css"
import { useState } from "react"
import img from '../../assets/image.jpg'

export default function Produto() {

    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState(0)
    const [descricao, setDescricao] = useState("")
    const [quantidade, setQuantidade] = useState(0)
    const [imagem, setImagem] = useState(img)
    const [produto, setProduto] = useState({ nome: "", preco: 0, descricao: "", quantidade: 0, imagem: "" })

    const [arrProdutos, setArrProdutos] = useState([
        { id: 1, nome: "Notebook", preco: 5000, descricao: "Notebook Gamer.", quantidade: 10, imagem: "" },
        { id: 2, nome: "Notebook", preco: 5000, descricao: "Notebook Gamer.", quantidade: 10, imagem: "" },
        { id: 4, nome: "Notebook", preco: 5000, descricao: "Notebook Gamer.", quantidade: 10, imagem: "" },
        { id: 5, nome: "Notebook", preco: 5000, descricao: "Notebook Gamer.", quantidade: 10, imagem: "" },
        { id: 3, nome: "Notebook", preco: 5000, descricao: "Notebook Gamer.", quantidade: 10, imagem: "" }
    ])

    function cadastrarProduto(e) {
        e.preventDefault()
        setArrProdutos([...arrProdutos, { ...produto, id: Date.now() }])
    }

    return (
        <>
            <header className="cabecalho">
            <h1 className="titulo--cinza" >SENAI</h1>
            <h1 className="titulo--vermelho">LOJA</h1>
            </header>

            <form className="formzin" action="" onSubmit={cadastrarProduto}>
                {/* <div className="input--image">
                    <input className="input--metade" type="text" id="imagem" placeholder="Image" onChange={(e) => setProduto({ ...produto, imagem: e.target.value })} />
                </div> */}
                <div className="input--dados">

                <input className="input--metade" type="text" id="nome" placeholder="Nome" onChange={(e) => setProduto({ ...produto, nome: e.target.value })} />
                <input className="input--metade" type="number" id="preco" placeholder="Preço" onChange={(e) => setProduto({ ...produto, preco: parseFloat(e.target.value) })} />
                <input className="input--metade" type="number" id="quantidade" placeholder="Quantidade" onChange={(e) => setProduto({ ...produto, quantidade: parseInt(e.target.value) })} />
                <input className="input--metade" type="text" id="descricao" placeholder="Descrição" onChange={(e) => setProduto({ ...produto, descricao: e.target.value })} />
                </div>

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
                    </div>
                ))}
            </section>
        </>
    )
}