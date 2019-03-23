<?php
//--- Database Connection -- \\
require('connection.php');

$getter = $_GET;



//--- To Debug $_Get, Uncomment Next Line
//echo json_encode($getter);

//--- set default values
$query = "SELECT * FROM song ";
$where = 0;
$results_limit = null;
$mood = "";
$genre = "";
$format = "";
$time = null;
$extraAnd = false;

//--- Where Clauses ---\\
//--- Filter Mood. Eventually, check against accepted moods ---\\
if (isset($getter['mood']) && $getter['mood'] !== '' && $getter['mood'] !== 'null')
{
  if (!$where) {$query .= "WHERE "; $where = true;}

    $query .= "mood = '". mysqli_real_escape_string($connection, $getter['mood']) ."' AND ";
    $extraAnd = true;
}

//--- Filter Genre. Eventually, check against accepted genres ---\\
if (isset($getter['genre']) && $getter['genre'] !== '' && $getter['genre'] !== 'null')
{
  if (!$where) {$query .= "WHERE "; $where = true;}

    $query .= "genre = '". mysqli_real_escape_string($connection, $getter['genre']) ."' AND ";
    $extraAnd = true;
}

//--- Filter Format. Eventually, check against accepted formats ---\\
if (isset($getter['format']) && $getter['format'] !== '' && $getter['format'] !== 'null')
{
  if (!$where) {$query .= "WHERE "; $where = true;}

    $query .= "format = '". mysqli_real_escape_string($connection, $getter['format']) ."' AND ";
    $extraAnd = true;
}

//--- Filter Artist ---\\
if ($getter['artist'] !== '' && is_numeric($getter['artist']))
{
  if (!$where) {$query .= "WHERE "; $where = true;}

    $query .= "userid = '". mysqli_real_escape_string($connection, $getter['creator']) ."' AND ";
    $extraAnd = true;
}

//--- Remove Extra And ---\\
if($extraAnd)
{
$query = substr($query, 0, -4);
}

//--- Sort ---\\

if (null !== $getter['sort'])
{
  $query .= "ORDER BY ";

  if ($getter['sort'] == 'newest')
  {
    $query .= "created DESC ";
  }
  else if ($getter['sort'] == 'oldest')
  {
    $query .= "created ASC ";
  }
  else if ($getter['sort'] == 'ups')
  {
    $query .= "ups DESC ";
  }
  else if ($getter['sort'] == 'blueups')
  {
    $query .= "blueups DESC ";
  }
  else if ($getter['sort'] == 'bigups')
  {
    $query .= "bigups DESC ";
  }
} else {
  $query .= "ORDER BY ups DESC ";
}


//--- Limit ---\\&& is_int(number_format($getter['results']))
if (null !== $getter['results'])
{
   $query .= "LIMIT ". mysqli_real_escape_string($connection, $getter['results']);
} else {
  $query .= "LIMIT 33333";
}



$result = mysqli_query($connection , $query);


// --- Return the JSON by Echoing out the response to the returned JSON file
if ($result)
{
// Changed because not working on host server
  //echo json_encode($result->fetch_all(MYSQLI_ASSOC));
  //echo json_encode(mysqli_fetch_array($result, MYSQLI_ASSOC));

  $results_array = array();
  while($row = $result->fetch_assoc()) {
      if ($row !== "")
      {
    $results_array[] = json_encode($row);
      }
  }

  $imploded = implode(",", $results_array);
  if (substr($imploded, -1) == ',') {
     $imploded = substr($imploded, 0, -1);
  }
  echo "[".$imploded."]";

}
else
{
  //echo $query;
    echo mysqli_error($connection);
}

// --- FINISH HIM --- \\
mysqli_close($connection);
?>
