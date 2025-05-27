document.addEventListener('DOMContentLoaded', function () {
  let btns = document.querySelectorAll('.btn-exclusao');

  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', excluir);
  }

  function excluir() {
    let id = this.dataset.atividade;
    Swal.fire({
      icon: 'warning',
      title: 'Aviso',
      text: 'Tem certeza que deseja excluir essa atividade ?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then(function (isConfirm) {
      if (isConfirm) {
        let obj = {
          id: id,
        };

        fetch('/seeds/professor/atividade/excluir', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        })
          .then((r) => {
            return r.json();
          })
          .then((r) => {
            if (r.ok) {
              Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Operação realizada com sucesso',
                timer: 3000,
                showConfirmButton: false,
              });
              window.location.reload();
            }
          });
      }
    });
  }
});
