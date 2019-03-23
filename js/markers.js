//--- Arrays of Colors ---\\
genreColors = {
  "hip-hop":"#F9D533",
  "reggaeton":"#E69139",
  "edm":"orange",
  "rock":"#FF3333",
  "reggae":"green",
  "world":"#397628",
  "jazz":"#b2ffff",
  "fusion":"#00ffff",
  "conscious":"#A55CE7",
  "pop":"#FF6FD7",
  "classical":"#ffd700",
  "blues-soul":"#0080ff",
  "country":"#280600",
  "":"#000000"
};

moodColors = {
  "chill":"#609EA8",
  "happy":"#f8ca00",
  "trance":"#1ec0ff",
  "dance":"#ff69b4", // Deep Sky
  "party":"#e53a40",
  "joyful":"#F1C232",
  "energizing":"#32cd32",
  "angry":"#350000",
  "dark":"#000000",
  "melancholic":"#ACACFF",
  "heavy":"#310B1E",
  "light":"#CAFFEE",
  "":"#000000"
};

socialsSet = false;

//--- Get Results ---\\
url = 'php/get_results.php';

//--- Build GET ---\\
var parts = window.location.search.substr(1).split("&");

$_GET = {};
for (var i = 0; i < parts.length; i++) {
    var temp = parts[i].split("=");
    $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}


//--- Set Access Token Cookie ---\\
if ($_GET.access_token !== undefined) // Check if URL is callback from Steemconnect
{
  var accTok = $_GET.access_token;
  var dateObj = Date.now();
  dateObj += $_GET.expires_in;
  dateObj = new Date(dateObj);

  Cookies.set('access_token', accTok,
  {
    expires: dateObj
  }); //END Set CooOOOookie

  Cookies.set('username', $_GET.username,
  {
    expires: dateObj
  });

  //--- Remove token from the URL so it looks pretty again  ---\\ NOTE: Should parse the state variable, reset the values to what they should be
  // Parse it, parse it goood
  newParts = $_GET.state.split("&");
  $_GET = {};
  for (var i = 0; i < newParts.length; i++) {
      var temp = newParts[i].split("=");
      $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
  }

} // END if ($_GET.access_token !== undefined)


//--- Add Defaults to GET ---\\
if ($_GET.genre == undefined && Cookies.get('defGenre') !== undefined && Cookies.get('curGenre') == undefined) {
  $_GET.genre = Cookies.get('defGenre');
}else if ($_GET.genre == undefined && Cookies.get('curGenre') !== undefined)
{
  $_GET.genre = Cookies.get('curGenre');
}


if ($_GET.mood == undefined && Cookies.get('defMood') !== undefined && Cookies.get('curMood') == undefined) {
  $_GET.mood = Cookies.get('defMood');
}
else if ($_GET.mood == undefined && Cookies.get('curMood') !== undefined)
{
  $_GET.mood = Cookies.get('curMood');
}

if (Cookies.get('results') !== undefined) {
  $_GET.results = Cookies.get('results');
}


if ($_GET.format == undefined && Cookies.get('defFormat') !== undefined && Cookies.get('curFormat') == undefined)
{
  $_GET.format = Cookies.get('defFormat');
} else if ($_GET.format == undefined && Cookies.get('curFormat') !== undefined)
{
  $_GET.format = Cookies.get('curFormat');
}


//--- Add Location and Zoom to GET ---\\
if (Cookies.get('locLng') !== undefined && $_GET.locLat == undefined)
{
  mymap.setView([ Cookies.get('locLat'),Cookies.get('locLng')], Cookies.get('zoom'));
} else if ($_GET.locLat !== undefined)
{
  mymap.setView([$_GET.locLat, $_GET.locLng], $_GET.zoom);
}




if (Object.keys($_GET).length > 1){
  //--- Delete Bad Keys ---\\
  $.each( $_GET, function( key, value ) {
    urlGet = $_GET;
    if (value == undefined || value == "undefined" || key == "undefined" || key == "undefined" || value == "null" || value == null || key == "access_token" || key == "expires_in")
    {
      delete urlGet[key];
    }
    history.pushState(null, '', (location.protocol+'//'+location.host+location.pathname + "?" + $.param(urlGet) ));
  });
}


//console.log($_GET);



