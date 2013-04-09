    document.body.style.visibility ="hidden";   
    
    var viewer = document.getElementById("viewer");

    viewer.style.visibility='visible';
    document.getElementById('shares').innerHTML = "";

    viewer.style.webkitFilter="drop-shadow(13px 13px 20px black) hue-rotate(10deg)";
    viewer.style.zoom= "90%";
    viewer.style.opacity="0.5";
    
    //var rcolor = 'rgba('+rnd(1,255)+ ',' +rnd(1,255)+ ',' + rnd(1,255) +',0.5)';
    var rcolor = 'rgba(59, 120, 120, 0.498039)';
    var rcolor2 = 'rgba('+rnd(1,255)+ ',' +rnd(1,255)+ ',' + rnd(1,255) +',0.5)';
       
    document.body.style.background = rcolor;
    viewer.style.background== rcolor2;

    function rnd(a,b){
         return Math.round(Math.random()*(b-a)+a);
    }

    script = document.createElement( 'script' );  
    script.src = 'jquery-1.9.0.js';
    script.onload = foo;
    document.body.appendChild(script);

    function foo(){
        script = document.createElement( 'script' );  
        script.src = 'jquery-ui.js';
        script.onload = foobar;
        document.body.appendChild(script);
    }

    function foobar(){

        if ( localStorage.getItem('Colorfox_zoom') != null ){
            console.log('okay');
            $( "#zoom" ).slider( "value" , localStorage.getItem('Colorfox_zoom'));
            $( "#opacity" ).slider( "value" , localStorage.getItem('Colorfox_opacity'));

            $('#viewer').css('zoom', localStorage.getItem('Colorfox_zoom') + '%');
            $('#viewer').css('opacity', localStorage.getItem('Colorfox_opacity')/10);
        };

        $("<div class='foo' />").appendTo('body');

        $('.foo').css({
            'visibility': 'visible',
            'background-color': rcolor,
            'opacity':'0.5',
            'position':'fixed',
            'top':'15px',
            'left':'1px',
            'bottom':'1px',
            'width':'200px' 
        });

        $("<p />").text('Zoom').appendTo('.foo');
        $("<div id='zoom' />").appendTo('.foo');
        $("<hr />").appendTo('.foo');

        $("<p />").text('Opacity').appendTo('.foo');
        $("<div id='opacity' />").appendTo('.foo');
        $("<hr />").appendTo('.foo');

        $("<div id='info' />").appendTo('.foo');
        $("<p />").text('Hippify').appendTo('.foo');
        $("<input id ='sepia' type='checkbox' />").appendTo('.foo');
        $("<input id ='invert' type='checkbox' />").appendTo('.foo');
        $("<input id ='normal' type='checkbox' />").appendTo('.foo');
        $("<hr />").appendTo('.foo');

        $( "#zoom" ).slider({
                        orientation: "horizontal",
                        range: "min",
                        min: 50,
                        max: 150,
                        value: 100,
                        slide: function( event, ui ) {
                            $('#viewer').css('zoom', ui.value + '%');
                            localStorage.setItem('Colorfox_zoom',ui.value);
                        }
                    });

        $( "#opacity" ).slider({
                        orientation: "horizontal",
                        range: "min",
                        min: 2,
                        max: 10,
                        value: 5,
                        slide: function( event, ui ) {
                            $('#viewer').css('opacity', ui.value/10 );
                            localStorage.setItem('Colorfox_opacity', ui.value );
                        }
                    });             

        $("#invert,#sepia,#normal").change(function (e) {
            if ( $('#invert').prop('checked') == true ){ $('#viewer').css("-webkit-filter", "invert(1)"); }
            if ( $('#sepia').prop('checked') == true ){ $('#viewer').css("-webkit-filter", "sepia(1)"); }
            if ( $('#normal').prop('checked') == true ){ $('#viewer').css("-webkit-filter", "sepia(0.1)"); } 

        });    

        var url = document.URL;
        var home_url = url.split('/').splice(0,5).join('/');
        var n = parseInt( url.split('/')[7].split('.')[0] ) + 1 ;
        var p = parseInt( url.split('/')[7].split('.')[0] ) - 1 ;
        var next = url.split('/').splice(0,7).join('/') + '/' + n + '.html';
        var previous = url.split('/').splice(0,7).join('/') + '/' + p + '.html';

        //console.log(next,previous);

        $('#info').html( "<div id='lt'> < </div> "
            +url.split('/')[5] +" "+ url.split('/')[6] +" p"+ url.split('/')[7].split('.')[0] 
            + "<div id='gt'> > </div>" );


        $('#gt').click(function () {
            window.location = next ;
            return false;
        });

        $('#lt').click(function () {
            window.location = previous ;
            return false;
        });

        arr=[];
        foo = document.getElementById('bottom_chapter_list').getElementsByTagName('option');
        total = foo.length;
        for (i=0;i<total;i++){arr.push(foo[i].value);}
        completed = arr.indexOf(document.getElementById('bottom_chapter_list').value);    
        console.log(completed,total);

        //$("<progress id='progressbar' value='"+completed+"' max='"+total+"' />").appendTo('body');
        $("<progress id='progressbar' value='"+0+"' max='"+total+"' />").appendTo('body');

        progressbar = $('#progressbar');

        window.onload = function(){

                        max = total;
                        time = (1000/max)*5;
                        value = 0;    

                        var loading = function() {
                            value += 1;
                            addValue = progressbar.val(value);
                            
                            $('.progress-value').html(value + '%');

                            if (value == completed) {
                                clearInterval(animate);                    
                            }
                        };

                        var animate = setInterval(function() {
                            loading();
                        }, time);

        }                
  
        document.getElementById('progressbar').style.visibility = 'visible';



    $("body").keypress(
                function (event) {

                    if (event.which == 74) { // j
                        console.log('j');
                        document.body.scrollTop += 4 ;
                    }
                    else if (event.which == 75) {  // k
                        document.body.scrollTop -= 4 ;
                    }
                    else if (event.which == 76) {  // l
                        window.location = next ;
                    }
                    else if (event.which == 72) {  // h
                        window.location = previous ;
                    }
                    else if (event.which == 80) { // p
                        foo = $('#viewer').css('zoom');
                        foo*=100;
                        $('#viewer').css('zoom', foo + 10 +'%');

                    }
                    else if (event.which == 77) { // m
                        foo = $('#viewer').css('zoom');
                        foo*=100;
                        $('#viewer').css('zoom', foo - 10 +'%');
                    }
                    else if (event.which == 79) { // o
                        foo = $('#viewer').css('opacity');
                        $('#viewer').css('zoom', parseFloat(foo) + parseFloat(0.2));

                    }
                    else if (event.which == 78) { // n
                        foo = $('#viewer').css('opacity');
                        $('#viewer').css('zoom', parseFloat(foo) - parseFloat(0.2));
                    }
                    

                }
            );    
    



    }
