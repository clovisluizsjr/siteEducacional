document.addEventListener("DOMContentLoaded", function() {
    //DOMCONTENTLOADED = Como ainda não exibiu diz que a arvore nao está montada, o domcontent espera a arvore ser montada, ele n vai conferir se o btn add existe, mas ele carrega depois


    //AQUI ESTAMOS PEGANDO CADA ELEMENTO DO FORMULÁRIO
    var form = document.getElementById("contactForm");
    var nome = document.getElementById("name");
    var email = document.getElementById("email");
    var titulo = document.getElementById("subject");
    var mensagem = document.getElementById("message");

    // FUNÇÃO DE LIMPAR CAMPO, LIMPA UM CAMPO ESPECIFICO
    function limparErro(campo) {
        var erro = document.querySelector(`#${campo.dataset.erro}`); 
        // PEGA O CAMPO, ACESSA OS ATRIBUTOS QUE CONTEM  DATA-, E O QUE ESTIVER ERRO-NOME POR EX
        if (erro) {
            erro.textContent = ""; // Limpa o texto da mensagem de erro
        }
    }

    // Validação ao enviar o formulário
    form.addEventListener("submit", function(evento) {
        evento.preventDefault(); // Se clicar no botão enviar, a pagina não é recarregada

        var valido = true;

        // VALIDAÇÃO NOME, NÃO PODE SER VAZIO
        if (nome.value.trim() === "") {
            var erro = document.querySelector(`#${nome.dataset.erro}`);
            erro.textContent = "Por favor, digite seu nome.";
            valido = false;//VALIDO RECEBE FALSE
        }

        // Validação do email -> não pode ser vazio e precisa ser um formato valido
        var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email.value.trim() === "") {
            var erro = document.querySelector(`#${email.dataset.erro}`);
            erro.textContent = "Por favor, digite seu e-mail.";
            valido = false;
        } else if (!regexEmail.test(email.value)) {
            var erro = document.querySelector(`#${email.dataset.erro}`);
            erro.textContent = "Por favor, insira um e-mail válido. O e-mail deve conter um @, e pelo menos um ponto(.)";
            valido = false;
        }

        // Validação do titulo, não pode ser vazio
        if (titulo.value.trim() === "") {
            var erro = document.querySelector(`#${titulo.dataset.erro}`);
            erro.textContent = "Por favor, digite o título.";
            valido = false;
        }

        // Validação da mensagem não pode ser vazia
        if (mensagem.value.trim() === "") {
            var erro = document.querySelector(`#${mensagem.dataset.erro}`);
            erro.textContent = "Por favor, digite sua mensagem.";
            valido = false;
        }

        // Se tudo estiver certo, envia o formulário
        if (valido) {
            alert("Mensagem enviada com sucesso!");

            // E LIMPA os campos e mensagens 
            nome.value = "";
            email.value = "";
            titulo.value = "";
            mensagem.value = "";
        }
    });

    //  limpar mensagem de erro ao começar a digitar em um campo epecifico
    nome.addEventListener("input", function() {
        limparErro(nome);
    });
    email.addEventListener("input", function() {
        limparErro(email);
    });
    titulo.addEventListener("input", function() {
        limparErro(titulo);
    });
    mensagem.addEventListener("input", function() {
        limparErro(mensagem);
    });
});
