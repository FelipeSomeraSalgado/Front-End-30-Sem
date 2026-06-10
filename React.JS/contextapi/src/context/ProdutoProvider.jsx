import { useState } from "react"
import { ProdutoContext } from "./ProdutoContext"

const ProdutoProvider = ( {children} ) => {
    const [produtos, setProdutos] = useState([])
    
    return (
        <ProdutoContext.Provider
            value={{
                produtos, 
                setProdutos
            }}
        >
            {children}
        </ProdutoContext.Provider>
    )
}


export default ProdutoProvider