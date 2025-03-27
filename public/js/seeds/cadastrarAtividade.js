document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btn-cadastrar').addEventListener('click', cadastrar);

  function limparValidacao() {
    document.getElementById('input-atv-nome').style.borderColor = '#ced4da';
    document.getElementById('input-atv-desc').style.borderColor = '#ced4da';
    document.getElementById('input-atv-peso').style.borderColor = '#ced4da';
    document.getElementById('input-atv-prazo').style.borderColor = '#ced4da';
  }

  function cadastrar() {
    console.log('chegou');
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
      fetch('/seeds/professor/atividade/cadastrar', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
        .then(function (resposta) {
          return resposta.json();
        })
        .then(function (corpoResposta) {
          if (corpoResposta.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Sucesso!',
              text: corpoResposta.msg,
              timer: 3000, // O alerta desaparece após 3 segundos
              showConfirmButton: false,
            }).then(() => {
              window.location.href = `/${disciplina_id}`; // Troque pela página desejada
            });
          } else {
            console.error(corpoResposta.msg);
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
