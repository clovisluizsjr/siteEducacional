document.addEventListener('DOMContentLoaded', function () {
  let btns = document.querySelectorAll('.btn-corrigir');

  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', lancarNota);
  }

  function lancarNota() {
    let atividadeId = this.dataset.atividadeid;
    let row = this.closest('tr');
    let alunoRa = row.dataset.alunora;

    let notaInput = row.querySelector('input[type="text"]');
    let nota = notaInput.value;

    if (nota === '') {
      alert('Digite uma nota antes de enviar.');
      return;
    }

    const dados = {
      atividade_id: atividadeId,
      aluno_RA: alunoRa,
      nota: parseFloat(nota),
    };

    fetch('/seeds/professor/corrigir', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    })
      .then((response) => response.json())
      .then((resultado) => {
        if (resultado.sucesso) {
          alert('Nota lançada com sucesso!');
        } else {
          alert('Erro ao lançar nota.');
        }
      })
      .catch((err) => {
        console.error('Erro ao enviar nota:', err);
        alert('Erro de comunicação com o servidor.');
      });
  }
});
