async function cadastrarContato( objetoContato ) { 
    console.log(objetoContato);

    //cadastrar na API
    let resposta = await fetch("http://localhost:3000/contatos", {
        method: "POST",
        body: JSON.stringify(objetoContato),
        headers : {
              "Content-Type" : "application/json; charset=UTF-8"
        }
    });
}


function validarFormulario() {
    let nome = document.getElementById("nome").value.trim();//pega o valor do campo com id nome
    let sobrenome = document.getElementById("sobrenome").value.trim();
    // let email = document.getElementById("email").value.trim();
    // let digito = document.getElementById("digito").value;
    // let ddd = document.getElementById("DDD").value;
    // let telefone = document.getElementById("telefone").value;
    // let cep = document.getElementById("Cep").value;
    // let endereco = document.getElementById("endereco").value;
    // let numeroCasa = document.getElementById("numeroCasa").value;
    // let local = document.getElementById("local").value;
    // let bairro = document.getElementById("bairro").value;
    // let cidade = document.getElementById("cidade").value;
    // let estado = document.getElementById("estado").value;
    // let anotacoes = document.getElementById("anotacoes").value;

    let quantidadeErros = 0;


    if (nome.length == 0) { // se o nome estiver vazio
        formError("nome")
        quantidadeErros++;
    } else { // se não estiver vazio
        reiniciaBorda("nome")
    }

     if (sobrenome.length == 0) { // se o nome estiver vazio
        formError("sobrenome")
         quantidadeErros++;
     } else { // se não estiver vazio
        reiniciaBorda("sobrenome")
    }

        //cadastrar lá na api
    //gerar um objeto com os dados
    let objetoContato = {
        nome : nome,
        sobrenome: sobrenome
    };

    let cadastro = cadastrarContato(objetoContato);
    return false;

   //fim da função

    // if (email.length == 0) { // se o nome estiver vazio
    //     formError("email")
    //     quantidadeErros++;
    // } else { // se não estiver vazio
    //     reiniciaBorda("email")
    // }

    // if (digito.length == 0) { // se o nome estiver vazio
    //     formError("digito")
    //     quantidadeErros++;
    // } else { // se não estiver vazio
    //     reiniciaBorda("digito")
    // }

    // if (ddd.length == 0) { // se o nome estiver vazio
    //     formError("DDD")
    //     quantidadeErros++;
    // } else { // se não estiver vazio
    //     reiniciaBorda("DDD")
    // }

    // if (telefone.length == 0) { // se o nome estiver vazio
    //     formError("telefone")
    //     quantidadeErros++;
    // } else { // se não estiver vazio
    //     reiniciaBorda("telefone")
    // }

    // if (cep.length == 0) { // se o nome estiver vazio
    //     formError("Cep")
    //     quantidadeErros++;
    // } else { // se não estiver vazio
    //     reiniciaBorda("Cep")
    // }

    // if (endereco.length == 0) { // se o nome estiver vazio
    //     formError("endereco")
    //     quantidadeErros++;
    // } else { // se não estiver vazio
    //     reiniciaBorda("endereco")
    // }

    // if (numeroCasa.length == 0) { // se o nome estiver vazio
    //     formError("numeroCasa")
    //     quantidadeErros++;
    // } else { // se não estiver vazio
    //     reiniciaBorda("numeroCasa")
    // }

    // if (local.length == 0) { // se o nome estiver vazio
    //     formError("local")
    //     quantidadeErros++;
    // } else { // se não estiver vazio
    //     reiniciaBorda("local")
    // }

    // if (bairro.length == 0) { // se o nome estiver vazio
    //     formError("bairro")
    //     quantidadeErros++;
    // } else { // se não estiver vazio
    //     reiniciaBorda("bairro")
    // }
    // if (cidade.length == 0) { // se o nome estiver vazio
    //     formError("cidade")
    //     quantidadeErros++;
    // } else { // se não estiver vazio
    //     reiniciaBorda("cidade")
    // }
    // if (estado.length == 0) { // se o nome estiver vazio
    //     formError("estado")
    //     quantidadeErros++;
    // } else { // se não estiver vazio
    //     reiniciaBorda("estado")
    // }
    // if (anotacoes.length == 0) { // se o nome estiver vazio
    //     formError("anotacoes")
    //     quantidadeErros++;
    // } else { // se não estiver vazio
    //     reiniciaBorda("anotacoes")
    // }




    if (quantidadeErros != 0) {
        alert("Existem " + quantidadeErros + " campo(a) obrigatório(a) não preenchido(s).")
        quantidadeErros = 0;
    }


}//fim da função


//função que pinta a borda do campo que falta preencher
function formError(fildId) {
    document.getElementById(fildId).style.border = "1px solid red";
}

//função que pinta a borda do campo que falta preencher
function reiniciaBorda(fildId) {
    document.getElementById(fildId).style.border = "none";
}


async function buscarEndereco(cep){
    if(cep.trim().length < 8){
        alert("CEP invalido. O CEP deve conter 8 digitso.")
        return false;
    }

    try{

        aguardandoCampos();

        let retorno = await fetch(`http://viacep.com.br/ws/${cep}/json/`)
        let dados = await  retorno.json();
        console.log(dados);

        document.getElementById("endereco").value = dados.logradouro;
        document.getElementById("bairro").value = dados.bairro;
        document.getElementById("cidade").value = dados.localidade; 
        document.getElementById("estado").value = dados.uf;
        

    } catch {
        alert("Erro ao buscar o endereço!")
    }
}

function aguardandoCampos(){
    document.getElementById("endereco").value = "Aguardando..."
    document.getElementById("bairro").value = "Aguardando..."
    document.getElementById("cidade").value = "Aguardando..."
    document.getElementById("estado").value = "Aguardando..."
}

//literal templete: é a crase
/*cconsole.log(`
Nome: ${nome} ${sobrenome}
Email: ${email}
Telefone: ${digito} (${ddd}) ${telefone}
Endereço: ${cep} ${endereco}, ${numeroCasa} - ${bairro}, ${cidade} - ${estado}
Local: ${local}
Anotações: ${anotacoes}
`);*/