document.addEventListener('DOMContentLoaded', function () {
  const btnCadastrar = document.querySelector('.btn_cadastrar');
  const btnAlterar = document.querySelector('.btn_alterar');

  let inptTitulo = document.getElementById('inpt_titulo');
  let inptDesc = document.getElementById('inpt_descricao');
  let inptDataInic = document.getElementById('inpt_data_inicial');
  let inptDataLimite = document.getElementById('inpt_data_limite');
  let professorTurmaId = document.querySelector('[name="professorTurmaId"]');
  let atividadeElement = document.querySelector('.atividade-id');
  let atividadeId = atividadeElement?.value || 0;

  const rota = atividadeId == 0 ? 'cadastrar' : 'alterar';
  const metodo = atividadeId == 0 ? 'POST' : 'PUT';

  function validaForm() {
    //Função para destacar campos em branco, adiciona e remove classe do bootstrap
    let formularioValidado = true;
    const campos = [
      'inpt_titulo',
      'inpt_descricao',
      'inpt_data_inicial',
      'inpt_data_limite',
    ];

    campos.forEach((id) => {
      let item = document.getElementById(id);
      if (item.value == '') {
        item.classList.add('is-invalid');
        formularioValidado = false;
      } else {
        item.classList.remove('is-invalid');
      }
    });
    return formularioValidado; //Se os campos não chegarem em branco ele retorna true.
  }

  function validaDatas() {
    const agora = new Date();
    const dataInicial = new Date(inptDataInic.value);
    const dataLimite = new Date(inptDataLimite.value);

    if (agora >= dataInicial) {
      // Verifica se data inicial  não está no passado
      Swal.fire({
        icon: 'warning',
        title: 'Data Inicial inválida',
        text: 'A data inicial deve ser atual.',
      });
      return false;
    }

    const diffMs = dataLimite - dataInicial; // Verifica se data limite é pelo menos 1minuto após a inicial
    const diffMinutos = diffMs / 1000 / 60;

    if (diffMinutos < 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Data Limite inválida',
        text: 'A data limite deve ser pelo menos 1 minuto após a data inicial.',
      });
      return false;
    }

    return true;
  }

  function cadastrar() {
    const botaoAtivo = btnCadastrar || btnAlterar;
    if (botaoAtivo.disabled) return;

    if (validaForm() && validaDatas()) {
      const obj = {
        atividade_id: atividadeId,
        titulo: inptTitulo.value,
        descricao: inptDesc.value,
        data_inicial: inptDataInic.value.replace('T', ' ') + ':00',
        data_limite: inptDataLimite.value.replace('T', ' ') + ':00',
        professor_turma_disciplina_id: professorTurmaId.value,
      };
      botaoAtivo.disabled = true;
      fetch(`/seeds/professor/atividade/${rota}`, {
        method: metodo,
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

   if (btnCadastrar) {
    btnCadastrar.addEventListener('click', cadastrar);
  }
  
  if (btnAlterar) {
    btnAlterar.addEventListener('click', cadastrar);
  }
});
