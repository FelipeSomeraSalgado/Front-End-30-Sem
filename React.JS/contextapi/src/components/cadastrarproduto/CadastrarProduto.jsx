import { useContext } from "react"
import { UsuarioContext } from "../../context/UsuarioContext"

const CadastrarProduto = () => {

    return (
        <div>
            <h2>Cadastro de Produto</h2>
            <input type="text" placeholder="Novo Produto" />
            <button onClick={()=>{
                
            }}>Cadastrar</button>
        </div>
    )
}

export default CadastrarProduto