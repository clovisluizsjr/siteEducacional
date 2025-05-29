function validarSomaPesos() {
  let inputs = document.querySelectorAll(
    'input[name^="atividades"][name$="[peso]"]'
  );
  let soma = 0;
  let btnSalvar = document.querySelector('.btnSalvarPeso');

  inputs.forEach(function (input) {
    let valor = Number(input.value);
    if (!isNaN(valor)) {
      soma += valor;
    }
  });

  let msg = document.getElementById('mensagemSomaPesos');
  if (soma !== 10 || inputs[0].value <= 0 || inputs[1].value <= 0) {
    msg.textContent = `A soma dos pesos deve ser 10 e os valores precisam ser positivos. Soma atual: ${soma}`;
    msg.style.color = 'red';
    btnSalvar.disabled = true;
  } else {
    msg.textContent = 'Soma certa: ' + soma;
    msg.style.color = 'green';
    btnSalvar.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let inputs = document.querySelectorAll(
    'input[name^="atividades"][name$="[peso]"]'
  );
  inputs.forEach(function (input) {
    input.addEventListener('blur', validarSomaPesos);
  });

  const form = document.querySelector('form');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const btnSalvar = document.querySelector('.btnSalvarPeso');

    btnSalvar.disabled = true;

    try {
      const formData = {
        professor_turma_disciplina_id: form.querySelector(
          '[name="professor_turma_disciplina_id"]'
        ).value,
        atividades: [],
      };

      document.querySelectorAll('[name^="atividades["]').forEach((input) => {
        const matches = input.name.match(/atividades\[(\d+)\]\[(\w+)\]/);
        if (matches) {
          const index = matches[1];
          const field = matches[2];

          if (!formData.atividades[index]) {
            formData.atividades[index] = {};
          }
          formData.atividades[index][field] = input.value;
        }
      });


      const response = await fetch(form.action, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.ok) {
        await Swal.fire({
          icon: 'success',
          text: 'Quadro de notas salvo com sucesso!',
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: 'Erro!',
          html: data.erro || 'Ocorreu um erro ao salvar o quadro de notas.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Erro de conexão',
        text: 'Não foi possível conectar ao servidor',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  });
});
