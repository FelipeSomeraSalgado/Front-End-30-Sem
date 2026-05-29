import "./Lista.css";

// Importação de imagens:
import Editar from "../../assets/img/pen-to-square-solid.svg";
import Excluir from "../../assets/img/trash-can-regular.svg";

const Lista = (props) => {
    const obterNomeGenero = (item) => {
        // Se o filme vem com objeto genero completo
        if (item.genero?.nome) {
            return item.genero.nome;
        }
        // Se vem com idGeneroNavigation (Entity Framework pattern)
        if (item.idGeneroNavigation?.nome) {
            return item.idGeneroNavigation.nome;
        }
        // Se vem só idGenero, procura na lista de gêneros
        if (props.listaGeneros && (item.idGenero || item.genero?.idGenero)) {
            const idGen = item.idGenero ?? item.genero?.idGenero;
            const genero = props.listaGeneros.find((g) => g.idGenero === idGen || g.id === idGen);
            return genero?.nome || '-';
        }
        return '-';
    };

    return (
        <section className="layout_grid">
            <div className="listagem">

                <h1>{props.tituloLista}</h1>
                <hr />
                <div className="tabela">
                    <table>
                        {/* cabeçalho da tabela: */}
                        <thead>
                            {/* tr => table row */}
                            <tr className="table_cabecalho">
                                {/* th => table head */}
                                <th>Nome</th>
                                <th style={{ display: props.visibilidade }}>Gênero</th>
                                <th>Editar</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        {/* tbody => corpo da tabela */}
                        <tbody>
                            {/* Verifica se a lista existe e tem itens */}
                            {props.lista && props.lista.length > 0 ? (
                                // Se houver itens, faz um map (laço) para renderizar cada item da lista
                                props.lista.map((item) => (
                                    <tr className="item_lista" key={item.idFilme ?? item.idGenero}>
                                        <td data-cell="Nome">
                                            {/* Primeira célula da linha: mostra o nome (se for gênero) ou título (se for filme) */}
                                            {/* titulo == filme */}
                                            {props.tipoLista === "genero" ? item.nome : item.titulo}
                                        </td>
                                        <td data-cell="Gênero" style={{ display: props.visibilidade }}>
                                            {props.tipoLista === "filme" ? obterNomeGenero(item) : '-'}
                                        </td>
                                        <td data-cell="Editar">
                                            <button className="icon" onClick={() => (props.funcEditar(item))}>
                                                <img src={Editar} alt="Caneta" />
                                            </button>
                                        </td>
                                        <td data-cell="Excluir">
                                            <button className="icon" onClick={() => props.funcExcluir(item)}>
                                                <img src={Excluir} alt="Lixeira" />
                                            </button>
                                        </td>
                                    </tr>
                                )) 
                            ) : (
                                    // Caso a lista esteja vazia ou não exista, mostra uma linha dizendo que não há registros
                                    <tr>
                                        <td>Nenhum registro encontrado.</td>
                                    </tr>
                                )
                            }
                                
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Lista;