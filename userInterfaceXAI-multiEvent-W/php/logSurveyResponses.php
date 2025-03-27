<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Read the vars passed in by the browser
$workerId         = $_REQUEST['workerId'];
$event_id     = $_REQUEST['event_id'];
$driverLicense     = $_REQUEST['driverLicense'];
$driverLicenseAge = $_REQUEST['driverLicenseAge'];
$country          = $_REQUEST['country'];
$genderMMText     = $_REQUEST['genderMMText'];
$workerAge        = $_REQUEST['workerAge'];
$workerRace       = $_REQUEST['workerRace'];
$workerFeedback   = $_REQUEST['workerFeedback'];
$workerEtnicity   = $_REQUEST['workerEtnicity'];
$workerGender     = $_REQUEST['workerGender']; 
$leftOrRight      = $_REQUEST['leftOrRight'];  

if (!isset($workerId)) {
    // Fail
    exit();
}

// Connect to the local SQLite3 DB
include "getDB.php";


// Get the DB handle
try {
    $dbh = getDatabaseHandle('../db/');
} catch(PDOException $e) {
    echo $e->getMessage();
}
//print_r("survey_obj", survey_obj);
//print_r("array_merge", array_merge(...$survey_obj));
//print_r("implode", implode($survey_obj, ','));

// If the DB handle is valid, log the response
if ($dbh){
      // Use PDO to normalize DB access and ensure sanitary queries (via prepare/execute)
      $data = array(':workerId'=>$workerId,
                    ':event_id'=>$event_id,
                    ':userDriverLicense'=>$driverLicense,
                    ':userDriverLicenseAge'=>$driverLicenseAge,
                    ':country'=>$country,
                    ':gendertext'=>$genderMMText,
                    ':wAg'=>$workerAge,
                    ':wRc'=>$workerRace,
                    ':wFbc'=>$workerFeedback,
                    ':wEtn'=>$workerEtnicity,
                    ':wGdr'=>$workerGender,
                    ':lOr' =>$leftOrRight
                   );

      print_r($data);
      $qryStr = "INSERT INTO SurveyXAII (workerId, event_id,driverLicense,driverLicenseAge,country, genderMMText, workerAge, workerRace, workerfeedback, workerEtnicity, workerGender, leftOrRight)
                  VALUES (:workerId, :event_id, :userDriverLicense,:userDriverLicenseAge,:country,:gendertext, :wAg, :wRc, :wFbc, :wEtn, :wGdr, :lOr)";
      print_r("yes");
      $sth = $dbh->prepare($qryStr);
      print_r("yes2");
      $sth->execute($data);
    // Return a success signal to the browser
    return 0;
} else {
    echo "Invalid DB handle!";
}

?>

