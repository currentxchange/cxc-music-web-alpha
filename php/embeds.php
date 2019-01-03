<?php

$postMalone = $_GET;



//--- Check for the info, call needed functions
if (null !== $postMalone['yt']){
  ytEmbed($postMalone['yt']);
}

if (null !== $postMalone['sc']){
  scEmbed($postMalone['sc']);
}

if (null !== $postMalone['spot']){
  spotEmbed($postMalone['spot']);
}

//echo $postMalone;
//xecho implode(" ", $postMalone);


//===  Schemas For Reference  ===\\

//--- Embed Spotify Song ---\\
//https://embed.spotify.com/oembed/?url=https://open.spotify.com/track/2qToAcex0ruZfbEbAy9OhW&format=json
//--- Artist ---\\
//https://embed.spotify.com/oembed/?url=spotify%3Aartist:7ae4vgLLhir2MCjyhgbGOQ&format=json


//--- Embed Youtube Video ---\\
//https://www.youtube.com/oembed?url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DiwGFalTRHDA&format=json
//https://www.youtube.com/oembed?url=format=json

//--- Embed Soundcloud Song ---\\
//https://soundcloud.com/oembed?url=https%3A%2F%2Fsoundcloud.com%2Fforss%2Fflickermood&format=json


$GLOBALS['first'] = true;



//===  FUNCTIONS  ==\\
//--  Youtube  --\\
function ytEmbed ($videoid){
  //--- JSON Song Info from oEmbed ---\\
  $url = "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=" . $videoid ."&format=json";
  $yt_worked = file_get_contents($url);
  echo $yt_worked;
};



//------  Soundcloud  ------\\
function scEmbed ($scid){
  //--- JSON Song Info from oEmbed ---\\
  $url = "https://www.soundcloud.com/oembed?url=https://soundcloud.com/" . $scid ."&format=json";
  //$sc_worked = stripcslashes(file_get_contents($url));
  $sc_worked = file_get_contents($url);
  echo $sc_worked;
};

//--  Spotify  --\\
function spotEmbed ($spotid){
  //--- JSON Song Info from oEmbed ---\\%3A%2F%2Fspeakerdeck.com%2Fwallat%2Fwhy-backbone
  $url = 'https://embed.spotify.com/oembed/?url=https%3A%2F%2Fopen.spotify.com%2Ftrack%2F' . $spotid;
  //  echo stripcslashes(file_get_contents($url));
  echo file_get_contents($url);
};
