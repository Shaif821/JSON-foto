$(document).ready(function() {
    var zoekTerm;
    $('#pakFoto').click(function(){
        zoekTerm = $('#zoekterm').val();
        getFotos();
    });
//    Zorgt ervoor dat je op enter kan drukken
    $('#zoekterm').keydown(function(e){
        //if statement om te kijken of de enter het doet
        if(e.keyCode == 13) {
            zoekTerm = $('#zoekterm').val();
            getFotos();
        }
    });
    
    
    function getFotos() {
        var flickrURL = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" +
            zoekTerm + "&jsoncallback=?"
        //de variabele zoekTerm moet worden ingevoerd, vandaar + zoekTerm +
        
        $.ajax(
            {
                dataType: 'json', 
                method:'GET',
                url: flickrURL,
                success: verwerkFotos
                //Goed spellen anders komen de foto's niet
            }
        )
    }
    
    
    function verwerkFotos(data){ //Wordt aangeroepen als haalFotos succesvol is opgehaald
        console.log(data);
        $('#Afbeeldingen').html("");
        for(var i = 0; i < data.items.length; i++)//Betekent dat in de data zit data met een lengte van 20(array van 20)
            {                 //    I wordt foto
                var foto = data.items[i];  // de object is media
                var htmlCode = "<div class='omheen'><div class'='pic'><a href='" + foto.link + "' target='_blank'><img src= '" +foto.media.m + "' alt='" + foto.title + "' ></a></div><h4>" + foto.title + "</h4></div>";
                //Code wordt toegevoegd in de html
                $('#Afbeeldingen').append(htmlCode);
                //Wordt dus zo vaak doorlopen dat er items zijn. Dus steeds meer afbeeldinge zichtbaar.
            }
        $('#bron a').attr("href", data.link).text(data.title + " door FLickr.com");
    }
    
})