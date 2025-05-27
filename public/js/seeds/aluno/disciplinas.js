document.addEventListener('DOMContentLoaded', function () {
  const trs = document.querySelectorAll('.disciplina-row');
  for (let tr of trs) {
    tr.addEventListener('click', redirecionaPagina);
  }

  function redirecionaPagina() {
    const professorturmaid = this.dataset.professorturmaid;
    window.location.href = `/seeds/aluno/atividades/${professorturmaid}/`;
  }
});
