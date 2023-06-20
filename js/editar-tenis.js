function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}
var id_tenis = GetURLParameter("id");

//Processar formulário
$('#form-editar-tenis').submit(function (event) {

    event.preventDefault();


    //Criar formData
    var formData = {
        'id': id_tenis,
        'marca': $('#input-marca').val(),
        'modelo': $('#input-modelo').val(),
        'cor': $('#input-cor').val(),
        'tamanho': $('#input-tamanho').val(),
        'preco': $('#input-preco').val(),
        'quantidade': $('#input-quantidade').val(),
        'dataHoraCadastro': new Date().toISOString()
    };

    console.log(JSON.stringify(formData));

    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("Matheus:123456"));
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'PUT',
        url: 'http://localhost:8080/api/tenis/edit/ ' + id_tenis,
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (data) {
            location.href = 'listar-tenis.html';
        },
        error: function (data) {
            esconderAlert(); // Ocultar mensagem anterior, se houver
            $('#div-alert-message').prepend(data.responseText);
            $('#div-alert-message').fadeIn();
        
            // Ocultar a mensagem após 3 segundos
            setTimeout(function () {
                $('#div-alert-message').fadeOut();
            }, 3000);
        }
    });
});

function esconderAlert() {
    $('#div-alert-message').html("<a class='close' onclick='esconderAlert()'>×</a>");
    $('#div-alert-message').hide();

}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getUTCMonth() + 1),
        day = '' + d.getUTCDate(),
        year = d.getUTCFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


$(document).ready(function () {
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("Matheus:123456"));
        },
        url: 'http://localhost:8080/api/tenis/getById/' + id_tenis,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#input-marca").val(data.marca);
            $("#input-modelo").val(data.modelo);
            $("#input-cor").val(data.cor);
            $("#input-tamanho").val(data.tamanho);
            $("#input-preco").val(data.preco);
            $("#input-quantidade").val(data.quantidade);
        }
    })

});