//--- GET markers using $_GET params ---\\
$.ajax({
  type: 'GET',
  url: url,
  data: $_GET,
  crossDomain: true,
  context: document.body,
  contentType: 'json'
}).done(function(data) {
  //console.log(data);
  data = JSON.parse(data);

  //--- Make Chart Display ---\\
  totChartRows = data.length;
  curChartRow = data.length; // Gets the # on the charts
  data.forEach(function(song) {

// --- Build Row --- \\
chartRow = $('<div class="chart-row-container"></div>');

chartRow.append($('<span class="chart-number">'+((totChartRows - curChartRow)+ 1) +'</span>'));

// --- First Line --- \\
chartFirstLine = $("<div>",{
  class:"chart-first-line"
});
chartTitle = $('<h2 class="chart-title"  id="chartId'+song.songid+'">'+song.title+'</h2>'); // END First Line Append


chartFirstLine.append(chartTitle);

chartRow.append(chartFirstLine);

// --- Second Line--- \\
secondLine = $('<div class="chart-second-line"></div>');
chartVotesDiv = $('<div class="chart-votes"></div>');

if(!song.ups){song.ups = 0;}
chartVotesDiv.append('<span class="fa-sm chart-sol-ups-count"> '+song.ups+'</span>');

if(!!song.bigups){
  chartVotesDiv.append('<span class="fa-sm chart-big-ups-count" > '+song.bigups+'</span>');
}

if(!!song.blueups){
  chartVotesDiv.append('<span class="fa-sm chart-blue-ups-count"> '+song.blueups+'</span>');
}

// --- Prepend total UPs count last to preserve song.ups --- \\
if (!!song.blueups){song.ups += song.blueups;}
chartVotesDiv.prepend('<span class="fa-sm chart-ups-count"> '+song.ups+'</span>');


chartGenreMood = $('<div class="chart-genre-mood"></div>');

if(!!song.genre){
  chartGenre = $('<span class="chart-genre labelOne" style="color:'+genreColors[song.genre]+'">'+song.genre+'</span>');
  chartGenre.on("click", function(){
    Cookies.set('curGenre', song.genre); // Set CooOOOookie
    window.location = location.protocol+'//'+location.host+location.pathname;

  }); // END chartGenre.on("click"
  chartGenreMood.append(chartGenre);
} // END if(!!song.genre)
if(!!song.mood){
  chartMood = $('<span class="chart-mood labelOne" style="color:'+moodColors[song.mood]+'">'+song.mood+'</span>');
  chartMood.on("click", function(){
    Cookies.set('curMood', song.mood); // Set CooOOOookie
    window.location = location.protocol+'//'+location.host+location.pathname;
  })
  // $("#defFormat" + name + "")
  chartGenreMood.append(chartMood);
}



// --- Add Divs to Second Line --- \\
secondLine.append(chartVotesDiv).append(chartGenreMood);

chartRow.append(secondLine);

chartRow.append('<hr class = "chart-divider" />');



// --- Insert into Chart Display --- \\
$("#charts-jumbo").append(chartRow);
curChartRow--;
}); // END Make Chart Display Foreach


//--- Display Each Song ---\\
  data.forEach(function(song) {

        cmRadius = 20;
      if (Cookies.get('dotStyle') == 'ups' ){
        cmRadius = (song.ups + 2);
      } else if (Cookies.get('dotStyle') == 'views') {
        cmRadius = Math.ceil(((song.cxc_views + 12) / 24));
      }

      var marker = new cxcCircleMarker(
        [song.lat,song.lng],
        {
          radius: cmRadius,
          title: song.title,
          songid: song.songid,
          ups:song.ups,
          blueups:song.blueups,
          bigups:song.bigups,
        //  genre: song.genre,
        //  mood: song.mood,
          //format: song.format,
          color:genreColors[song.genre],
          fillColor:moodColors[song.mood]
        })//{"title":song.songid"]}}
      .on("click", function (e)
      {
        //--- Center the Map ---\\
        mymap.setView([song.lat, song.lng])

        //--- Clean Steem Engine ---\\
        $("#steem-engine").removeData();

        //--- Add Active Music Return Button to Chart Display ---\\
        $("#active-music-return-button").show();


        //--- Clean Up Icons ---\\
        $("#up-button-in").css("opacity", .2);
        $("#up-button-out").css("bottom", "50px" );
        if(Cookies.get('recentUp')=="1"){
          $("#up-button-in").css({opacity: 1, cursor:"not-allowed"});
          $("#up-button-out").css({bottom: "4000px" } );
        }

        //--- Add Doug's Delete Button ---\\
        if (Cookies.get('username') == 'douglasjames' || Cookies.get('username') == 'currentxchange')
        {
          // Add the button
          $("#active-music-jumbo").prepend('<span class="labelOne" id="dougsDeleteButton">Make the Bad Man Fly</span>');
          $("#dougsDeleteButton").on('click', function()
          {
            // Check if it's really me
            scapi.me(function (err, res) {
              console.log(res, err);
                if (res)
                {
                    console.log('Dougs Delete Res found');
                    var account = res.account;
                    if (account.name == "douglasjames" || account.name == "currentxchange")
                    {
                    $.ajax({
                    method:"post",
                    url:'php/dougs_delete.php',
                    data:{
                      songid:song.songid
                    },
                    dataType:"json"
                  })
                  .done(
                    function (result){
                      console.log('Dougs Delete fired');
                      console.log(result);
                      if (result == "success")
                      {
                        window.location = location.protocol+'//'+location.host+location.pathname;
                      }
                    });
                  }
                } else {console.log('Dougs Delete Didnt work');} // END if (res)

              });
            });
        }

        //--- See if Title is to be added to the DB ---\\
        if (!!(song.title)){
          $("#steem-engine").data('needsTitle', false);
        } else {
          $("#steem-engine").data('needsTitle', true);
        }

        //--- Display Each Song ---\\Get Vars to SteemEngine
        $("#steem-engine").data('genre', song.genre).data('mood', song.mood).data('format', song.format).data('songid', song.songid);


        if(typeof urlGet !== 'undefined'){
          //--- Make URL match the ID shown Firefox --- \\
          urlGet.id = song.songid;
          shareURL = location.protocol+'//'+location.host+location.pathname + "?" + $.param(urlGet);
          history.pushState(null, '', shareURL);
        } else {
          //--- Make URL match the ID shown in Chrome--- \\
          shareURL = location.protocol+'//'+location.host+location.pathname + "?id=" + song.songid;
          history.pushState(null, '', shareURL);
        }

        // --- Set up blank jumbotron --- \\
        $("#active-music-jumbo").show();
        // --- Hide MGS Selectors if need-be --- \\
        if ($( document ).width() < 500)
        {
          $("#selectors-holder").hide();
          $("#bottom-menus").hide();
        }


        $("#title-jumbo").text("Loading...");
        // --- Hide Shit --- \\
        $("#active-music-jumbo .sc-play, #active-music-jumbo .spot-play, #active-music-jumbo .yt-vid, #profiles-jumbo .yt-profile, #profiles-jumbo .sc-profile, #profiles-jumbo .spot-profile, #yt-download").html('');
        $("#by-label, #up-button-in, #up-button-out").hide();
        $(".jumbo-togs").hide();
        $("#icons *").hide();
        // --- Clear FB Share Data --- \\





        var truuue = {
          "yt": song.yt_link ? song.yt_link : null,
          "spot": song.spot_link ? song.spot_link : null,
          "sc": song.sc_link ? song.sc_link : null
        };

        $("#steem-engine").data('yt_link', truuue.yt).data('sc_link', truuue.sc).data('spot_link', truuue.spot);

        if (scampiSauce){

          $("#steem-options").show();
          $("#post-to-steem").html('Post to Steemit');
          $("#post-to-steem").on('click', function()
          {
            console.log("Send from post called");
            Cookies.set('getItSteemy', song.songid);
            serveScampi();
            $("#post-to-steem").html("sending..");
          });

          $("#flag-content").html('flag');
          $("#flag-content").on('click', function()
          {
            $("#flag-options").toggle();
            $("#flag-options li").click( function ()
            {
              $("#flag-content").html('flagging..');
              var flagType = $(this).attr("value");
              // Check if user is logged i
              scapi.me(function (err, res) {
                console.log(res, err);
                  if (res)
                  {
                      console.log('Dougs Delete Res found');
                      var account = res.account;

                      $.ajax({
                      method:"post",
                      url:'php/flag.php',
                      data:{
                        songid:song.songid,
                        username:account,
                        flag:flagType
                      },
                      dataType:"json"
                    })
                    .done(
                      function (result){
                        console.log('Flag Worked');
                        console.log(result);
                        if (result == "success")
                        {
                          $("#flag-options").unbind('click')
                          $("#flag-content").html('thanks!');
                          $("#alert-holder")
                            .prepend('<div id="flag-success" class="alert alert-success bottom-alert" role="alert">Flag received. Thanks for letting us know. Learn more about Guardianship in our <a href="https://bit.ly/PRPpaper1">purple paper</a>.</div>');
                          $("#flag-success").fadeIn(222).delay(6000).fadeOut(222);
                        }
                      });

                  } else {console.log('Flag did not work.');} // END if (res)

                });//End scampi


            })
          });



        }// End if(scampiSauce)

      console.log(truuue);
      //console.log(this.options.songid);


      if((truuue.yt !== null)){  //--- Get the Youtube Song Info from embeds.php
        yt_only = {
          "yt": song.yt_link ? song.yt_link : null
        };
        $.ajax({
          type: "GET",
          url: "php/embeds.php",
          crossDomain: true,
          contentType: 'json',
          data: yt_only
      }).then(function(song){
        song = JSON.parse(song);

        // --- Embedd Youtube Player --- \\
        $("#active-music-jumbo .yt-vid").html(unescape(song.html)).show();

        // --- Download Link --- \\
        $("#yt-download").html("<a title='Download "+song.title+" in MP3/MP4' href='http://deturl.com/www.youtube.com/watch?v="+truuue.yt+"'>Download</a>");

        // --- Add title --- \\
        $("#title-jumbo").html(unescape(song.title)).show();
        $("#by-label, #up-button-in, #up-button-out").show();

        shareDesc = 'Listen to '+ song.title +' and find music from around the globe with cXc Music, a web app by @currentxchange';
        shareTitle = song.title + ' on cXc Music';
        shareThumb = song.thumbnail_url;

        // --- Metatron's Tags --- \\
        $("meta[property='og:image'], meta[name='twitter:image:src'], meta[name='twitter:image']").attr('content', song.thumbnail_url);
        $("meta[name='description'], meta[property='og:description'], meta[name='twitter:description']").attr('content', shareDesc);
        $("meta[property='og:title'], meta[name='twitter:title']").attr('content', shareTitle);


        // --- Show Icons and HR --- \\
        $(".jumbo-togs").show();

        $("#profiles-jumbo .yt-profile").html(' <a href="'+song.author_url+'" title="'+song.author_name+' on Youtube">'+song.author_name+'</a> ').show();
        // --- Youtube Icon --- \\
        $("#yt-icon").html("<a title='Watch on YouTube' target='_blank' href='https://www.youtube.com/watch?v="+yt_only.yt+"'><img alt='YouTube Icon Link' src='images/yt-wht.png' /></a>").show();
        console.log(song);

        //$("#share-music").jsSocials({ text: unescape(song.title)+" ~ Find underground music from around the world on cXc Music"});


         // --- Build steem-engine --- \\
         $("#steem-engine").data('title', unescape(song.title));
         $("#steem-engine").data('yt_author_name', unescape(song.author_name));
         $("#steem-engine").data('yt_author_url', unescape(song.author_url));
         $("#steem-engine").data('yt_thumbnail_url', unescape(song.thumbnail_url));


           // --- Send Post to Steemit --- \\
           if(truuue.sc == null && truuue.spot == null){
             serveScampi();
             // --- Add title to DB --- \\
             sendTitle();
           } else {
             console.log("scampi1 not served");
           }

          //--- Call Social Maker ---\\
           if (!(socialsSet)){
             console.log('yt makesocial');
            setTimeout(makeSocial, 1000);
            socialsSet = true;
           }



        }).fail(function(error){
          console.log("YT Embed Failed");
          console.log("scampi 1 Failed");
          console.log(error);


        }); // End Youtube Call


      } // End If (YT)

      if((truuue["sc"] !== null)){ //--- Get the Soundcloud Song Info from embeds.php
        sc_only = {
          "sc":song['sc_link'] ? song['sc_link'] : null
        };


        $.ajax(
          {
          type: "GET",
          url: "php/embeds.php",
          crossDomain: true,
          contentType: 'json',
          data: sc_only
          }).then(function(song){
            song = JSON.parse(song);
            // --- Soundcloud Icon --- \\
            $("#active-music-jumbo .sc-play").html(unescape(song.html)).show();
            $("#sc-icon").html("<a title='Listen on SoundCloud' target='_blank' href='https://soundcloud.com/"+sc_only.sc+"'><img alt='Soundcloud Icon Song link' src='images/sc-wht.png' /></a>").show();
            $("#profiles-jumbo .sc-profile").html(' <a href="'+song.author_url+'"title="'+song.author_name+' on SoundCloud">'+song.author_name+'</a> ');
            $("#by-label, #up-button-in, #up-button-out").show();
            // --- Show Icons Label and HR --- \\
            $(".jumbo-togs").show()

            // --- Metatron's Tags --- \\


            shareDesc = 'Listen to '+ song.title +' and find music from around the globe with cXc Music, a web app by @currentxchange';
            shareTitle = song.title + ' on cXc Music';
            shareThumb = song.thumbnail_url;
            if($("meta[property='og:image']").attr('content') == 'images/cXc-Alpha-App-2.1[600].png' )
            {

              $("meta[property='og:image'], meta[name='twitter:image:src'], meta[name='twitter:image']").attr('content', shareThumb);
            }

            if($("meta[property='og:description']").attr('content') == 'Find underground music from around the world on cXc Music, an app by @currentxchange' )
            {
              $("meta[name='description'], meta[property='og:description']").attr('content', ('Listen to '+ song.title +' and find music from around the globe with cXc Music, an app by @currentxchange'));
            }

            if($("meta[property='og:title']").attr('content') == 'cXc Music (Alpha)' )
            {
              $("meta[property='og:title'], meta[name='twitter:title']").attr('content', (song.title+ ' on cXc Music'));
            }

            // --- Add title if no YT title already --- \\
            if(($("#title-jumbo").text() == "Loading...") || ($("#title-jumbo").text() == "Mystery Spotify Song"))
            {
              $("#title-jumbo").html(unescape(song.title)).show();

            }
             console.log(song);

             // --- Build steem-engine --- \\
            $("#steem-engine").data('sc_author_name', unescape(song.author_name));
            $("#steem-engine").data('sc_author_url', unescape(song.author_url));
            $("#steem-engine").data('sc_html', unescape(song.html));
            $("#steem-engine").data('sc_thumbnail_url', unescape(song.thumbnail_url));

            $("#steem-engine").data('desc', unescape(song.description)); // Only SC has a description
            if ($("#steem-engine").data('title') == undefined || ($("#steem-engine").data('title') == "Mystery Spotify Song")){
               $("#steem-engine").data('title', unescape(song.title));
            }

            // --- Send Post to Steemit --- \\
            if(truuue.spot == null){
              serveScampi();
            } else {
              console.log("scampi 2 not served");
            }

            // --- Add title to DB --- \\
            sendTitle();

            //--- Call Social Maker ---\\
             if (!(socialsSet)){
               console.log('sc mks');
              setTimeout(makeSocial, 1000);
              socialsSet = true;
             }


        }).fail(function(error){
          console.log("SC Embed Failed");
          console.log(error);
        }); // End SoundCloud Call
      } // End If (Sc)

      if((truuue.spot !== null)){ //--- Get the Spotify Song Info from embeds.php
        spot_only = {
          "spot": song.spot_link ? song.spot_link : null
        };

        $.ajax({
          type: "GET",
          url: "php/embeds.php",
          crossDomain: true,
          contentType: 'json',
          data: spot_only
      }).then(function(song){
         song = JSON.parse(song);
         //window.song = song;

        $("#active-music-jumbo .spot-play").html(unescape(song.html)).show();
         console.log(song);
        $("#spot-icon").html("<a title='Listen on Spotify' target='_blank' href='https://open.spotify.com/track/"+spot_only.spot+"'><img alt='Spotify Icon Link' src='images/spot-wht.png' /></a>").show();

        // --- Add dummy title if no title already --- \\
        if(($("#title-jumbo").text() == "Loading...") && ($("#steem-engine").data('title') == undefined))
        {
          $("#title-jumbo").html(unescape(song.title)).show();
        }
        // --- Show Icon Title and HR --- \\
        $(".jumbo-togs").show();


        // --- Metatron's Tags --- \\
        shareDesc = 'Listen to '+ song.title +' and find music from around the globe with cXc Music, a web app by @currentxchange';
        shareTitle = song.title + ' on cXc Music';
        shareThumb = song.thumbnail_url;

        $("meta[property='og:image'], meta[name='twitter:image:src'], meta[name='twitter:image']").attr('content', song.thumbnail_url);
        if(($("#title-jumbo").text() == "Loading...") || ($("#title-jumbo").text() == "Mystery Spotify Song")){
          $("meta[name='description'], meta[property='og:description'], meta[name='twitter:description']").attr('content', 'Find underground music from around the world on cXc Music, an app by @currentxchange');
          $("meta[property='og:title'], meta[name='twitter:title']").attr('content','cXc Music (Alpha)');
        }
        if($("meta[property='og:image']").attr('content') == 'images/cXc-Alpha-App-2.1[600].png' )
        {



          $("meta[property='og:image'], meta[name='twitter:image:src'], meta[name='twitter:image']").attr('content', shareThumb);

        }


        // --- Build steem-engine --- \\
        $("#steem-engine").data('spot_thumbnail_url', unescape(song.thumbnail_url));
        $("#steem-engine").data('spot_html', unescape(song.html));


        if ($("#steem-engine").data('title') == undefined){
          $("#steem-engine").data('title', unescape(song.title));
        }

        // --- Send Post to Steemit --- \\
        serveScampi();

        // --- Add title to DB --- \\
        sendTitle();

        //--- Call Social Maker ---\\
         if (!(socialsSet)){
           console.log('spot made Socials');
          setTimeout(makeSocial, 1000);
          socialsSet = true;
         }



      }).fail(function(error){
          console.log("Spot Embed Failed");

          console.log(error);

        }); // End Spot Call
      } // End If (Spot)




            //--- Add Mood, Genre Info at bottom of song  ---\\
    $("#sameGenre").html(song.genre).attr("style", "color:"+genreColors[song.genre]).attr("value", song.genre).on('click', function()
    {
      Cookies.set('curGenre', song.genre); // Set CooOOOookie
      window.location = location.protocol+'//'+location.host+location.pathname;
    });
    $("#sameMood").html(song.mood).attr("style", "color:"+moodColors[String(song.mood)]).attr("value", song.mood).on('click', function()
    {
      Cookies.set('curMood', song.mood); // Set CooOOOookie
      window.location = location.protocol+'//'+location.host+location.pathname;
    });

    $("#sameFormat").html(song.format).attr("value", song.format).on('click', function()
    {
      Cookies.set('curFormat', song.format); // Set CooOOOookie
      window.location = location.protocol+'//'+location.host+location.pathname;
    });
    $("#showAllSame").on('click', function()
    {
      Cookies.set('curMood', song.mood); // Set CooOOOookie
      Cookies.set('curGenre', song.genre);
      window.location = location.protocol+'//'+location.host+location.pathname;
    });



          //--- Increment Views ---\\
          $.post( "php/views.php", { songid: song.songid } );

          //--- Increment Ups ---\\
          $("#up-button-in, #up-button-out").on('click', function()
          {
            console.log("up click fired");

            $.post( "php/ups.php",
            {
              songid: song.songid
            } )
            .done(function( data )
            {
              data = JSON.parse(data);

              if (data[0] == "success")
              {
                // successful up action
                $("#up-button-in").css("opacity", 1);
                $("#up-button-out").animate({bottom: '4000px'});
                $("chartId"+song.songid+" ")
                Cookies.set('recentUp', '1', { expires: (1/288) });
                steemVote();

              } else if (data[0] == "tooSoon")
              {
                // Alert User this was too soon
              }
              });
          });

      }//END .on(click)

    )
      .addTo(mymap)
      .bindTooltip( song.title, {className: 'marker-tooltip'});



      //--- Trigger a click (on marker) if the URL has an ID in it ---\\
      if(!isNaN($_GET.id) && $_GET.id == marker.options.songid ){
        marker.fire('click');
      }

      $("#chartId"+ marker.options.songid).on('click', function(){
        marker.fire('click');
        if ($(window).width() < 481) {
          $("#charts-jumbo").hide();
        }
      });


  });




}).fail(function(error){
  console.log(error);

});

