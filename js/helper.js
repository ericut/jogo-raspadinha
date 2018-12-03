var chances = [1, 2, 3, 4, 5, 6];
var indice = 0;
var ganhou = false;

function getPremio() {
    var myArray = ['https://s3.amazonaws.com/gswebhost/zoomboxapp/dw-zbd-gsgroupfake-sjrp-sp/img/premio/120.jpg',
        'https://s3.amazonaws.com/gswebhost/zoomboxapp/dw-zbd-gsgroupfake-sjrp-sp/img/premio/124.jpg',
        'https://s3.amazonaws.com/gswebhost/zoomboxapp/dw-zbd-gsgroupfake-sjrp-sp/img/premio/126.jpg',
        'https://s3.amazonaws.com/gswebhost/zoomboxapp/dw-zbd-gsgroupfake-sjrp-sp/img/premio/127.jpg',
        'https://s3.amazonaws.com/gswebhost/zoomboxapp/dw-zbd-gsgroupfake-sjrp-sp/img/premio/128.jpg'];

    var rand = myArray[Math.floor(Math.random() * myArray.length)];

    return rand;

}

function refresh() {
    if (indice >= chances.length) {
        window.location.href = 'agradecimento.html';
    }
    else {
        $('.raspadinha-container').load("scratch-container.html", function () {
            $('.proxima').hide();
            $('.info-padrao').hide();
            $('.perdeu').hide();
            $('.ganhou').hide();
            $(".local").html('GS Group São José do Rio Preto');
            $(".total").html('<span>Raspadinhas:</span> ' + (indice + 1) + ' de ' + chances.length);

            indice++;
            $('#qtdchances').html((chances.length - indice) + " raspadinhas")
        });
    }
}

function buscaGanhador() {
    $.ajax({
        type: 'GET',
        url: 'https://licenca.awszoombox.de:4000/licenca/api/v1/custom?page=url_app&cliente=4&hash=0d9c0e8d2fa3ea6e05404c7ba25e5ccd',
        cache: false,
        success: function (result) {
            if (ganhou) {
                $("#imgPremio").attr("src", getPremio());
                $('.ganhou').show();
                ganhou = false;
            }
            else {
                $('.perdeu').show();
                ganhou = true;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('.perdeu').show();
        }
    })
}