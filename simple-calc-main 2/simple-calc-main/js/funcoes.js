function calcular() {
    event.preventDefault();
    //entrada
    let n1 = parseFloat( document.getElementById('n1').value ) ;
    let n2 = parseFloat( document.getElementById("n2").value );
    let op = document.getElementById("operacao").value;//soma
    let resultado = null;
    
    if( isNaN(n1) || isNaN(n2) ){
        document.getElementById('resultado').innerText = 'Preencha todos os números!'
        return; // 👈 adicionado pra parar aqui
    }

    //processamento
    if(op == 'soma'){
        resultado = somar(n1, n2)
        resultado = resultado.toFixed(2);

    } else if(op == 'subtracao') {
        resultado = subtrair(n1, n2);
        resultado = resultado.toFixed(2);

    } else if (op == 'multiplicacao'){
        resultado = multiplicar(n1, n2);
        resultado = resultado.toFixed(2);

    } else if (op == 'divisao'){

        if(n2 == 0) {
            resultado = 'Não é um número';
        } else {
            resultado = dividir(n1, n2);
            resultado = resultado.toFixed(2);
        }
            
    } else {
        resultado = "Operação Inválida";
    }

    //saída
    document.getElementById('resultado').innerHTML = resultado;

    const objetoConta = {
        n1: n1,
        n2: n2,
        op: op,
        resultado: resultado
    };

    cadastrarNaApi(objetoConta);

    const tabela = document.getElementById("cadastro");

    if (tabela) {

    tabela.innerHTML +=
        `
        <article class="data__card-result">
            <span><strong>Primeiro Número:</strong> ${objetoConta.n1}</span>
            <span><strong>Segundo Número:</strong> ${objetoConta.n2}</span>
            <span><strong>Operação:</strong> ${objetoConta.op}</span>
            <span><strong>Resultado:</strong> ${objetoConta.resultado}</span>
        </article>
        `;

    } else {
        alert("Não foi possível fazer a conta");
    }
}

// funções
function somar(valor1, valor2) {
    return valor1 + valor2;
}

function subtrair(valor1, valor2) {
    return valor1 - valor2;
}

function multiplicar(valor1, valor2) {
    return valor1 * valor2;
}

function dividir(valor1, valor2) {
    if(valor2 == 0) {
        return 'Não é um número';
    }
    return valor1 / valor2;
}

// salvar na API
async function cadastrarNaApi(objetoConta) {
    try {
        const resposta = await fetch('http://localhost:3000/Calc', {
            method: "POST",
            body: JSON.stringify(objetoConta),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });

        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

// buscar dados ao recarregar
async function buscarCalc(){
    try {
        const retorno = await fetch("http://localhost:3000/Calc");
        const dados = await retorno.json();

        const tabela = document.getElementById("cadastro"); // 👈 corrigido
        tabela.innerHTML = ""; // 👈 limpa antes

        for(let i = 0; i < dados.length; i++){
            tabela.innerHTML +=
            `
            <article class="data__card-result">
                <span><strong>Primeiro Número:</strong> ${dados[i].n1}</span>
                <span><strong>Segundo Número:</strong> ${dados[i].n2}</span>
                <span><strong>Operação:</strong> ${dados[i].op}</span>
                <span><strong>Resultado:</strong> ${dados[i].resultado}</span>
            </article>
            `;
        }   
    } catch (error) {
        console.log(error);
    }
}

// 👇 ESSA LINHA resolve seu problema
window.onload = buscarCalc;