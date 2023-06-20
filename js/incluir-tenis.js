//Processar formulário
$('#form-inserir-tenis').submit(function (event) {

    event.preventDefault();


    //Criar formData
    var formData = {
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
        type: 'POST',
        url: 'http://localhost:8080/api/tenis/create',
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