makeSocial = function(){
  console.log("socials called");
  //--- jsSocials on Jumbo ---\\
  if(!!(document.documentElement.ontouchstart))
  {
    shareOpts = ["twitter", {share: "facebook", label: "Share", logo: "fa fa-facebook"}, "stumbleupon", "messenger", "whatsapp", "telegram"];
  } else
  {
    shareOpts = ["twitter", {share: "facebook", label: "Share", logo: "fa fa-facebook"}, "stumbleupon", "pocket", "telegram"];
  }

  $("#share-music").jsSocials({
    url:shareURL,
    shares: shareOpts,
    showCount: false,
    shareIn: "popup"
  });

  $(".jssocials-share-facebook *").unbind("click").on("click", function(e){
    e.stopPropagation();
    shareOverrideOGMeta(window.location.href, shareTitle, shareDesc, shareThumb);
  });

  socialsSet = false;
}; //END MakeSocial()


upit = function(upData)
{
  console.log("worked UP");
  //--- Check for cookie of most recent vote ---\\

  //--- Increment UPs ---\\
  $.post( "php/ups.php", {
    songid: song.songid,
    success: upit(upData),
    error: function(err)
    {
      console.log(err);
    }
  });
};



// --- Update title in DB --- \\
sendTitle = function(){

  if ($("#steem-engine").data("needsTitle")){

    sendyTitle = $("#steem-engine").data("title");
    sendySongid = $("#steem-engine").data("songid");

  //  console.log(sendySongid); console.log(sendyTitle);
        $.ajax({
        method:"post",
        url:'php/title.php',
        data:{
          songid:sendySongid,
          title:sendyTitle
        },
        dataType:"json"
      }) // END .sumbit()
      .done(
        function (result){
          console.log(result);
        }
      )
      .fail(

      );
  }
};








