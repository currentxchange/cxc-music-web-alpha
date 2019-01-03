//--- Define Menu Options ---\\

mapStyleOptions =
{
  "Toner": "Black & White (Labeled)",
  "TonerBackground": "Black & White (No Labels)",
  "Watercolor": "Watercolor"
};
dotStyleOptions =
{
  "ups": "Size By Ups",
  "views": "Size By Views",
  "same": "One Size"
};

resultsOptions =
{
  "12": "12",
  "144":"144",
  "216":"216",
  "1728": "1,728",
  "7776":"7,776",
  "20736": "20,736",
  "null":"Default (333)"
};


genreOptions =
{
  "hip-hop": "Hip-Hop / Rap / R&B",
  "reggaeton": "Reggaeton",
  "edm": "EDM",
  "rock": "Rock",
  "reggae": "Reggae",
  "world": "Folk / World",
  "jazz": "Jazz",
  "fusion":"Fusion",
  "conscious": "Conscious / Aquarian Age",
  "pop": "Pop",
  "classical": "Classical",
  "blues-soul": "Blues / Soul",
  "country": "Country",
  "null": "* All Genres *"
};

moodOptions =
{
  "chill": "Chill",
  "happy": "Happy",
  "dance": "Dance",
  "party": "Party / Club",
  "joyful": "Joyful",
  "energizing": "Energizing / Uplifting",
  "melancholic": "Melancholic",
  "emo": "Emotional",
  "angry": "Angry",
  "heavy": "Heavy / Hard",
  "light": "Light / Easy",
  "null": "* All Moods *"
};

formatOptions = {
  "song": "Songs / Singles",
  "instrumental": "Instrumentals",
  "album": "Full Albums",
  "instrumental-album": "Instrumental Albums",
  "remix": "Remixes",
  "livesong": "Live Songs",
  "liveset": "Live Sets / Concerts",
  "playlist": "Playlists & Mix Sets",
  "preview": "Previews / Snippet",
  "improv":"Improvisation / Freestyle",
  "skit": "Interlude / Skit",
  "null": "* All Formats *"
};


// === Add Map Style Options === \\


//--- Toggle Top Menu Elements ---\\
$("#genre-selector").on('click', function(){
  $("#mood-selector-ul, #format-selector-ul").hide()
  $("#genre-selector-ul").toggle();
});
$("#mood-selector").on('click', function(){
  $("#format-selector-ul, #genre-selector-ul").hide()
  $("#mood-selector-ul").toggle();
});
$("#format-selector").on('click', function(){
  $("#mood-selector-ul, #genre-selector-ul").hide()
  $("#format-selector-ul").toggle();
});
$("#clear-selectors").on('click', function(){
  $("#mood-selector-ul, #genre-selector-ul, #format-selector-ul").hide()
  Cookies.remove('curMood');
  Cookies.remove('curGenre');
  Cookies.remove('curFormat');
  window.location = location.protocol+'//'+location.host+location.pathname;
});



  // --- Show #clear-selectors" if need be --- \\
