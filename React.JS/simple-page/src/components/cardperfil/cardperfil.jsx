import "./cardperfil.css"
import MyPeople from "../../../src/assets/image.png"

function CardPerfil() {
    return (
         <div className="card-perfil">
            <img className="card-perfil__image" src={MyPeople} alt="Imagem do usuário" /> 
        </div>
    )
};

export default CardPerfil;