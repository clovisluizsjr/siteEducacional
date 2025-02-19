var dados = [];

function montarTabela() {
    let tbody = document.querySelector('#tb-body');
    let html = '';

    for (let item of dados) {
        html += `<tr>
                <td class='coluna'>
                <input type='checkbox' data-id='${item.id}'></td>
                <td class='coluna'>${item.nome}</td>
                <td class='coluna'>${item.datanascimento}</td>
                <td class='coluna'>${item.nomemae}</td>
                <td class='coluna'>${item.cidade}</td>
                <td class='coluna'>${item.telefone}</td>
                <th class='coluna'>
                    <a class='btnExcluir' onclick='excluirItem(${item.id})'>&#9746;</a>
                </th>        
            </tr>`;
    }
    tbody.innerHTML = html;
}

function adicionarItem(event) {
    event.preventDefault(); // Previne o envio do formulário

    // Seleção dos inputs
    let nomeInput = document.querySelector('#nome');
    let dataInput = document.querySelector('#datanascimento');
    let rgInput = document.querySelector('#rg');
    let cpfInput = document.querySelector('#cpf');
    let generoInput = document.querySelector('#genero');
    let emailInput = document.querySelector('#email');
    let nomeMaeInput = document.querySelector('#nomemae');
    let nomePaiInput = document.querySelector('#nomepai');
    let telefoneInput = document.querySelector('#telefone');

    let ruaInput = document.querySelector('#rua');
    let numeroInput = document.querySelector('#numero');
    let bairroInput = document.querySelector('#bairro');
    let cepInput = document.querySelector('#cep');
    let cidadeInput = document.querySelector('#cidade');

    let estadoInput = document.querySelector('#uf');

    // Limpa as mensagens de erro antigas
    let mensagensErro = document.querySelectorAll('.erro');
    for (let msg of mensagensErro) {
        msg.remove();
    }

    // Verificação de campos obrigatórios
    let camposObrigatorios = [
        { input: nomeInput, mensagem: "Este campo é obrigatório." },
        { input: dataInput, mensagem: "Este campo é obrigatório." },
        { input: rgInput, mensagem: "Este campo é obrigatório." },
        { input: cpfInput, mensagem: "Este campo é obrigatório." },
        { input: generoInput, mensagem: "Este campo é obrigatório." },
        { input: emailInput, mensagem: "Este campo é obrigatório." },
        { input: nomeMaeInput, mensagem: "Este campo é obrigatório." },
        { input: nomePaiInput, mensagem: "Este campo é obrigatório." },
        { input: telefoneInput, mensagem: "Este campo é obrigatório." },
        { input: ruaInput, mensagem: "Nome da rua é obrigatório." },
        { input: numeroInput, mensagem: "Número da casa é obrigatório." },
        { input: bairroInput, mensagem: "Nome do bairro é obrigatório." },
        { input: cepInput, mensagem: "CEP é obrigatório." },
        { input: cidadeInput, mensagem: "Cidade é obrigatório." },
        { input: estadoInput, mensagem: "Selecionar o estado é obrigatório." }
    ];

    // Verificação dos campos e exibição das mensagens de erro
    let camposValidos = true;
    for (let campo of camposObrigatorios) {
        if (!campo.input.value) {
            camposValidos = false;

            // Cria a mensagem de erro
            let mensagemErro = document.createElement('span');
            mensagemErro.classList.add('erro');
            mensagemErro.style.color = 'red';
            mensagemErro.textContent = campo.mensagem;

            // Cria uma div para mostrar a mensagem
            let divErro = document.createElement('div');
            divErro.classList.add('erro-div');
            divErro.appendChild(mensagemErro);

            // Coloca a mensagem de erro logo abaixo do campo
            campo.input.parentNode.appendChild(divErro);

            // Adiciona um event listener para remover a mensagem de erro quando o usuário começar a digitar
            campo.input.addEventListener('input', function() {
                if (campo.input.value) {
                    divErro.remove();
                }
            });
        }
    }

    if (!camposValidos) {
        return; // Impede a execução do código se algum campo estiver vazio
    }


    // Criação do novo objeto
    let novoObj = {
        id: new Date().getTime(),
        nome: nomeInput.value,
        datanascimento: dataInput.value,
        RG: rgInput.value,
        CPF: cpfInput.value,
        genero: generoInput.value,
        email: emailInput.value,
        nomemae: nomeMaeInput.value,
        nomePai: nomePaiInput.value,
        telefone: telefoneInput.value,
        rua: ruaInput.value,
        numero: numeroInput.value,
        bairro: bairroInput.value,
        cep: cepInput.value,
        cidade: cidadeInput.value,
        estado: estadoInput.value,
    };

    dados.push(novoObj); // Inserindo no vetor
    montarTabela();

    // Limpa os campos após adicionar
    nomeInput.value = '';
    dataInput.value = '';
    rgInput.value = '';
    cpfInput.value = '';
    generoInput.value = '';
    emailInput.value = '';
    nomeMaeInput.value = '';
    nomePaiInput.value = '';
    telefoneInput.value = '';
    ruaInput.value = '';
    numeroInput.value = '';
    bairroInput.value = '';
    cepInput.value = '';
    cidadeInput.value = '';
    estadoInput.value = '';

    nomeInput.focus(); // Foco no primeiro campo
}


function excluirItem(idDel) {
    var listaAux = [];
    for (let i = 0; i < dados.length; i++) {
        if (dados[i].id !== idDel) {
            listaAux.push(dados[i]);
        }
    }
    dados = listaAux; // Substituir a lista velha pela nova
    montarTabela();
}

function selecionaTodos() {
    let cbPai = document.querySelector('#ckTodos'); // Pega o checkbox que seleciona todos
    let listaCheckbox = document.querySelectorAll('[data-id]'); // Pega todos os checkboxes com data-id
    for (let ck of listaCheckbox) {
        ck.checked = cbPai.checked; // Marca ou desmarca todos os checkboxes
    }
}

function excluirSelecionados() {
    let listaCheckbox = document.querySelectorAll('[data-id]'); // Pega todos os checkboxes
    if (listaCheckbox.length > 0) {
        for (let ck of listaCheckbox) {
            if (ck.checked) {
                excluirItem(Number(ck.dataset.id)); // Passar o id como Number
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    montarTabela();

    let btnAdd = document.querySelector('#btn-cadastrar');
    btnAdd.addEventListener('click', adicionarItem, false);

    let ckPai = document.querySelector('#ckTodos');
    ckPai.addEventListener('click', selecionaTodos, false);

    let btnExcSel = document.querySelector('#btnExcluirSelecionados');
    btnExcSel.addEventListener('click', excluirSelecionados, false);
}, false);
