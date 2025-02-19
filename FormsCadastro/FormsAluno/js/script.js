
//VALIDAÇÃO DATA
// Validacao de data de nascimento para garantir que o aluno tenha entre 5 e 18 anos
document.getElementById("datanascimento").addEventListener("input", function () {
  const dataNascimento = new Date(document.getElementById("datanascimento").value);// pega a data de nascimento digitada
  const dataAtual = new Date(); // pega a data do computador
  
  let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();//descobre a idade


  //Essa função confere se a pessoa já fez aniversário neste ano se ainda não fez ela diminui 1 da idade para corrigir.
  if (dataAtual < new Date(dataAtual.getFullYear(), dataNascimento.getMonth(), dataNascimento.getDate())) //2024/11/22 < 2024/03/25
  {
    idade--;
  }
  //no html pega o id da regra de nascimento
  const regras = document.getElementById("regras-datanascimento");

  if (idade < 5) {
    regras.style.display = "block";
    regras.innerHTML = '<p style="color: red;">A idade mínima para cadastro é 5 anos.</p>';
    // adiciona uma classe de erro no campo para 
    this.classList.add("erro");  
  } else if (idade > 17) {
    regras.style.display = "block";
    regras.innerHTML = '<p style="color: red;">A idade máxima para cadastro é 17 anos.</p>';
    this.classList.add("erro");  // Marca o campo com erro
  } else {
    regras.style.display = "none";
    this.classList.remove("erro");  // Remove o erro se a idade estiver dentro da faixa
  }
  
});




//VALIDAÇÃO RG
// Apenas numeros sejam digitados no campo RG
document.getElementById("rg").addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, ""); // Substitui qualquer caractere não numérico por nada
});



// Pega o campo de CPF diretamente
const campoCpf = document.getElementById("cpf");
const erroCpf = document.getElementById("cpfError"); // Pega o elemento de erro

campoCpf.addEventListener("input", function () {
  // pega o valor digitado no cpf
  let cpf = campoCpf.value;

  // remove qualquer coisa que não seja número
  let numerosCpf = cpf.replace(/\D/g, "");

  // verifica se o tamanho máximo tem 11 numeros
  if (numerosCpf.length > 11) {
    numerosCpf = numerosCpf.slice(0, 11);
  }

  // formatação enquanto o usuario digita (SLIDE DA PROF)
  if (numerosCpf.length <= 3) {
    cpf = numerosCpf.replace(/(\d{1,3})/, "$1");
  } else if (numerosCpf.length <= 6) {
    cpf = numerosCpf.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  } else if (numerosCpf.length <= 9) {
    cpf = numerosCpf.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  } else {
    cpf = numerosCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  }

  // atualiza o campo com o cpf formatado
  campoCpf.value = cpf;

  // Chama a função de validação passando o CPF sem formatação
  validarCpf(numerosCpf);
});

// Função para validar o CPF (SLIDE)
function isValidCPF(cpf) {
  // Verifica se o CPF é um número válido
  if (!cpf || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false; // CPF inválido
  }

  let soma = 0;
  let resto;

  // 1 digito verificador
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.charAt(9))) {
    return false;
  }

  soma = 0;
  // 2 dígito verificador
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  return resto === parseInt(cpf.charAt(10));
}

// Função de mensagem de erro no CPF
function validarCpf(cpf) {
  var erroCpf = document.getElementById("cpfError"); // Pega o elemento de erro

  // Validação de CPF POR MENSAGEM
  if (cpf.length === 11 && isValidCPF(cpf)) {
    erroCpf.style.display = "none"; // Se válido, oculta a mensagem de erro
  } else {
    erroCpf.style.display = "block"; // Se inválido, exibe a mensagem de erro
    erroCpf.innerHTML = '<p style="color: red;">CPF inválido! ou Verifique a formatação 000.000.000-00.</p>';
  }
}





//TELEFONE

// Função para formatar o telefone enquanto o usuário digita
document.getElementById("telefone").addEventListener("input", function () {
  var telefone = document.getElementById("telefone").value;

  // Remove caracteres não numéricos
  var numerosTelefone = telefone.replace(/\D/g, "");

  // Formatação do telefone enquanto o usuário digita
  if (numerosTelefone.length <= 2) {
    telefone = numerosTelefone.replace(/(\d{1,2})/, "($1");
  } else if (numerosTelefone.length <= 6) {
    telefone = numerosTelefone.replace(/(\d{2})(\d{1,4})/, "($1) $2");
  } else {
    telefone = numerosTelefone.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
  }

  // Atualiza o campo com a formatação
  document.getElementById("telefone").value = telefone;

  // Valida o telefone
  var telefoneError = document.getElementById("telefoneError");
  if (telefone.length === 15) {
    telefoneError.style.display = "none"; // Oculta a mensagem de erro
  } else {
    telefoneError.style.display = "block"; // Exibe a mensagem de erro
  }
});


//VALIDAR CEP
//_____________________________________________________________________
// Função para formatar o CEP enquanto o usuário digita
document.getElementById("cep").addEventListener("input", function () {
  var cep = document.getElementById("cep").value;

  // Remove caracteres não numéricos
  var numerosCep = cep.replace(/\D/g, "");

  // Formatação do CEP enquanto o usuário digita
  if (numerosCep.length <= 5) {
    cep = numerosCep.replace(/(\d{1,5})/, "$1");
  } else {
    cep = numerosCep.replace(/(\d{5})(\d{1,3})/, "$1-$2");
  }

  // Atualiza o campo com a formatação
  document.getElementById("cep").value = cep;

  // Valida o CEP (verifica se o comprimento é 10 caracteres, incluindo o hífen)
  var cepError = document.getElementById("cepError");
  if (numerosCep.length === 8) { // 5 números + 3 números após o hífen
    cepError.style.display = "none"; // Oculta a mensagem de erro
  } else {
    cepError.style.display = "block"; // Exibe a mensagem de erro
  }
});


// VALIDAÇÃO EMAIL
//_________________________________________________________________
document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector("#email");
  const emailError = document.querySelector("#emailError");

  // Função de validação de e-mail
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex simples para validar e-mails
    return emailRegex.test(email);
  };

  // Evento de validação
  emailInput.addEventListener("input", () => {
    const emailValue = emailInput.value.trim();

    if (!validateEmail(emailValue)) {
      emailError.style.display = "block";
    } else {
      emailError.style.display = "none";
    }
  });

  // Validar ao enviar o formulário
  const form = document.querySelector("#cadastro");
  form.addEventListener("submit", (e) => {
    if (!validateEmail(emailInput.value.trim())) {
      e.preventDefault();
      emailError.style.display = "block";
    }
  });
});
