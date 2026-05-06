import './Menu.css';
import MyPeople from "../../src/assets/image.png"
function Menu(){
    return(
        // <!--bloco/block-->
    <nav class="menu">
        {/* <!--elementos/elements--> */}
        <a href="#" className="menu__item">Home</a>
        <a href="#" className="menu__item">Quem somos</a>
        <a href="#" className="menu__item">Contato</a>
        <a href="#" className="menu__item menu__item--signin">Entrar</a>
        <a href="#" className="menu__item menu__item--signup">Cadastrar</a>

        <div className="card-perfil">
            <img class="card-perfil__image" src={MyPeople} alt="Imagem do usuário" /> 
        </div>
    </nav>
    );
}

export default Menu