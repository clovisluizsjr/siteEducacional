document.addEventListener('DOMContentLoaded', function () {
  const btnCadastrar = document.getElementById('btn-altera');

  let inptTitulo = document.getElementById('inpt_titulo');
  let inptDesc = document.getElementById('inpt_descricao');
  let inptDataInic = document.getElementById('inpt_data_inicial');
  let inptDataLimite = document.getElementById('inpt_data_limite');
  let professorTurmaId = document.querySelector('[name="professorTurmaId"]');
  let atividadeId = 

  function validaForm() {
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
    return formularioValidado;
  }

  function validaDatas() {
    const agora = new Date();
    const dataInicial = new Date(inptDataInic.value);
    const dataLimite = new Date(inptDataLimite.value);

    if (agora >= dataInicial) {
      Swal.fire({
        icon: 'warning',
        title: 'Data Inicial inválida',
        text: 'A data inicial deve ser atual.',
      });
      return false;
    }

    const diffMs = dataLimite - dataInicial;
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
});
