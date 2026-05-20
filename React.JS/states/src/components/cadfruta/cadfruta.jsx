import "./cadfruta.css"
import { useState } from "react"

function CadFruta() {
    const [fruta, setFruta] = useState("")
    const [quantidade, setQuantidade] = useState(0)   

    const [arrFrutas, setArrFrutas] = useState([
        { id: 1, nome: "Limão", quantidade: 10 },
        { id: 2, nome: "Abacaxi", quantidade: 5 }
    ])

    function cadastrarFruta(e) {
        e.preventDefault();//não deixa postar o formulário
        setArrFrutas([...arrFrutas, { id: Date.now(), nome: fruta, quantidade: quantidade }])
        console.log(arrFrutas) 

    }//fim da função cadastrarFruta

    return (
        <section className="sessao-cadastro">
            <h2>Cadastro</h2>
            <form action="" onSubmit={cadastrarFruta}>

                <fieldset className="cadastro">
                    <label htmlFor="fruta" className="cadastro_rotulo"
                    >Digite o nome da fruta:
                    </label>
                </fieldset>
                <input
                    type="text"
                    id="fruta"
                    value={fruta}
                    placeholder="ex: limão"
                    className="cadastro"
                    onChange={(evento) => {
                        setFruta(evento.target.value)
                    }}
                />

                <input 
                    type="number"
                    id="quantidade"
                    value={quantidade}
                    placeholder="ex: 10"
                    className="cadastro"
                    onChange={(evento) => {
                        setQuantidade(parseInt(evento.target.value) || 0)
                    }}
                />

                <button className="cadastro_btncadastro" type="submit">
                    Cadastrar
                </button>
            </form>

            {/* <span>{fruta}</span> */}
            <div className="resultado">
                <ul>
                    {
                        arrFrutas.map((fruta) => {
                            return (
                                <li key={fruta.id}>
                                    Fruta: <strong>{fruta.nome}</strong>
                                    Quantidade: <strong>{fruta.quantidade}</strong>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </section>
    )
}

export default CadFruta;