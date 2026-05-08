import './filme.css'

function Filme ( {titulo, ano, genero, nota} ){
    return(
        <div className="card-filme">
            <h1>{titulo}</h1>
            <h2>{ano} - {genero}</h2>
            <p>Nota: {nota}</p>
        </div>
    )
}

export default Filme