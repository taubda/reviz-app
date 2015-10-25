var app = {
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    }
};
function exitFromApp(){
    navigator.app.exitApp();x;
}

function onDeviceReady() {
  document.removeEventListener('deviceready', onDeviceReady, false);

  // Set AdMobAds options:
  admob.setOptions({
    publisherId:          "pub-1010853398748143",  // Required
    interstitialAdId:     "ca-app-pub-1010853398748143/8855901225",  // Optional
  });

  // Start showing banners (atomatic when autoShowBanner is set to true)
  admob.createBannerView();

  // Request interstitial (will present automatically when autoShowInterstitial is set to true)
  //admob.requestInterstitialAd();
    
}
function backButton() {
    document.addEventListener("backbutton", function(e){
        e.preventDefault();
        navigator.app.exitApp();
    }, false);
}
function backButton2() {
    document.addEventListener("backbutton", function(e){
        navigator.app.backHistory()
    }, false);
}
document.addEventListener("deviceready", onDeviceReady, false);


function ziskat() {
    var output = $('#output');
    $('#LoadingImage').show();
    
    $.ajax({
        url: 'http://uhabasku.cz/revizor/zobraz.php',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        timeout: 60000,
        success: function (data, status) {
            output.text('');
            $.each(data, function (i,item) {
                var linkaClass = item.linka;
                linkaClass = linkaClass.replace(/\s+/g, '-').toLowerCase();
                var zastavkaClass = item.zastavka;
                zastavkaClass = zastavkaClass.replace(/\s+/g, '-').toLowerCase();
                var timeago = $.timeago(item.datum);
                var presnycas = item.datum.substring(11,16);
                var dateSort = item.datum;

                var landmark = 
                '<div class="mix '+linkaClass+' '+zastavkaClass+'" data-date="'+ dateSort +'">'
                +'<div class="row-1">'
                +'<div class="obrazek"><img src="img/ico-'+linkaClass+'.png"></div>'
                +'<div class="obsah"><div class="zastavka">'+item.zastavka+'</div>'
                +'<div class="poznamka">'+item.poznamka+'</div>'
                +'</div><div class="clear"></div></div>'
                +'<div class="cas">'+timeago+'</div>'
                +'<div class="presnycas">'+presnycas+'</div><div class="clear"></div></div>';
                output.append(landmark);
            });
        },
        error: function(){
            output.html('<center><br><br>Nastal problém s načítáním dat.<br><a href="#" onclick="ziskat();return false;">Zkuste to znovu</a></center>');
        }
    });
    /*$.ajaxSetup({
        scriptCharset: "utf-8",
        contentType: "application/json; charset=utf-8"
    });*/

    $.getJSON('http://whateverorigin.org/get?url=' + 
        encodeURIComponent('http://api.revizorwatch.cz/rev/getBlackList') + '&callback=?',
        function (data) {
            console.log("> ", data);
            $('#LoadingImage').fadeOut(300);
            var response = $.parseJSON(data.contents);
        
            for (var u = 0; u < response.data.posts.length; u++){
                var itemK = response.data.posts[u];
                
                var linkaClassK = itemK.line.toLowerCase();
                var zastavkaClassK = itemK.station;
                zastavkaClassK = zastavkaClassK.replace(/\s+/g, '-').toLowerCase();
                var timeagoK = $.timeago(itemK.date);
                var presnycasK = itemK.date.substring(11,16);
                var dateKSort = itemK.date;

                if ((linkaClassK == 'a') || (linkaClassK == 'b') || (linkaClassK == 'c')) {
                    var landmarkK = 
                    '<div class="mix metro-'+linkaClassK+' '+zastavkaClassK+'" data-date="'+ dateKSort +'">'
                    +'<div class="row-1">'
                    +'<div class="obrazek"><img src="img/ico-metro-'+ linkaClassK +'.png"></div>'
                    +'<div class="obsah"><div class="zastavka">'+ itemK.station +'</div>'
                    +'<div class="poznamka">'+itemK.note+'</div>'
                    +'</div><div class="clear"></div></div>'
                    +'<div class="cas">'+ timeagoK +'</div>'
                    +'<div class="presnycas">'+presnycasK+'</div><div class="clear"></div></div>';
                    output.append(landmarkK);
                }
            }
        try {
                $(output).mixItUp('destroy');
            }catch(x) {}
            $(function(){
                var $filterSelect = $('#FilterSelect'),
                    /*$sortSelect = $('#SortSelect'),*/
                    $container = output;
                
                $(output).mixItUp({
                    layout: {
                        display: 'block'
                    },
                    animation: {
                        effects: 'fade'
                    },
                    selectors: {
                        filter: 'all',
                    },
                    load: {
                        sort: 'date:desc'
                    }
                });
                $filterSelect.on('change', function(){
                    $container.mixItUp('filter', this.value);
                });
                /*$sortSelect.on('change', function(){
                    $container.mixItUp('sort', this.value);
                });*/
            });
    });
};


