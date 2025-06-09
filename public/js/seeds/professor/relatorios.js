document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btn-filtrar").addEventListener("click", filtrar);
    document.getElementById("btn-exportar-excel").addEventListener("click", exportarExcel);
    document.getElementById("btn-exportar-pdf").addEventListener("click", exportarPDF);

    function exportarExcel() {
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaRelatorio"));
        XLSX.writeFile(wb, "relatorio-notas.xlsx");
    }

    function exportarPDF() {
        window.print(); // Abre a janela de impressão
    }

    function filtrar() {
        let termo = document.getElementById("filtro").value;

        fetch("/seeds/professor/filtrar/?termo=" + encodeURIComponent(termo))
            .then(resposta => resposta.json())
            .then(corpoResposta => {
                let html = "";

                if (!corpoResposta.lista || corpoResposta.lista.length === 0) {
                    html = `<tr><td colspan="5" class="text-center">Nenhum dado encontrado.</td></tr>`;
                } else {
                    for (let i = 0; i < corpoResposta.lista.length; i++) {
                        html += `
                            <tr>
                                <td>${corpoResposta.lista[i].turma_nome}</td>
                                <td>${corpoResposta.lista[i].disciplina_nome}</td>
                                <td>${corpoResposta.lista[i].atividade_titulo}</td>
                                <td>${corpoResposta.lista[i].aluno_nome} (${corpoResposta.lista[i].aluno_RA})</td>
                                <td>${corpoResposta.lista[i].nota !== null ? corpoResposta.lista[i].nota : 'Não atribuída'}</td>
                            </tr>
                        `;
                    }
                }

                document.getElementById("tabelaRelatorio").innerHTML = html;
            })
            .catch(erro => {
                console.error("Erro:", erro);
                document.getElementById("corpoTabelaRelatorio").innerHTML =
                    `<tr><td colspan="5" class="text-center text-danger">Erro ao carregar dados.</td></tr>`;
            });
    }
});
