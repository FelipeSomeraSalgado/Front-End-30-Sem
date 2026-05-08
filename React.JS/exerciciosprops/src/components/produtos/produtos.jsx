 import './produtos.css'
import Produto from '../exercicio02/produto'

 export default function Produtos() {
    const produtos = [
        { nome: "Tênis", preco: 550.90, descricao: "Tênis confortável para corrida" },
        { nome: "Camiseta de marca", preco: 270.90, descricao: "Camiseta confortável para o dia a dia" }
    ];

    return (
        produtos.map((produtinho) => {
            return (
                <Produto
                nome={produtinho.nome}
                preco={produtinho.preco}
                descricao={produtinho.descricao}
                 />
            )
        })
    )
}