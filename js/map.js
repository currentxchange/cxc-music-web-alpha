//--- Locations for First Load ---\\

randLocs = [
  [39.295392, -76.623935],
  [40.644512, -73.978228],
  [40.447804, -79.993547],
  [37.551325, -77.458757],
  [33.743358, -84.383243],
  [25.780996, -80.152670],
  [29.750209, -95.367693],
  [39.732367, -104.971308],
  [45.529642, -122.643912],
  [33.746545, -118.213256],
  [41.848845, -87.671250],
  [42.350274, -71.058768],
  [37.785970, -122.437262],
  [29.926454, -90.098248],
  [43.700432, -79.296242],
  [38.8935128, -77.1546602]
];

  //startGeo = randLocs[Math.floor(Math.random() * randLocs.length)]; // Change back to this when populated
  //http://localhost:8888/cxc/?locLat=38.90813299596705&locLng=-96.37207031250001&zoom=5
  startGeo = [38.90813299596705, -96.37207031250001];



// --- How would you like that map, sir? --- \\
if (typeof Cookies.get('mapStyle') === 'string' || Cookies.get('mapStyle') instanceof String) {
  mapStyle = Cookies.get('mapStyle');
} else {
  mapStyle = 'Watercolor';
}

var southWest = L.latLng(-90, -180);
var northEast = L.latLng(90, 180);


// --- Make a Map --- \\

  mymap = L.map('map', {
    center: startGeo,
    zoom: 5, //13
    minZoom:2,
    doubleClickZoom: false,
    zoomControl: false,
    preferCanvas:true,
    maxBounds: L.latLngBounds(southWest, northEast),
    maxBoundsViscosity: 0.0
  });
  L.tileLayer.provider('Stamen.' + mapStyle).addTo(mymap);


//--- Hide the Jumbos when Xed ---\\

$("#close-jumbo").click(function() {
  $("#active-music-jumbo").hide();
  delete urlGet.id;
  history.pushState(null, '', (location.protocol + '//' + location.host + location.pathname + "?" + $.param(urlGet)));
  //--- Reset Meta ---\\
  $("meta[property='og:image'], meta[name='twitter:image:src'], meta[name='twitter:image']").attr('content', 'images/cXc-Alpha-App-1[600].png');
  $("meta[name='description'], meta[property='og:description'], meta[name='twitter:description']").attr('content', 'Find underground music from around the world on the cXc Music Mapp (Alpha)');
  $("meta[property='og:title'], meta[name='twitter:title']").attr('content', 'cXc Music Mapp (Alpha)');
  $("#selectors-holder").show();
  $("#bottom-menus").show();

});

$("#close-add-music").click(function() {
  $("#slide-left").hide();
  $("#selectors-holder").show();
  $("#bottom-menus").show();
});

$("#close-charts").click(function() {
  $("#charts-jumbo").hide();
  $("#selectors-holder").show();
  $("#bottom-menus").show();
});


/* mymap.on('click', function(e){
  $("#active-music-jumbo").hide()
}) */

//--- Show the Charts when Return Button Clicked ---\\

$("#chart-return-button").click(function() {
  $("#charts-jumbo").show();
  $("#slide-left").hide();
  $("#active-music-jumbo").hide();
});

$("#active-music-return-button").click(function() {
  $("#charts-jumbo").hide();
  $("#slide-left").hide();
  $("#active-music-jumbo").show();
});



cxcCircleMarker = L.CircleMarker.extend({
  options: {
    songid: null,
    genre: null,
    mood: null,
    format: null,
    title: null
  }
});


// --- Add Music Icon --- \\
addMusicIcon = L.icon({
  iconUrl: "images/add-music.png",
  iconSize: [50, 50],
  iconAnchor: [15, 10]
});

// --- Add Music Dialogue --- \\
mymap.on('dblclick', function(e) {

  if (typeof addMusicMarker !== 'undefined') { // Remove Previous Marker & Stored location
    addMusicMarker.remove();
  }

  addMusicMarker = L.marker([e.latlng['lat'], e.latlng['lng']], {
    icon: addMusicIcon,
    riseOnHover: true
  });

  addMusicMarker.addTo(mymap).on("click", function(e) {
    mymap.setView([e.latlng.lat, e.latlng.lng]);
    $("#selectors-holder, #genre-selector-ul,  #mood-selector-ul, #format-selector-ul").hide();
    $("#add-music-error").hide();
    $("#add-music-success").hide();
    $("input#location").remove();
    $("#slide-left").show();
    $("#submit-music").append('<input id="location" valueLat="' + e.latlng.lat + '" valueLng="' + e.latlng.lng + '"  style="display:none"></input>').show();
  });
});

