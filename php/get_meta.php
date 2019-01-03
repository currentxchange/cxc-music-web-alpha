<?php
//header('Content-Type: application/json');
  //echo json_encode($_POST); // Debugging

require "embeds.php";

//--- Database Connection -- \\
require "connection.php";

//--- Build Insert query --- \\
$songid = mysqli_real_escape_string($connection, $_POST['songid']); // Query users DB where steemname = steemname provided to find this
$query = "SELECT * FROM song_meta WHERE songid = $songid";

//--- Execute Query --- \\
$result = mysqli_query($connection , $query); // --- Query


// --- Return the JSON by Echoing out the response to the returned JSON file
if ($result)
{

// Removed because not working on host server
//  echo json_encode($result->fetch_all(MYSQLI_ASSOC));

$results_array = array();

while ($row = $result->fetch_assoc()) {
  array_push($results_array, $row);
}
echo $results_array;


}
else
{
  echo '{"success":false, "query":"'.$query.'"}';
}


// --- FINISH HIM --- \\
mysqli_close($connection);
