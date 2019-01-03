<?php
require "embeds.php";

//--- Database Connection -- \\
require "connection.php";

$postMalone = $_POST; // --- White Iverson

//--- Build Insert query --- \\
if(isset($_POST['username'])){
  $username = $_POST['username'];
} else {
  $username = "1"; // Query users DB where steemname = steemname provided to find this
}
$lat = $postMalone['lat']; // Get this from value passed from click into form
$lng = $postMalone['lng'];
$mood = mysqli_real_escape_string($connection, $postMalone['mood']);
$genre = mysqli_real_escape_string($connection, $postMalone['genre']);
$format = mysqli_real_escape_string($connection, $postMalone['format']);
$sc_link = ($postMalone['sc'] !== "") ? ("'".mysqli_real_escape_string($connection, $postMalone['sc'])."'") : "NULL";
$yt_link = ($postMalone['yt'] !== "") ? ("'".mysqli_real_escape_string($connection, $postMalone['yt'])."'") : "NULL";
$spot_link = ($postMalone['spot'] !== "") ? ("'".mysqli_real_escape_string($connection, $postMalone['spot'])."'") : "NULL";



$legit = true;

//if ($postMalone["yt"]){}

//if($yt_link !== "" && $yt_link !== null && $yt_link !== null){}

/*
if($sc_link !== "" && $spot_link !== null && $spot_link !== null){
  if () == "null"){
    $linkErrors->scInvalid = true;
    $legit = false;
  }
}

if($yt_link !== "" && $yt_link !== null && $yt_link !== null){
  if (file_get_contents("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=" . $yt_link ."&format=json") == null){
    $linkErrors->ytInvalid = true;
    $legit = false;
  }
}
/*
if($spot_link !== "" && $spot_link !== null && $spot_link !== null){
  if () == "null"){
    $linkErrors->spotInvalid = true;
    $legit = false;
  }
}
*/


if ($legit) // URL is legit
{
  $query = "INSERT INTO `song` (`songid`, `created`, `username`, `lat`, `lng`, `mood`, `genre`, `format`, `cxc_views`, `sc_link`, `yt_link`, `spot_link`) VALUES (NULL, CURRENT_TIMESTAMP, '$username', '$lat', '$lng', '$mood', '$genre', '$format', '0', $sc_link, $yt_link, $spot_link);";


  $result = mysqli_query($connection , $query); // --- Query


  // --- Return the JSON by Echoing out the response to the returned JSON file
  if ($result)
  {
  //  echo json_encode(htmlspecialchars($result));
    echo '{"success":true,
      "songid":"'.mysqli_insert_id($connection).'"}';
//echo $query;

  }
  else
  {
    echo '{"success":false}';

    //echo mysqli_error($connection); // Debugging
    //echo $query;

  }
} else { // The URL is not legit
  echo $linkErrors;
}



// --- FINISH HIM --- \\
mysqli_close($connection);
