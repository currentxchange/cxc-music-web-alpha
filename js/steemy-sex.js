
    console.log( "ready!" );

  //var sc2 = require('steemconnect');

if(Cookies.get('access_token') !== undefined){
  accessToken = Cookies.get('access_token');
  scampiSauce = true;
  console.log("scampi has sauce");
} else {
  accessToken = 'access_token';
  scampiSauce = false;
  console.log("scampi does not have sauce");
}

//accessToken = Cookies.get('access_token') ? Cookies.get('access_token') : 'access_token';



  scapi = sc2.Initialize({
    app: 'music.cxc.world',
    callbackURL: 'https://music.cxc.world/',
    accessToken: accessToken,
    scope: ['vote', 'comment']
  });






if (!scampiSauce){ // User is not logged in
    // Link to get URL with State
    var link = scapi.getLoginURL($.param($_GET)); // Change to URL encode
    $("#steemit-login-link").on('click', function()
    {
      window.location = link;
    });


} else {
  //--- Add option to ---\\
  $("#add-music-steem-opt").show()
  scapi.setAccessToken(accessToken);
  //--- Change the Label ---\\
  $("#steemit-login-link").html("Logout of Steemit").on('click',
  function (){
    //--- Toss Cookie---\\
    Cookies.remove('access_token');

    scapi.revokeToken(function (err, res) {
      console.log(err, res);
    });

  //--- Reset the Label ---\\
    $("#steemit-login-link").html('Steemit Login').on('click', function()
    {
      //console.log(link);
      var link = scapi.getLoginURL($.param($_GET)); // Change to URL encode
      window.location = link;
    });
  });
} //END if (!scampiSauce)
