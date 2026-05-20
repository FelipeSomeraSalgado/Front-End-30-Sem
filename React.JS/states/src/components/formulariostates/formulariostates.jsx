import { useState } from "react"
import "./formulariostates.css"

function Formulariostates() {
    const [nome, setNome] = useState("")
    const [sobrenome, setSobrenome] = useState("")

    function pegarSobrenome(evento){
        setSobrenome(evento.target.value)
    }

    return (
        <div>
            <h2>Formulário com States</h2>

            <label htmlFor="nome">Nome</label>

            <input 
                type="text" 
                placeholder="nome"
                onChange={(evento) => {
                    setNome(evento.target.value)
                }}
            />

            <input 
                type="text" 
                placeholder="sobrenome"
                onChange={pegarSobrenome}
            />

            <br />

            <label>
                Texto Digitado: <strong>{nome} {sobrenome}</strong>
            </label>    
        </div>
    )
}

export default Formulariostates