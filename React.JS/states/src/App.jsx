import { useState } from 'react'
import './App.css'

function App() {
 //variavel pribvada (objeto) só pode ser mudada pela função setTitulo
  const[titulo, setTitulo] = useState("Google")
  
  function mudarTexto(){
    setTitulo("Facebook")
  }
  
  return (
    <>
    <h1>Minha Página de {titulo}</h1>
    <button onClick={mudarTexto}> Mudar Texto</button>
    </>
  )
}

export default App
