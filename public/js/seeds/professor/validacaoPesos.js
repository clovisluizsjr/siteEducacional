function validarSomaPesos() {
  let inputs = document.querySelectorAll('input[name^="atividades"][name$="[peso]"]');
  let soma = 0;
  let btnSalvar = document.querySelector('.btnSalvarPeso');

  inputs.forEach(function(input) {
    let valor = Number(input.value);
    if (!isNaN(valor)) {
      soma += valor;
    }
  });

  let msg = document.getElementById('mensagemSomaPesos');
  if (soma !== 10 || inputs[0].value <= 0 || inputs[1].value <= 0) {
    msg.textContent = `A soma dos pesos deve ser 10 e os valores precisam ser positivos. Soma atual: ${soma}`;
    msg.style.color = "red";
    btnSalvar.disabled = true
  } else {
    msg.textContent = "Soma certa: " + soma;
    msg.style.color = "green";
    btnSalvar.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  let inputs = document.querySelectorAll('input[name^="atividades"][name$="[peso]"]');
  inputs.forEach(function(input) {
    input.addEventListener("blur", validarSomaPesos);
  });
});
