<?php
require "embeds.php";

//--- Database Connection -- \\
require "connection.php";

$postMalone = $_POST; // --- White Iverson

//--- Build Insert query --- \\

$songid = $postMalone['songid']; // Query users DB where steemname = steemname provided to find this
$title = mysqli_real_escape_string($connection, $postMalone['title']); // Get this from value passed from click into form
$steem_author = mysqli_real_escape_string($connection, $postMalone['steem_author']);
$permalink = mysqli_real_escape_string($connection, $postMalone['permalink']);

$query = "INSERT INTO `song_meta` (`songid`, `title`, `steem_author`, `permalink`) VALUES ('$songid', '$title', '$steem_author', '$permalink');";

$result = mysqli_query($connection , $query); // --- Query


// --- Return the JSON by Echoing out the response to the returned JSON file
if ($result)
{
//  echo json_encode(htmlspecialchars($result));
  echo '{"success":true,"songid":"'.mysqli_insert_id($connection).'"}';
//echo $query;


}
else
{
  echo '{"success":false}';

  //echo mysqli_error($connection);
  //echo $query;

}

// --- FINISH HIM --- \\
mysqli_close($connection);
