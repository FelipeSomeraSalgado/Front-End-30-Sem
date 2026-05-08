
import "./title.css"
//destructuring

function Title( {texto, sobrenome, idade} ) {
    return(
       <h1>{texto} - {sobrenome} - {idade}</h1>
    )
}

export default Title