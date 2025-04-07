document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btn-cadastrar').addEventListener('click', cadastrar);

  // Verifica se está em modo de alteração
  let inputId = document.getElementById('input-atv-id'); // Adicione esse campo hidden no HTML se ainda não existir

  function limparValidacao() {
    document.getElementById('input-atv-nome').style.borderColor = '#ced4da';
    document.getElementById('input-atv-desc').style.borderColor = '#ced4da';
    document.getElementById('input-atv-peso').style.borderColor = '#ced4da';
    document.getElementById('input-atv-prazo').style.borderColor = '#ced4da';
  }

  function cadastrar() {
    limparValidacao();

    let inptNome = document.getElementById('input-atv-nome');
    let inptDesc = document.getElementById('input-atv-desc');
    let inptPeso = document.getElementById('input-atv-peso');
    let inptPrazo = document.getElementById('input-atv-prazo');
    let inptSerie = document.getElementById('input-atv-serie');
    let inptDisciplina = document.getElementById('input-atv-disciplina');
    let listaValidacao = [];

    if (inptNome.value == '') listaValidacao.push('input-atv-nome');
    if (inptDesc.value == '') listaValidacao.push('input-atv-desc');
    if (inptPeso.value == '') listaValidacao.push('input-atv-peso');
    if (inptPrazo.value == '') listaValidacao.push('input-atv-prazo');
    if (inptSerie.value == '') listaValidacao.push('input-atv-serie');
    if (inptDisciplina.value == '') listaValidacao.push('input-atv-disciplina');

    if (listaValidacao.length == 0) {
      let obj = {
        atividadeProf_tituloProf: inptNome.value,
        atividadeProf_descricaoProf: inptDesc.value,
        atividadeProf_notaProf: inptPeso.value,
        atividadeProf_prazoProf: inptPrazo.value.replace('T', ' ') + ':00',
        serie_id: inptSerie.value,
        disciplina_id: inptDisciplina.value,
      };

      if (inputId && inputId.value != '') {
        obj.atividadeProf_idProf = inputId.value;
      }

      fetch('/seeds/professor/atividade/cadastrar', {
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
              text: corpoResposta.msg,
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              window.location.href = window.location.href = `/seeds/professor/atividade/listar/${idProfessor}`;
              ; // ou outro redirect apropriado
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: corpoResposta.msg,
            });
          }
        });
    } else {
      destacarCampos(listaValidacao);
    }
  }

  function destacarCampos(lista) {
    for (let i = 0; i < lista.length; i++) {
      let campo = document.getElementById(lista[i]);
      campo.style.borderColor = 'red';
    }

    alert('Preencha corretamente os campos indicados!');
  }
});
