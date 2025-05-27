document.addEventListener('DOMContentLoaded', function () {
  const btnCadastrar = document.querySelector('.btn-enviar');

  let inptResposta = document.querySelector('#inpt_resposta');
  let professorTurmaId = document.querySelector('[name="professorTurmaId"]');
  let atividadeId = document.querySelector('[name="atividadeId"]');
  let alunoRa = document.querySelector('[name="alunoRa"]');
  let entregaElement = document.querySelector('.entrega-id');
  let entregaId = entregaElement?.value || 0;


  function validaForm() {
    let formularioValidado = true;

    if (inptResposta.value == '') {
      inptResposta.classList.add('is-invalid');
      formularioValidado = false;
    } else {
      inptResposta.classList.remove('is-invalid');
    }

    return formularioValidado;
  }

  function cadastrar() {
    if (validaForm()) {
      const obj = {
        entrega_id: entregaId,
        atividade_id: atividadeId.value,
        aluno_RA: alunoRa.value,
        professor_turma_disciplina_id: professorTurmaId.value,
        data_entrega:
          new Date().toISOString().slice(0, 19).replace('T', ' '),
        anotacoes: inptResposta.value,
        status: 'Entregue',
      };
  

      btnCadastrar.disabled = true;
      fetch('/seeds/aluno/atividade/entrega', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
        .then((resposta) => resposta.json())
        .then((corpoResposta) => {
          if (corpoResposta.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Sucesso!',
              text: 'Atividade cadastrada com sucesso',
              timer: 3000,
              showConfirmButton: false,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  btnCadastrar.addEventListener('click', cadastrar);
});
