$('#submit-music').submit(function(event) { // Take submit form and make it yo bish.
  event.preventDefault(); // POP DAT BUBBLE!!!

//--- We gon need some facts in this erria ---\\
yt = $("#yt").val();
sc = $("#sc").val();
spot = $("#spot").val();
mood = $("#mood option:selected").val();
genre = $("#genre option:selected").val();
format = $("#format option:selected").val();
songLat = $("#location").attr("valueLat");
songLng = $("#location").attr("valueLng");


console.log(genre);
console.log(mood);


errors = [];


spotSlug = "";
scSlug = "";
ytSlug = "";
valid = true;


if (yt) {
  validateYouTubeUrl(yt);
}

if (sc) {
  validateSoundcloudUrl(sc);
}

if (spot) {
  validateSpotifyUrl(spot);
}

//--- Check if content is blank ---\\
if ((!spot && !sc && !yt)) {
  errors.push("The Sound of Silence. Good choice.");
  valid = false;
}

//--- Limit posting to 1 per minute ---\\
if(Cookies.get('lastPost') !== undefined) {
    valid = false;
    errors.push("You are posting too quick, brohan. Give us like a min.");
}

//--- Make sure they chose some sore of Genre/Mood/Format ---\\
if(genre == "" && mood == "" && format == "") {
    valid = false;
    errors.push("Don't forget about the genre, mood, and format");
}


justSendIt = {
  "yt":ytSlug,
  "sc":scSlug,
  "spot":spotSlug,
  "mood":mood,
  "genre":genre,
  "lat":songLat,
  "lng":songLng,
  "format":format
};

if (Cookies.get('username') !== undefined){
  justSendIt.username = Cookies.get('username');
}


if( valid ){ // Send that shit
        $.ajax({
          method:"post",
          url:'php/add_music.php',
          data:justSendIt,
          dataType:"json"
        }) // END .ajax()
        .done(function(data){
          console.log(data);

          if (data.success == true)
          {
            $("#add-music-error").hide();
            $("#add-music-success").html("Your song has been posted to the map.").show();

            Cookies.set('lastPost', 'true', { expires: (1/1440) });
            console.log("no duplicate error");




            //--- Remove +Music Marker  ---\\
            if (typeof addMusicMarker !== 'undefined')
            {
              addMusicMarker.remove();
            }

                  // -- Post Song to Map -- \\
                  Cookies.set('getItSteemy', data.songid); // Adds cookie that will make user post to Steemit

                  var marker = L.circleMarker(
                    [songLat,songLng],
                    {
                      radius: 20,
                      "title": data.songid,
                      color: genreColors[genre],
                      fillColor: moodColors[mood]
                    }
                  )
                  .on("click", function (e)
                    {
                      //--- Force refresh with ID GET param that makes content display ---\\
                      urlGet.id = data.songid;
                      window.location = location.protocol+'//'+location.host+location.pathname + "?" + $.param(urlGet);
                    }
                  ).addTo(mymap);

          } else //END/CTN if (typeof addMusicMarker !== 'undefined')
          {

            $("#add-music-error, #add-music-success").hide();

            //--- either There was a duplicate ---\\
            if (data.success == false)
            {
              console.log("Error Message Should Appear");
              $("#add-music-error").text("It looks like we already have that song on the map. Thanks tho!").show();
            } else {

              // --- or Show Exact Error --- \\
              htmlErrors = [];

              if (data.scInvalid){
                htmlErrors.push("The Soundcloud link is in the right format, but showing nothing. Make sure it's public and try again.");
              }
              if (data.ytInvalid){
                htmlErrors.push("The YouTube link seems legit, but we can't embedd it. Make sure it's public and try again.");
              }
              if (data.spotInvalid){
                htmlErrors.push("The Spotify link seems cool, but isn't working. Make sure it's a song not an album. Click the three dots and then \"copy song link\".");
              }

              if (data.duplicate){
                htmlErrors.push("It looks like that song is already on the map.");
              }
              console.log(errors);

              htmlErrorsExpanded = htmlErrors.join("<br /><br />");

              $("#add-music-error").html(htmlErrorsExpanded).show();
          }

          } //END if (typeof addMusicMarker !== 'undefined')
          console.log(data);
        })
        .fail(function( textStatus ) { // Debug
          console.log({
            "yt":ytSlug,
            "sc":scSlug,
            "spot":spotSlug,
            "mood":mood,
            "genre":genre,
            "lat":songLat,
            "lng":songLng,
            "format":format
          });


          $("#alert-holder")
            .prepend('<div id="unknown-add-error-alert" class="alert alert-info bottom-alert" role="alert">Something went wrong on our end, try again in a few.</div>');
          $("#unknown-add-error-alert").fadeIn(222).delay(6000).fadeOut(222);

        console.log( "Request failed: " + JSON.stringify(textStatus) );
      }); // END .fail()

    } else { // END Validation if()
      console.log(errors);
      errorsExpanded = errors.join("<br /><br />");

      $("#add-music-error").html(errorsExpanded).show();
    }
});// END $('#submit-music') TODO



//--- Set Label of Steem Opt-in/out ---\\
if(Cookies.get('steemOptOut')=='1'){
  $("#add-music-steem-opt").html('Post To Steemit: Off');
} else {
  $("#add-music-steem-opt").html('Post To Steemit: On');
}

  $("#add-music-steem-opt").on('click', function()
  {
    //--- Set Cookie ---\\
    if(Cookies.get('steemOptOut')=='1'){
      $("#add-music-steem-opt").html('Post To Steemit: On');
      Cookies.set('steemOptOut', "0");
    } else {
      $("#add-music-steem-opt").html('Post To Steemit: Off');
      Cookies.set('steemOptOut', "1");
    }

  });



// === FUNCTIONS === \\

// --- Youtube Validation --- \\
function validateYouTubeUrl(passed) {
    var url = passed;
    if (url != undefined || url != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            // Valid
            ytSlug = match[2];
            console.log('yt validation passed');
            console.log(match[2]);
            return true;
        } else {
            valid = false;
            console.log('youtube validation failed');
            errors.push("Youtube link is invalid. You can use youtu.be or youtube.com links.");
        }
    }
}



// --- Spotify Validation --- \\
validateSpotifyUrl = function(passed) {
  var url = passed;
  var regExp = /^.*(spotify:|spotify\.com\/track\/)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length == 22 ) {// Valid
      spotSlug = match[2];
      console.log('spotify validation passed');
      return true;
  } else { // Invalid
      valid = false;
      console.log('spotify validation failed');
      errors.push("Check Spotify URL. Please make sure you are linking directly to the track, not an album. You can click \"copy song link\" and paste here.");

  }
};// END validateSpotifyUrl, Outputs 'true'




// --- Spotify Validation --- \\
function validateSoundcloudUrl(passed) {
  var url = passed;
  var regExp = /^.*(soundcloud\.com\/)([\w\-\.]+(\/)+[^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2] ) { // Valid
      scSlug = match[2];
      console.log('SoundCloud validation passed');
      return true;
  } else { // Invalid
      valid = false;
      console.log('Soundcloud validation failed');
      errors.push("Something is off with the Soundcloud link");

  }
}
