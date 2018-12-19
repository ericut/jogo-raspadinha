var totalChances = 0;
var indice = 0;
var ganhou = false;

//var url = 'ec2-54-172-25-26.compute-1.amazonaws.com:8080';

var url = '@urlgamepool';

function getPremio(nomePremio) {
    return 'https://s3.amazonaws.com/gswebhost/zoomboxapp/' + GetURLParameter('idvarejista') + '/img/premio/' + nomePremio;
}

function refresh() {
    if (indice >= totalChances) {
        window.location.href = 'agradecimento.html';
    }
    else {
        $('.raspadinha-container').load("scratch-container.html", function () {
            $('.proxima').hide();
            $('.info-padrao').hide();
            $('.perdeu').hide();
            $('.ganhou').hide();
            $(".total").html('<span>Raspadinhas:</span> ' + (indice + 1) + ' de ' + totalChances);
        });
    }
}

function QuantidadeChanges() {
    $.ajax({
        type: 'GET',
        url: GetUrl('detalheparticipacao'),
        cache: false,
        success: function (result) {
            if (result.Resultado === 1) {
                if (result.Chance) {
                    totalChances = result.Chance.TotalChances
                }
            }
            refresh();
        },
        error: function () {
            window.location.href = 'agradecimento.html';
        }
    })
}

function buscaGanhador() {
    $.ajax({
        type: 'GET',
        url: GetUrl('participar'),
        cache: false,
        success: function (result) {
            if (result.Resultado === 1) {
                if (result.Chance) {
                    ganhou = result.Chance.ChanceGanha;
                    indice = totalChances - result.Chance.TotalChances;
                    $('#qtdchances').html(result.Chance.TotalChances + " raspadinhas")

                    if (result.Chance.ChanceGanha) {
                        $("#imgPremio").attr("src", getPremio(result.Chance.ImagemPremio));
                        $(".local").html(result.Chance.NomeLojaRetirada);
                        $(".premio").html(result.Chance.NomePremio);
                        $('.ganhou').show();
                    }
                    else {
                        $('.perdeu').show();
                    }
                }
            }
            else {
                $('.perdeu').show();
            }
        },
        error: function () {
            $('.perdeu').show();
        }
    })
}

function GetUrl(action) {
    var protocol = window.location.protocol;
    if (protocol == "file:") {
        protocol = "http:";
    }

    return protocol + '//' + url + '/GamePool/api/v1/' + action + window.location.search;
}

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}