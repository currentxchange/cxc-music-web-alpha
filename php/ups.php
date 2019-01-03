<?php
session_start();
//--- Database Connection -- \\
require('connection.php');


$return = [];

if(isset($_SESSION['lastUP']) && $_SESSION['lastUP'] > (time() - 300)){ // Set to 300 for 5 min
    //--- He Wasn't Reaadddyyy --- \\
    array_push($return, "tooSoon");

} else {
  //--- Build UPs Increment query --- \\
  $query = "UPDATE song SET ups = (ups + 1) WHERE songid = ".$_POST['songid'];
  $result = mysqli_query($connection , $query); // --- Query
}

if ($result){
  //--- Update Session with the New Timestamp --- \\
  $_SESSION['lastUP'] = time();
  //$return = "TimeErr";
  array_push($return, "success");

} else {

  array_push($return, "failure");
}
//--- Send Back What Happened --- \\
echo json_encode($return);
// --- FINISH HIM --- \\
mysqli_close($connection);