// --- UP on steemit --- \\
steemVote = function(){

  scapi.me(function (err, res) {
    console.log(res, err);
      if (res)
      {
        var account = res.account;

        $.ajax({
        method:"post",
        url:'php/get_meta.php',
        data:{
          songid:scampiData.songid
        },
        dataType:"json"
      })
      .done(
        function (result){
          account = res.account;

          console.log(result);
          var theSteemer = result[0];
        console.log(theSteemer);

        scapi.vote(account.name, theSteemer.steem_author, theSteemer.permalink, 10000, function (err, res) {
          console.log(err, res);
          if (res)
            {
              console.log("vote was sendy AF");
              $("#alert-holder")
                .prepend('<div id="steem-up-success" class="alert alert-success bottom-alert" role="alert">Your UP was registered on Steemit.</div>');
              $("#steem-up-success").fadeIn(222).delay(6000).fadeOut(222);

            } else if (err)
            {
              $("#alert-holder")
                .prepend('<div id="steem-up-failed" class="alert alert-info bottom-alert" role="alert">Your UP didn\'t work on Steemit. Log out and back in and UP again. Note: there is a 5 min wait before you can UP again. </div>');
              $("#steem-up-failed").fadeIn(222).delay(9000).fadeOut(222);
            }


        });
      }); // END .ajax()
      }
  });

}; //END steemVote





