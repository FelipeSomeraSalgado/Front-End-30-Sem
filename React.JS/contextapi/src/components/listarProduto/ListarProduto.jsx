import { useContext } from "react";
import ProdutoContext from "../../context/ProdutoContext";

const ListarProduto = () => {
  const { produtos } = useContext(ProdutoContext);

  return (
    <div>
      <h2>Lista de Produtos</h2>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <ul>
          {produtos.map((produto) => (
            <li key={produto.id}>
              {produto.nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListarProduto;