import './itemLoja.css'

function ItemLoja({nome, preco, categoria, estoque}) {
    return (
        <div className='card-produto'>
            <h3>{nome}</h3>
            <h4> R$ {preco}</h4>
            <h4>Categoria - {categoria}</h4>
            {parseInt(estoque) > 0 ? (
                <h4>Em estoque atualmente - {estoque}</h4>
            ) : (
                <h4>Produto fora de estoque</h4>
            )}
        </div>
    )
}

export default ItemLoja