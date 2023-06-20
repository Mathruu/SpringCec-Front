$(document).ready(listarTenis);

function listarTenis() {

    let usuario = sessionStorage.getItem("usuario");
    let senha = sessionStorage.getItem("senha");

    if ((usuario == null) || (senha == null) || (usuario == undefined) || (senha == undefined)) {
        alert("Usuário não autenticado");
        location.href = "/login.html";
    }

    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(usuario+":"+senha));
        },
        url: 'http://localhost:8080/api/tenis/list',
        type: 'get',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = '';
            $.each(result, function (i, data) {
                html += `<tr><td>` + data.marca + `</td>`;
                html += `<td>` + data.modelo + `</td>`;
                html += `<td>` + data.cor + `</td>`;
                html += `<td>` + data.tamanho + `</td>`;
                html += `<td><a href="editar-tenis.html?id=` + data.id + `"><i class="bi bi-pencil-fill"></i></a>`;
                html += ` <a href="visualizar-tenis.html?id=` + data.id + `"><i class="bi bi-search"></i></a>`;
                html += ` <a href="#" onclick="removerTenis(` + data.id + `)"><i class="bi bi-archive-fill"></i></a></td></tr>`;

                $("#tbListarTenisBody").html(html);
            });

            let table = new DataTable('#tbListarTenis');
        }
    })


}

function removerTenis(id) {

    var respostaPergunta = confirm("Confirma a exclusão?");
    if (respostaPergunta == true) {

        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa("Matheus:123456"));
            },
            type: 'DELETE',
            url: 'http://localhost:8080/api/tenis/remove/' + id,
            dataType: 'json',
            success: function (result) {
                location.reload();
            },
            error: function (result) {
                alert(result);
            }
        })

    }
}