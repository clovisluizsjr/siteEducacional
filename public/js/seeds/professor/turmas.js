document.addEventListener('DOMContentLoaded', function () {
  const trs = document.querySelectorAll('.turma-row');
  for (let tr of trs) {
    tr.addEventListener('click', redirecionaPagina);
  }

  function redirecionaPagina() {
    const turma_id = this.dataset.turma_id;
    const disciplina_id = this.dataset.disciplina_id;
    window.location.href = `/seeds/professor/disciplina/${turma_id}/${disciplina_id}/`;
  }
});