if (  Cookies.get('curMood') || Cookies.get('curGenre') || Cookies.get('curFormat'))
{
  $("#clear-selectors").show();
}


  // === Default Options === \\

  //--- Toggle Top Menu Elements ---\\
  $("#def-genre-label").on('click', function(){
    $("#def-mood-list, #def-format-list, #map-styles-list, #dot-styles-list, #results-limit-list").hide()
    $("#def-genre-list").toggle();
  });
  $("#def-mood-label").on('click', function(){
    $("#def-genre-list, #def-format-list, #map-styles-list, #dot-styles-list, #results-limit-list").hide();
    $("#def-mood-list").toggle();
  });
  $("#def-format-label").on('click', function(){
    $("#def-genre-list, #def-mood-list, #map-styles-list, #dot-styles-list, #results-limit-list").hide();
    $("#def-format-list").toggle();
  });
  $("#map-styles-label").on('click', function(){
    $("#def-genre-list, #def-mood-list, #def-format-list, #dot-styles-list, #results-limit-list").hide();
    $("#map-styles-list").toggle();
  });
  $("#dot-styles-label").on('click', function(){
    $("#def-genre-list, #def-mood-list, #def-format-list, #map-styles-list, #results-limit-list").hide();
    $("#dot-styles-list").toggle();
  });
  $("#results-limit-label").on('click', function(){
    $("#def-genre-list, #def-mood-list, #def-format-list, #map-styles-list, #dot-styles-list").hide();
    $("#results-limit-list").toggle();
  });


  $("#clear-default-settings").on('click', function(){
    $("#def-genre-list, #def-mood-list, #def-format-list, #map-styles-list").hide();
    Cookies.remove('defMood');
    Cookies.remove('defGenre');
    Cookies.remove('defFormat');
    Cookies.remove('mapStyle');
    Cookies.remove('dotStyle');
    Cookies.remove('results');
    window.location = location.protocol+'//'+location.host+location.pathname;
  });




  // --- Current Genre Options --- \\
  if ($("#genre-selector-ul li").length == 0)
  {
    $.each(genreOptions, function(name, description)
    {
      $("#genre-selector-ul")
        .append('<li id="curGenre' + name + '" class="" style="color:'+genreColors[String(name)]+'" value="' + name + '">' + description + '</li>');

      $("#curGenre" + name + "")
        .on('click', function()
        {
          Cookies.set('curGenre', name); // Set CooOOOookie
          //location.reload(); // refresh page
          window.location = location.protocol+'//'+location.host+location.pathname;
        });
    }); // --- END $.each --- \\
    //--- Match Active LIs with class to show they are active ---\\
    if (Cookies.get('curGenre') !== undefined)
    {
        makeActiveCurGenre = Cookies.get('defGenre');
        $("#curGenre" + makeActiveCurGenre + "").attr("style", "background-color:rgba(255,255,0,.2)");
      //  console.log("asdasfadEEEE"+ "#defMood" + Cookies.get('defMood') + "");
    }
  }
  // --- Current Mood Options --- \\
  if ($("#mood-selector-ul li").length == 0)
  {
    $.each(moodOptions, function(name, description)
    {
      $("#mood-selector-ul")
        .append('<li id="curMood' + name + '" style="color:'+moodColors[String(name)]+'" class="" value="' + name + '">' + description + '</li>');

      $("#curMood" + name + "")
        .on('click', function()
        {
          Cookies.set('curMood', name); // Set CooOOOookie
          //location.reload(); // refresh page
          window.location = location.protocol+'//'+location.host+location.pathname;
        });
    }); // --- END $.each --- \\
    //--- Match Active LIs with class to show they are active ---\\
    if (Cookies.get('curMood') !== undefined)
    {
        makeActiveCurMood = Cookies.get('curMood');
        $("#curMood" + makeActiveCurMood + "").attr("style", "background-color:rgba(255,255,0,.2)");
      //  console.log("asdasfadEEEE"+ "#defMood" + Cookies.get('defMood') + "");
    }
  }
  // --- Current Format Options --- \\
  if ($("#format-selector-ul li").length == 0)
  {
    $.each(formatOptions, function(name, description)
    {
      $("#format-selector-ul")
        .append('<li id="curFormat' + name + '" class="" value="' + name + '">' + description + '</li>');

      $("#curFormat" + name + "")
        .on('click', function()
        {
          Cookies.set('curFormat', name); // Set CooOOOookie
          //location.reload(); // refresh page
          window.location = location.protocol+'//'+location.host+location.pathname;
        });
    }); // --- END $.each --- \\
    //--- Match Active LIs with class to show they are active ---\\
    if (Cookies.get('curFormat') !== undefined)
    {
        makeActiveCurFormat = Cookies.get('curFormat');
        $("#curMood" + makeActiveCurFormat + "").attr("style", "background-color:rgba(255,255,0,.2)");
      //  console.log("asdasfadEEEE"+ "#defMood" + Cookies.get('defMood') + "");
    }
  }



  // --- Add Def Results Limit Options --- \\
  if ($("#results-limit-list li").length == 0)
  {
    $.each(resultsOptions, function(name, description)
    {
      $("#results-limit-list")
        .append('<li id="results' + name + '" class="tiles-option" value="' + name + '">' + description + '</li>');

      $("#results" + name + "")
        .on('click', function() {
          Cookies.set('results', name, {
            expires: 999999
          }); // Set CooOOOookie
          location.reload(); // refresh page
        });
    }); // --- END $.each --- \\

    //--- Match Active LIs with class to show they are active ---\\
    if (Cookies.get('results') !== undefined)
    {
        makeActiveResults = Cookies.get('results');
        $("#results" + makeActiveResults + "").attr("style", "background-color:rgba(255,255,0,.2)");
    }
  }



  // --- Add Def Dot Style Options --- \\
  if ($("#dot-styles-list li").length == 0)
  {
    $.each(dotStyleOptions, function(name, description)
    {
      $("#dot-styles-list")
        .append('<li id="defDotStyle' + name + '" class="tiles-option" value="' + name + '">' + description + '</li>');

      $("#defDotStyle" + name + "")
        .on('click', function() {
          Cookies.set('dotStyle', name, {
            expires: 999999
          }); // Set CooOOOookie


          location.reload(); // refresh page
        });
    }); // --- END $.each --- \\

    //--- Match Active LIs with class to show they are active ---\\
    if (Cookies.get('dotStyle') !== undefined)
    {
        makeActiveDotStyle = Cookies.get('dotStyle');
        $("#defDotStyle" + makeActiveDotStyle + "").attr("style", "background-color:rgba(255,255,0,.2)");
    }
  }


  // --- Add Def Map Style Options --- \\
  if ($("#map-styles-list li").length == 0)
  {
    $.each(mapStyleOptions, function(name, description)
    {
      $("#map-styles-list")
        .append('<li id="defMapStyle' + name + '" class="tiles-option" value="' + name + '">' + description + '</li>');

      $("#defMapStyle" + name + "")
        .on('click', function() {
          Cookies.set('mapStyle', name, {
            expires: 999999
          }); // Set CooOOOookie


          location.reload(); // refresh page
        });
    }); // --- END $.each --- \\

    //--- Match Active LIs with class to show they are active ---\\
    if (Cookies.get('mapStyle') !== undefined)
    {
        makeActiveMapStyle = Cookies.get('mapStyle');
        $("#defMapStyle" + makeActiveMapStyle + "").attr("style", "background-color:rgba(255,255,0,.2)");
    }
  }


  // --- Def Genre Options --- \\
  if ($("#def-genre-list li").length == 0)
  {
    $.each(genreOptions, function(name, description)
    {
      $("#def-genre-list")
        .append('<li id="defGenre' + name + '" style="color:'+genreColors[String(name)]+'" class="tiles-option" value="' + name + '">' + description + '</li>');

      $("#defGenre" + name + "")
        .on('click', function()
        {
          Cookies.set('defGenre', name,
          {
            expires: 999999
          }); // Set CooOOOookie
          //location.reload(); // refresh page
          window.location = location.protocol+'//'+location.host+location.pathname;
        });
    }); // --- END $.each --- \\
    //--- Match Active LIs with class to show they are active ---\\
    if (Cookies.get('defGenre') !== undefined)
    {
        makeActiveGenre = Cookies.get('defGenre');
        $("#defGenre" + makeActiveGenre + "").attr("style", "background-color:rgba(255,255,0,.2)");
      //  console.log("asdasfadEEEE"+ "#defMood" + Cookies.get('defMood') + "");
    }
  }

  // --- Def Mood Options --- \\
  if ($("#def-mood-list li").length == 0)
  {
    $.each(moodOptions, function(name, description)
    {
      $("#def-mood-list")
        .append('<li id="defMood' + name + '" style="color:'+moodColors[String(name)]+'" class="tiles-option" value="' + name + '">' + description + '</li>');

      $("#defMood" + name + "")
        .on('click', function()
        {
          Cookies.set('defMood', name,
          {
            expires: 999999
          }); // Set CooOOOookie
          window.location = location.protocol+'//'+location.host+location.pathname;
        });
    }); // --- END $.each --- \\

    //--- Match Active LIs with class to show they are active ---\\
    if (Cookies.get('defMood') !== undefined)
    {
        makeActiveMood = Cookies.get('defMood');
        $("#defMood" + makeActiveMood + "").attr("style", "background-color:rgba(255,255,0,.2)");
    }
  }

  // --- Def Format Options --- \\
  if ($("#def-format-list li").length == 0)
  {
    $.each(formatOptions, function(name, description)
    {
      $("#def-format-list")
        .append('<li id="defFormat' + name + '" class="tiles-option" value="' + name + '">' + description + '</li>');

      $("#defFormat" + name + "")
        .on('click', function()
        {
          Cookies.set('defFormat', name,
          {
            expires: 999999
          }); // Set CooOOOookie
          window.location = location.protocol+'//'+location.host+location.pathname;
        });
    }); // --- END $.each --- \\

    //--- Match Active LIs with class to show they are active ---\\
    if (Cookies.get('defFormat') !== undefined)
    {
        makeActiveFormat = Cookies.get('defFormat');
        $("#defFormat" + makeActiveFormat + "").attr("style", "background-color:rgba(255,255,0,.2)");
    }
  }


$("#settings-label")
  .on('click', function()
  {
    $("#settings-menus").toggle();
  }); // --- END $("#settings").click --- \\

  $("#my-location-link")
    .on('click', function()
    {
      myLocation();
    }); // --- END $("#my-location-link").click --- \\
