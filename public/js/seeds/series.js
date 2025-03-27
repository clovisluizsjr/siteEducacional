document.addEventListener('DOMContentLoaded', function () {
  const trs = document.querySelectorAll('.disciplina-row');
  for (let tr of trs) {
    tr.addEventListener('click', redirecionaPagina);
  }

  function redirecionaPagina() {
    const disciplina_id = this.dataset.disciplina_id;
    const serie_id = this.dataset.serie_id;
    window.location.href = `/seeds/professor/disciplina/${disciplina_id}/${serie_id}`;
  }
});
