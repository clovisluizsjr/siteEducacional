document.addEventListener('DOMContentLoaded', function () {
  const trs = document.querySelectorAll('.disciplina-row');
  for (let tr of trs) {
    tr.addEventListener('click', redirecionaPagina);
  }

  function redirecionaPagina() {
    const disciplina_id = this.dataset.id;
    window.location.href = `/seeds/professor/turmas/${disciplina_id}`;
  }
});
