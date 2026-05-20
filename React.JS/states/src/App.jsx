import { useState } from 'react'
import './App.css'
// import Contador from './components/contador/contador'
// import Formulariostates from './components/formulariostates/formulariostates'
import CadFruta from './components/cadfruta/cadfruta'

function App() {
 //variavel pribvada (objeto) só pode ser mudada pela função setTitulo
  const[titulo, setTitulo] = useState("Google")
  
  function mudarTexto(){
    setTitulo("Facebook")
  }
  function mudarTexto2(){
    setTitulo("Ademicon")
  }
  
  return (
    <>
    {/* <h1>Minha Página de {titulo}</h1>
    <button onClick={mudarTexto}> Mudar Texto</button>
    <br />
    <button onClick={mudarTexto2}>Ademicon</button>

    <Contador/>
    <br />
    <Formulariostates/>  */}
    <CadFruta/>
    </>
  )
}

export default App