mymap.on('click', function(e) {
  if (typeof addMusicMarker !== 'undefined') { // Remove Previous Marker & Stored location
    addMusicMarker.remove();
  }
});


//--- Make all links open in a new tab NOT WORKING ---\\
$('a[href^="http://"], a[href^="https://"]')
  .not('[target="_blank"]')
  .attr('target', '_blank');

myLocation = function() {
  mymap.locate({setView: true, maxZoom: 14});
};

mymap.on('zoomend', function() {
     makeLocCookieFull();
 });

 mymap.on('dragend', function() {
   makeLocCookieFull();
 });

makeLocCookieFull = function()
{
  var latlng = mymap.getCenter();
  var zoom = mymap.getZoom();
  Cookies.set('locLat', latlng.lat);
  Cookies.set('locLng', latlng.lng);
  Cookies.set('zoom', zoom);

  //--- Add params to URL  ---\\
  $_GET.locLat = latlng.lat;
  $_GET.locLng = latlng.lng;
  $_GET.zoom = zoom;

  if (Object.keys($_GET).length > 1){
    //--- Delete Bad Keys ---\\
    $.each( $_GET, function( key, value ) {
      urlGet = $_GET;
      if (value == undefined || value == "undefined" || value == "null" || value == null)
      {
        delete urlGet[key];
      }
      console.log($.param(urlGet));
      history.pushState(null, '', (location.protocol+'//'+location.host+location.pathname + "?" + $.param(urlGet) ));
    });
  }

}


// --- COOKIE ALERT!!! ---\\
if (Cookies.get('dunToldYa') == undefined)
{
  $("#alert-holder")
  .append('<div id="cookie-warn" class="alert alert-dark bottom-alert" role="alert">You like cookies? We do. By clicking anywhere on this site, you agree to our <a href="https://currentxchange.com/cookie-policy/" target="_blank" class="alert-link">cookie policy.</a> Also check out our <a href="https://currentxchange.com/privacy-policy/" target="_blank" class="alert-link">privacy policy</a>. Click this message to dismiss it for good!</div>');
  $("#cookie-warn").fadeIn(222);
}


$("#cookie-warn").click(function(event){
    $("#cookie-warn").fadeOut(222);

    Cookies.set('dunToldYa', 1,
      {
        expires: 999999
      });
    event.stopPropagation();
  });

$("#cookie-warn a").click(function(event){
    event.stopPropagation();
  });


// --- Kickstarter Alert ---\\

  date1 = new Date ( 2019, 2, 20 );
  curDate = new Date();

  if ((Cookies.get('dunToldYa') !== undefined) && Cookies.get('canWeKickIt') == undefined && (curDate <  date1) )
  {
    $("#alert-holder")
    .append('<div id="kick-notice" class="alert alert-success bottom-alert" role="alert">You may notice some <a href="https://currentxchange.com/cxc-music" target="_blank" class="alert-link">features</a> are missing, like playlists, top charts, and Purple. Help fund our vision by supporting our <a href="https://www.kickstarter.com/projects/currentxchange/cxc-music-a-global-map-of-local-music" target="_blank" class="alert-link">kickstarter</a> and see these features very soon! Click this message to dismiss it for good!</div>');
    $("#kick-notice").fadeIn(222);
  }


  $("#kick-notice").click(function(event){
      $("#kick-notice").fadeOut(222);

      Cookies.set('canWeKickIt', 1,
        {
          expires: 999999
        });
      event.stopPropagation();
    });

  $("#kick-notice a").click(function(event){
      event.stopPropagation();
    });



$("div.selected").ready(function() {
  $("div.selected").removeClass("highlight");
});




// === Responsive === \\
$(window).bind("resize", function () {
    console.log($(this).width())
    fontSizeToggler();
    if ($(this).width() < 481) {

        $('#active-music-jumbo, #slide-left, #charts-jumbo').addClass('container-fluid')
        $('iframe').attr('width', '100%') //.addClass('row')

        // --- Active Music Return --- \\
        if($("#title-jumbo").text() == "Loading..."){
          $("#active-music-return-button").hide();
        } else {
          $("#active-music-return-button").show();
        }
      //  $('.ytvid iframe').attr('height', '100%')
    } else if ($(this).width() > 480) {
      //$('#active-music-jumbo, #slide-left, #charts-jumbo').removeClass('container-fluid')
    }
}).trigger('resize');




// --- Fonts in Charts --- \\

function fontSizeToggler()
{
  if ($( "#charts-jumbo" ).width() < 300)
  {
    console.log("less than fired");
    $('h2.chart-title').css("font-size","1em")
  } else {
        console.log("greater than fired");
    $('h2.chart-title').css("font-size","2em")
  }
}
