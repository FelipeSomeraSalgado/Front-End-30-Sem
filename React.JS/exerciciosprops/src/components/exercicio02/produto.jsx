import './produto.css'

function Produto({nome, preco, descricao}) {
    return (
       <p> 
           Nome do produto: {nome} <br />
           Preço: R${preco.toFixed(2)} <br />
           Descrição: {descricao} <br />
       </p>
    )
}

export default Produto