/*******************ADD*******************/
function nahrat () {
    $('#linka').change(function(){
        var id = $(this).find(':selected').data('id');
        $('#zastavka option').hide().filter('[data-id="'+id+'"]').show();
        $("#zastavka option[value=blank]").prop('selected', true)
    });

    var empty = false;
    if (empty) {
        $('#btnNahraj').attr('disabled', 'disabled');
    } else {
        $('#btnNahraj').removeAttr('disabled');
    }

    $('#contactForm').submit(function(){
        var self = this;
        $.ajax(
            $(this).attr('action'),
            {
                data: $(self).serialize(),
                method: $(self).attr('method'),
                beforeSend: function(){
                 $("#btnNahraj").html('Nahrávám...');
                 $('#btnNahraj').attr('disabled', 'disabled');
                },
                complete: function(){
                 $("#btnNahraj").html('Nahlásit<i class="material-icons right">send</i>');
                 $('#btnNahraj').removeAttr('disabled');
                },
                success: function(){
                    $(".add form").hide();
                    $(".add .success").show();
                    /*UNIQUE ID*/
                    var currTimeD = new Date();
                    var currHourA = currTimeD.getHours()*3600;
                    var currMinA = currTimeD.getMinutes()*60;
                    var currSecA = currTimeD.getSeconds();
                    var currTimeA = currHourA + currMinA + currSecA;
                    window.localStorage.clear();
                    window.localStorage.setItem('key', currTimeA);
                    
                    setTimeout(function(){ window.location = 'index.html'; }, 1500);
                },
                error: function(){
                    $(".add .successno").show();
                }
            }
        );
        return false;
    });   
}

function zarizeni () {
    var currTimeD = new Date();
    var currHour = currTimeD.getHours()*3600;
    var currMin = currTimeD.getMinutes()*60;
    var currSec = currTimeD.getSeconds();
    var currTime = currHour + currMin + currSec;
    
    var value1 = window.localStorage.getItem("key");
    var value = parseInt(value1) + 300;
    
    if (value > currTime) {
        $('#contactForm').hide();
        $('.time').show();
        var zbyva = value - currTime;
        /*var zbyvaMinutes = Math.floor(zbyva / 60);
        var zbyvaSeconds = zbyvaMinutes - zbyvaMinutes * 60;
        
        function str_pad_left(string,pad,length) {
            return (new Array(length+1).join(pad)+string).slice(-length);
        }
        var finalTime = str_pad_left(zbyvaMinutes,'0',2)+':'+str_pad_left(zbyvaSeconds,'0',2);*/
        var zbyvaMinutes = Math.floor(zbyva / 60); // 7
        var zbyvaSeconds = zbyva % 60; // 30
        $('.time span').html(zbyvaMinutes + ':' + zbyvaSeconds);
        }
    else {
        $('#contactForm').show();
        $('.time').hide();
    }
}

function smazat () {
    window.localStorage.clear();
}