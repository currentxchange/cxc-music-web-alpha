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

  $.ajaxSetup({ cache: true });


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
  if(!$("#slide-left").is(":visible")){
    $("#selectors-holder").show();
  }
  $("#bottom-menus").show();

  $("#currency-wrapper").removeClass("open-music-desk");

});

$("#close-add-music").click(function() {
  $("#slide-left").hide();
  $("#selectors-holder").show();
  $("#bottom-menus").show();

});

$("#close-charts").click(function() {
  $("#charts-jumbo").hide();
  if(!$("#slide-left").is(":visible")){
    $("#selectors-holder").show();
  }
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
    $("#selectors-holder").hide();
    $("#submit-music").append('<input id="location" valueLat="' + e.latlng.lat + '" valueLng="' + e.latlng.lng + '"  style="display:none"></input>').show();
  });
});

mymap.on('click', function(event) {
  if (typeof addMusicMarker !== 'undefined') { // Remove Previous Marker & Stored location
    addMusicMarker.remove();
  }

  $("#genre-selector-ul,  #mood-selector-ul, #format-selector-ul, .alert-dismissible, #settings-menus").hide();

  if($("#cookie-warn:visible").length != 0){
    $("#cookie-warn").fadeOut(222);
    Cookies.set('dunToldYa', 1,
      {
        expires: 9999
      });
    event.stopPropagation();
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

      history.pushState(null, '', (location.protocol+'//'+location.host+location.pathname + "?" + $.param(urlGet) ));
    });
  }

};


// --- COOKIE ALERT!!! ---\\
if (Cookies.get('dunToldYa') == undefined)
{
  let velcomMessage = '<div id="cookie-warn" class="alert alert-light bottom-alert" role="alert">';
  velcomMessage += "<h1>Welcome to cXc Music ðŸ—ºï¸
