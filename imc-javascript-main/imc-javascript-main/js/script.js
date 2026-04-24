function calcular() {
    //alert("Função Calcular rodando");
    const nome = document.getElementById("nome").value;
    const altura = parseFloat(document.getElementById("altura").value);
    const peso = parseFloat(document.getElementById("peso").value);

    console.log(altura);
    console.log(peso);

    // Deixou de preencher um campo
    if (nome.trim().lenght == 0 || isNaN(altura) || isNaN(peso)) {
        alert("Preencha todos os campos: Nome, Altura e peso")
        return false;
    }

    const IMC = calcularImc(altura, peso);
    const textoSituacao = gerarTextoIMC(IMC);

    console.log(nome);
    console.log(altura);
    console.log(peso);
    console.log(IMC);
    console.log(textoSituacao);
    
      let objetoIMC = {
        nome: nome,
        altura: altura,
        peso: peso,
        IMC: IMC,
        textoSituacao: textoSituacao,
    }

    const cadastrado = cadastrarNaApi(objetoIMC)

    if (cadastrado) {

        const tabela = document.getElementById("cadastro");

        tabela.innerHTML +=     
    `<tr>
        <td>${nome}</td>
        <td>${altura}</td>
        <td>${peso}</td>
        <td>${IMC.toFixed(2)}</td>
        <td>${textoSituacao}</td>
    </tr>`;

    document.getElementById("nome").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("peso").value = "";

    alert(`${nome} foi cadastrado no banco:
             Nome: ${nome}
             IMC: ${IMC}
             Situação: ${textoSituacao}`)   

    } else {
        alert("Não foi possível cadastrar")
    }


  

} //fim função calcular


async function cadastrarNaApi(objetoIMC) {
    console.log(objetoIMC);

    try {
        let resposta = await fetch("http://localhost:3000/imc", {
            method: "POST",
            body: JSON.stringify(objetoIMC),
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

//recebe altura e peso e retorna o imc calculado
function calcularImc(altura, peso) {
    return peso / (altura * altura);
}

function gerarTextoIMC(IMC) {
    if (IMC <= 16) {
        return "Magreza grave"
    } else if (IMC <= 17) {
        return "Magreza moderada"
    } else if (IMC <= 18.5) {
        return "Magreza leve"
    } else if (IMC <= 25) {
        return "Saudável"
    } else if (IMC <= 30) {
        return "Sobrepeso"
    } else if (IMC <= 35) {
        return "Obesidade Grau I"
    } else if (IMC <= 40) {
        return "Obseidade Grau II (considerado severa)"
    } else {
        return "Obseidade Grau III (considerado mórbida)"
    }
}//fim da função

/*
* Fazer um get 
* rodar um for com a lista que o get retornou
* Inserir as linhas da tabela com os dados no html
*/
async function buscarIMCs(){
    try {
        const cadastrado = await fetch("http://localhost:3000/imc");
        const dados = await cadastrado.json();

        console.log(dados);

        const tabela = document.getElementById("cadastro");
      
      for (let i = 0; i < dados.length; i++) {    
        tabela.innerHTML += 
        `<tr>   
            <td>${dados[i].nome}</td>
            <td>${dados[i].altura}</td>
            <td>${dados[i].peso}</td>
            <td>${dados[i].IMC.toFixed(2)}</td>
            <td>${dados[i].textoSituacao}</td>
        </tr>`;

    }//fim da função calcular

    } catch (error) {
        
    }
}

