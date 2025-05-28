function validarSomaPesos() {
  let inputs = document.querySelectorAll('input[name^="atividades"][name$="[peso]"]');
  let soma = 0;

  inputs.forEach(function(input) {
    let valor = Number(input.value);
    if (!isNaN(valor)) {
      soma += valor;
    }
  });

  let msg = document.getElementById('mensagemSomaPesos');
  if (soma !== 10) {
    msg.textContent = "A soma dos pesos tem que dar 10. Soma atual: " + soma;
    msg.style.color = "red";
  } else {
    msg.textContent = "Soma certa: " + soma;
    msg.style.color = "green";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  let inputs = document.querySelectorAll('input[name^="atividades"][name$="[peso]"]');
  inputs.forEach(function(input) {
    input.addEventListener("blur", validarSomaPesos);
  });
});