// --- Send Post to Steemit --- \\
serveScampi = function(){
    scampiData = $("#steem-engine").data();
    console.log("serveScampi called");

// --- Code to make reblog instead of Post, commented because reblog not working --- \\
/*
scapi.me(function (err, res) {
  console.log(res, err);
    if (res)
    { // Load info for rest of calls and load info to DOM
      //NEED = Author of Post on SteemIt, PermURL
      // --- Set up calls for Reblogs, posts, etc --- \\

      $.ajax({
      method:"post",
      url:'php/get_meta.php',
      data:{
        songid:scampiData.songid
      },
      dataType:"json"
    }) // END .sumbit()
    .done(
      function (result){
        var account = res.account;

        console.log(result);
        var theSteemer = result[0];

      // --- Activate links in footer of post--- \\
      //checked: "0"​
      //permalink: "handpan-music-with-binaural-beats-for-focus-and-concentration-focus-music-study-music"
      //songid: "282"
      //steem_author: "douglasjames"
      //title:
/*
        if (theSteemer !== undefined){
          console.log("the steemer is defined");
          reblogger = account.name;
          reblogAuthor = theSteemer.steem_author;
          reblogLink = "@"+account.name + "\/" + theSteemer.permalink;

          scapi.reblog(reblogger, reblogAuthor, reblogLink, function (err, res) {
            console.log(err, res)
            if (res)
            {
              console.log("Repost is reposty");
              return;
            } else if (err){

              console.log("Repost Failed");
            }
          });

        }




      }
    )
    .fail(
      function (error){
        console.log(error);
      }
    );








    } else { //END if (res) // notify user not logged in, and set the bottom to login
      var link = scapi.getLoginURL($.param($_GET)); // Change to URL encode
      $("#steemit-login-link").attr("href", link);
    }


});

*/
//--- Check if Steem Posting is Needed & Send that shit ---\\
if (Cookies.get('getItSteemy') !== undefined && parseInt(Cookies.get('getItSteemy')) == scampiData.songid && Cookies.get('steemOptOut')!=='1'){
  console.log("send that shit is ACTIVEEEEE");
  //--- Prepare The Post  ---\\

  scapi.me(function (err, res) {
    console.log(res, err);

    if (res) {
      console.log("res is set");

      account = res.account;
      console.log(scampiData.yt_link);
    //  console.log(scampiData.title);
    //  console.log(truuue.spot);
      author = account.name;
      username = account.name;



      //--- Build the post, ya dig?---\\
      thePost = "# "+scampiData.title+"\n\n";
      thePost += "\n<center>\n";
      if ((scampiData.yt_author_name !== null && scampiData.yt_author_name !== "") || (scampiData.sc_author_name !== null && scampiData.sc_author_name !== "")){
        thePost += "uploaded by ";
        if (scampiData.yt_link !== null && scampiData.yt_link !== "") {
          thePost += "["+ scampiData.yt_author_name+"]("+scampiData.yt_author_url+")";
        }
        if (scampiData.sc_link !== null && scampiData.sc_link !== "") {
          thePost += "["+ scampiData.sc_author_name+"]("+scampiData.sc_author_url+")";
          //--- Add Thumbnail to SC posts without SPOT---\\
          if (scampiData.spot_link == null || scampiData.spot_link == ""){
            thePost += "\n\n[![]("+scampiData.sc_thumbnail_url+")](https://www.soundcloud.com/"+scampiData.sc_link+")\n";
          }

        }
      }
      thePost += "\n### Shared via [music.cxc.world](https://music.cxc.world/?id="+scampiData.songid+"&locLat="+Cookies.get('locLat')+"&locLng="+Cookies.get('locLng')+"&zoom="+Cookies.get('zoom')+")\n\n";


      thePost += "\n</center>\n";
      thePost += "\n<hr>\n";
      if (scampiData.yt_link !== null && scampiData.yt_link !== "") {
        thePost += "https://www.youtube.com/watch?v=" + scampiData.yt_link;
      }
      if (scampiData.sc_link !== null && scampiData.sc_link !== "") {
        thePost += scampiData.sc_html;
      }

      thePost += "\n</center>\n";
      thePost += "\n<center>\n";
      if (scampiData.spot_link !== null && scampiData.spot_link !== "") {
        thePost += "\n[![]("+scampiData.spot_thumbnail_url+")](https://open.spotify.com/track/"+scampiData.spot_link+")";
      }

      thePost += "\n<hr>\n\n";

      thePost += "\n# Song Links\n\n";

      if (scampiData.yt_link !== null && scampiData.yt_link !== "") {
        thePost += "[![](https://cdn.steemitimages.com/DQmcv7LWxNQmDvKnkDcHjFpbghCM4531TMGbULkgARvcoQ2/image.png)](https://www.youtube.com/watch?v="+ scampiData.yt_link+")";
      }
      if (scampiData.sc_link !== null && scampiData.sc_link !== "") {
        thePost += "[![](https://cdn.steemitimages.com/DQmXG6EWf3GUNsLqMoJPcatkTLRXtafcdtxRhQ1YDVypwi1/image.png)](https://www.soundcloud.com/"+scampiData.sc_link+")";
      }
      if (scampiData.spot_link !== null && scampiData.spot_link !== "") {
        thePost += "[![](https://cdn.steemitimages.com/DQmPkmh45x6MJSsJhi5pWA8SQfjhv8m8Y7Q9yNg3oQYfsWi/image.png)](https://open.spotify.com/track/"+scampiData.spot_link+")";
      }

      thePost += "\n<hr>\n";
      thePost += "\n# cXc Music\n\n";

      thePost += "# [music.cxc.world](https://music.cxc.world)\n\n";
      thePost += "## An app by [currentXchange](https://currentxchange.com)\n\n";

      thePost += "<hr>\n\n";
      thePost += "\n[![](https://cdn.steemitimages.com/DQmdiS3m6BiWF8VircEjsbboryHa1aSF1khuwSSiw1dj8pk/cXc-Alpha-App-2[600].png)](https://music.cxc.world)\n\n";

      thePost += "# Be Heard.\n\n";
      thePost += "<hr>\n\n";

      thePost += "\n### [Learn](https://steemit.com/introduceyourself/@currentxchange/introducing-current-x-change-and-purple-smt-prp) [More](https://currentxchange.com/cxc-music) ~ [Post Your Music](https://music.cxc.world/#how-to-post) ~ [View this post on cXc Music](https://music.cxc.world/?id="+scampiData.songid+"&locLat="+Cookies.get('locLat')+"&locLng="+Cookies.get('locLng')+"&zoom="+Cookies.get('zoom')+") \n\n";
      thePost += "\n \n \n <br> \n \nHelp us share more music. [Delegate 1 SP](https://steemconnect.com/sign/delegateVestingShares?delegator=&delegatee=currentxchange&vesting_shares=1%20SP) ~ [12 SP](https://steemconnect.com/sign/delegateVestingShares?delegator=&delegatee=currentxchange&vesting_shares=12%20SP) ~ [144 SP](https://steemconnect.com/sign/delegateVestingShares?delegator=&delegatee=currentxchange&vesting_shares=144%20SP)";
      thePost += "\n <br> \n \nThis post was generated by [music.cxc.world](https://music.cxc.world)";
      thePost += "\n\n</center>";



      //--- Build Tags Array---\\
      var tagsArr = ["cxcmusic"];
      if (scampiData.mood !== null && scampiData.mood !== "") { tagsArr.push(scampiData.mood); }
      if (scampiData.genre !== null && scampiData.genre !== "") { tagsArr.push(scampiData.genre); }
      if (scampiData.format !== null && scampiData.format !== "") { tagsArr.push(scampiData.format); }
      var tagsString = '["';

      tagsString += tagsArr.join("\", \"");
      tagsString += '"]';
      console.log(tagsString);



      title = scampiData.title + " ~ cXc Music";
      body = thePost;
      parentAuthor = '';
      parentPermlink = "music";
      permlink = getSlug(scampiData.title);
    //  jsonMetadata = "{\"tags\": "+tagsString+"}";
      jsonMetadata = {"tags": ["cxcmusic", scampiData.mood, scampiData.genre, scampiData.format]};

    //  jsonMetadata = {\"tags\": []"+

        console.log(jsonMetadata);


      //console.log(parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata);

      console.log(thePost);

      //console.log(parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata);



      scapi.comment(parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function (err, res) {
        console.log(err, res);
        if (res)
        {
          Cookies.remove('getItSteemy'); // Remove the cookie so post is not tried again
          console.log('Toasty Posty. Put that shit in the DB');
          console.log(permlink);
          console.log(author);
          $("#post-to-steem").unbind("click").html('<a target="_blank" class="steem-color" title="Your cXc Music post on Steemit" href="https://steemit.com/@'+author+'\/'+permlink+'">posted</a>');
          $("#alert-holder")
            .prepend('<div id="steem-post-success" class="alert alert-success bottom-alert" role="alert">You posted to Steemit! See it <a class="steem-color" target="_blank" title="Your cXc Music post on Steemit" href="https://steemit.com/@'+author+'\/'+permlink+'">here.</a></div>');
          $("#steem-post-success").fadeIn(222).delay(12000).fadeOut(222);

          // --- Send Post to Steemit --- \\
          $.ajax({
            method:"post",
            url:'php/make_meta.php',
            data:{
              songid:scampiData.songid,
              title:scampiData.title,
              permalink:permlink,
              steem_author:author
            },
            dataType:"json"
          }) // END .sumbit()
          .done()
          .fail();

        } else
        {

          $("#alert-holder")
          .prepend('<div id="steem-post-failed" class="alert alert-info bottom-alert" role="alert">We couldn\'t share this on Steemit. Log in again and click "post to Steemit" on the song. Also, make sure you have enough <a target="_blank" class="steem-color" title="Check your resource credits on Steemd" href="https://steemd.com/@'+author+'">resource credits</a> to post. </div>');
          $("#steem-post-failed").fadeIn(222).delay(6000).fadeOut(222);
        }

      });




    }
    if (err) {
            console.log("err is set");

            //ADD Error Information asking user to login
    }


}); //END scapi.me(function (err, res)
// --- Send Post to Steemit --- \\

}//END if (Cookies.get('getItSteemy')
else {
  console.log("Steem Send should be active but matching SteemItUp cookie missing");
}//END ELSE (Cookies.get('getItSteemy')
}; //END serveScampi()


slugify = function (text) // This is Backup, not currently in use.. OR IS IT?!?!?!?
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};
