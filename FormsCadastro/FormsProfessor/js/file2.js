var dados = [

]

function montarTabela() {
    let tbody = document.querySelector('#tb-body');
    let html = '';

    for (let item of dados) {
        html += `<tr>
                <td class = 'coluna'>
                <input type ='checkbox'                                             data-id= ${item.id}></td>
                <td  class = 'coluna'>${item.nome}</td>
                <td  class = 'coluna'>${item.datanascimento}</td>
                <td  class = 'coluna'>${item.nomemae}</td>
                <td  class = 'coluna'>${item.telefone}</td>
                <th class = 'coluna'> <a class='btnExcluir'                                         onclick='excluirItem(${item.id})'>
                                    &#9746;</a></th>        
            </tr>`;
    }
    tbody.innerHTML = html;
}

function adicionarItem() {
    let nomeInput = document.querySelector('#nome');
    let dataInput = document.querySelector('#datanascimento');
    let rgInput = document.querySelector('#rg');
    let cpfInput = document.querySelector('#cpf');
    let sexoMInput = document.querySelector('#masculino');
    let sexoFInput = document.querySelector('#feminino');
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

    let novoObj = {
        id: new Date().getTime(),
        nome: nomeInput.value,
        dataNascimento: dataInput.value,
        RG: rgInput.value,
        CPF: cpfInput.value,
        sexoM: sexoMInput.value,
        sexoF: sexoFInput.value,
        email: emailInput.value,
        nomeMae: nomeMaeInput.value,
        nomePai: nomePaiInput.value,
        telefone: telefoneInput.value,

        rua: ruaInput.value,
        numero: numeroInput.value,
        bairro: bairroInput.value,
        cep: cepInput.value,
        cidade: cidadeInput.value,
        estado: estadoInput.value,
    }
    dados.push(novoObj); // inserindo no vetor
    montarTabela();

    nomeInput.value = '';//apaga o input
    nomeInput.value = '';
    dataInput.value = '';
    rgInput.value = '';
    cpfInput.value = '';
    sexoMInput.value = '';
    sexoFInput.value = '';
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

    nomeInput.focus();//focos
}

function excluirItem(idDel)//passar ID que quer excluir
{
    var listaAux = []
    for (let i = 0; i < dados.length; i++) {
        if (dados[i].id != idDel)
            listaAux.push(dados[i])
    }
    //substituir a lista nova na lista velha
    dados = listaAux;
    montarTabela();
}

function selecionaTodos() {
    let cbPai = document.querySelector('#ckTodos'); // pega o check box que seleciona todos
    let listaCheckbox = document.querySelectorAll('[data-id]')//pegar todos o check box que tenham o data id selecionados
    for (let ck of listaCheckbox) {
        ck.checked = cbPai.checked // se tiver sem seleção seleciona e se tiver com seleção continua e seleciona tudo igual do pai check
    }
}

function excluirSelecionados() {
    let listaCheckbox = document.querySelectorAll('[data-id]')//pegar todos o check box que tenham o data id selecionados
    if (listaCheckbox.length > 0) {
        for (let ck of listaCheckbox) {
            if (ck.checked) {
                excluirItem(ck.dataset.id)// não é a propriedade id voce criou um elemento de dados

            }
        }
    }

    else {
        alert('Não há itens para serem excluídos');
    }
}

document.addEventListener('DOMContentLoaded',
    //DOMCONTENTLOADED = Como ainda não exibiu diz que a arvore nao está montada, o domcontent espera a arvore ser montada, ele n vai conferir se o btn add existe, mas ele carrega depois

    function () {
        montarTabela();

        let btnAdd = document.querySelector('#btn-cadastrar');
        btnAdd.addEventListener('click', adicionarItem, false);//quando vocÊ quer associar essa função?, quando clicar, ai chama a função, em tempo de EXECUÇÃO
        let ckPai = document.querySelector('#ckTodos');
        ckPai.addEventListener('click', selecionaTodos, false);

        let btnExcSel = document.querySelector('#btnExcluirSelecionados');
        btnExcSel.addEventListener('click', excluirSelecionados, false);

    }, false);