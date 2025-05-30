document.addEventListener('DOMContentLoaded', function () {
  // Seleciona todos os botões de corrigir
  const btns = document.querySelectorAll('.btn-corrigir');

  // Adiciona o evento de click a cada botão
  btns.forEach((btn) => {
    btn.addEventListener('click', function () {
      // Obtém os dados específicos do botão clicado
      const atividadeId = this.dataset.atividadeid;
      const alunoRa = this.dataset.alunora;
      const row = this.closest('tr');

      // Encontra o input de nota específico para esta linha
      const notaInput = row.querySelector('input[type="text"]');
      const nota = notaInput.value.trim();

      // Validação
      if (!nota) {
        alert('Digite uma nota antes de enviar.');
        return;
      }

      // Verifica se a nota é um número válido
      if (isNaN(nota) || parseFloat(nota) < 0 || parseFloat(nota) > 10) {
        alert('Por favor, insira uma nota válida entre 0 e 10.');
        return;
      }

      // Prepara os dados para envio
      const dados = {
        atividade_id: atividadeId,
        aluno_RA: alunoRa,
        nota: parseFloat(nota),
      };

      // Envia para o servidor
      fetch('/seeds/professor/corrigir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      })
        .then((response) => response.json())
        .then((resultado) => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Atividade cadastrada com sucesso',
            timer: 3000,
            showConfirmButton: false,
          });
        })
        .catch((err) => {
          console.error('Erro ao enviar nota:', err);
          alert('Erro de comunicação com o servidor.');
        });
    });
  });
});
