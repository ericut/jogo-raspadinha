var totalChances = 0;
var indice = 0;
var ganhou = false;

var idcliente = GetURLParameter('idcliente');
var idvarejista = GetURLParameter('idvarejista');
var idloja = GetURLParameter('idloja');
var idcampanha = GetURLParameter('idcampanha');
var idmodulo = GetURLParameter('idmodulo');
var url = 'http://192.168.88.22:3000';

function getPremio(nomePremio) {
    return 'https://s3.amazonaws.com/gswebhost/zoomboxapp/' + idvarejista + '/img/premio/' + nomePremio.toLowerCase();
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
            indice++;
        });
    }
}

function QuantidadeChanges() {
    $.ajax({
        type: 'GET',
        url:  url + '/GamePool/api/v1/qtdchances?' + UrlComplementar(),
        cache: false,
        success: function (result) {
            if (result.Resultado === 1) {
                if (result.Chance) {
                    totalChances = result.Chance.TotalChances
                }
            }
            refresh();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            window.location.href = 'agradecimento.html';
        }
    })
}

function buscaGanhador() {
    $.ajax({
        type: 'GET',
        url:  url + '/GamePool/api/v1/participar?' + UrlComplementar(),
        cache: false,
        success: function (result) {
            if (result.Resultado === 1) {
                if (result.Chance) {
                    ganhou = result.Chance.ChanceGanha;
                    $('#qtdchances').html(result.Chance.TotalChances + " raspadinhas")
                    
                    if (result.Chance.ChanceGanha) {
                        $("#imgPremio").attr("src",getPremio(result.Chance.ImagemPremio));
                        $(".local").html(result.Chance.NomeLojaRetirada);
                        $(".premio").html(result.Chance.NomePremio);
                        $('.ganhou').show();
                    }
                    else {
                        $('.perdeu').show();
                    }
                }
            }
            else{
                $('.perdeu').show();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('.perdeu').show();
        }
    })
}

function GetParameter() {
    idcliente = GetURLParameter('idcliente');
    idvarejista = GetURLParameter('idvarejista');
    idloja = GetURLParameter('idloja');
    idcampanha = GetURLParameter('idcampanha');
    idmodulo = GetURLParameter('idmodulo');
}

function UrlComplementar() {
    GetParameter();
    return 'IdVarejista=' + idvarejista + '&IdCampanha=' + idcampanha + '&IdCliente=' + idcliente + '&IdLoja=' + idloja + '&IdModulo=' + idmodulo;
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