import './aluno.css'

function Aluno( {nome, curso, imagem} ) {
    return (
        <div className='card-aluno'>
            <img className='foto-Aluno' src={imagem} alt="" />
            <h1>{nome}</h1>
            <p>{curso}</p>
        </div>
    )
}

export default Aluno