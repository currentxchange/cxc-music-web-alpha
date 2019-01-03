<?php
//--- Database Connection -- \\
require('connection.php');


$return = [];

//--- Build Delete query --- \\
$query = "DELETE FROM song WHERE songid = ".$_POST['songid'];
$result = mysqli_query($connection , $query); // --- Query

if ($result){
  array_push($return, "success");
} else {
  array_push($return, "failure");
}

//--- Send Back What Happened --- \\
echo json_encode($return);
// --- FINISH HIM --- \\
mysqli_close($connection);
