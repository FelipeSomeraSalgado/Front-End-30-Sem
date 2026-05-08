import "./perfil.css"

function Perfil({nome, idade, profissao}) {
    return (
        <p className="card-perfil">
          <span>
              <strong>Meu nome:{nome}</strong>
          </span>
          <span>
              <strong>Minha idade é:{idade}</strong>
          </span>
          <span>
              <strong>minha profissao é:{profissao}</strong>
          </span>
        </p>
    )
}

export default Perfil;