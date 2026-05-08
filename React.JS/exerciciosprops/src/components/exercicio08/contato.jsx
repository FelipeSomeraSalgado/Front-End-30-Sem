import './contato.css'

function Contato( {nome, telefone, email} ) {
    return(
        <div className='listaContatos'>
            <h5>{nome}</h5>
            <p>{telefone}</p>
            <p>{email}</p>
        </div>
    )
}

export default Contato