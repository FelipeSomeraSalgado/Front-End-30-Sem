import './jogo.css'

function Jogo( {nome, plataforma, preco, imagem} ) {
    return (
        <div className='card-jogo'>
            <img className="foto-jogo" src={imagem}/>
            <h4>{nome}</h4>
            <h5>R$ {preco}</h5>
            <h5>{plataforma}</h5>
        </div>
    )
}

export default Jogo