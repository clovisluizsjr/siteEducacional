document.addEventListener('DOMContentLoaded', function () {
  let btns = document.querySelectorAll('.btn-corrigir');
  
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', lancarNota);
  }

  function lancarNota() {


    let atividadeId = this.dataset.atividadeid;
    let row = this.closest('tr'); // Encontra a linha da tabela que contém o botão
    let alunoRa = document.querySelector('.aluno-ra').value; // Pega o RA do aluno
  
    let notaInput = row.querySelector('input[type="text"]'); // Pega o input da nota
    let nota = notaInput.value;
    let dataEntregaCell = row.cells[3]; // Pega a célula da data de entrega (4ª coluna)
    let dataEntrega = dataEntregaCell.textContent.trim();

    if (dataEntrega === 'Pendente') {

    } else {

    }
  }
});
