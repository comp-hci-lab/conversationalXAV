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
$NASA_TLX         = $_REQUEST['NASA_TLX'];  
$NASA_weights     = $_REQUEST['NASA_weights'];
$literacy_q1     = $_REQUEST['literacy_q1'];
$literacy_q2     = $_REQUEST['literacy_q2'];
$literacy_q3     = $_REQUEST['literacy_q3'];
$literacy_q4     = $_REQUEST['literacy_q4'];
$literacy_q5     = $_REQUEST['literacy_q5'];
$literacy_q6     = $_REQUEST['literacy_q6'];
$literacy_q7     = $_REQUEST['literacy_q7'];
$literacy_q8     = $_REQUEST['literacy_q8'];
$literacy_q9     = $_REQUEST['literacy_q9'];
$literacy_q10     = $_REQUEST['literacy_q10'];
$literacy_q11     = $_REQUEST['literacy_q11'];
$literacy_q12     = $_REQUEST['literacy_q12'];
$literacy_q13     = $_REQUEST['literacy_q13'];
$literacy_q14     = $_REQUEST['literacy_q14'];
$literacy_q15     = $_REQUEST['literacy_q15'];
$literacy_q16     = $_REQUEST['literacy_q16'];
$literacy_q17     = $_REQUEST['literacy_q17'];
$literacy_q18     = $_REQUEST['literacy_q18'];
$literacy_q19     = $_REQUEST['literacy_q19'];
$literacy_q20     = $_REQUEST['literacy_q20'];
$literacy_q21     = $_REQUEST['literacy_q21'];
$literacy_q22     = $_REQUEST['literacy_q22'];
$literacy_q23     = $_REQUEST['literacy_q23'];
$literacy_q24     = $_REQUEST['literacy_q24'];
$literacy_q25    = $_REQUEST['literacy_q25'];
$literacy_q26    = $_REQUEST['literacy_q26'];




if (!isset($workerId)) {
    // Fail
    exit();
}

// Connect to the local SQLite3 DB
include "getDB.php";


// Get the DB handle
try {
    $dbh = getDatabaseHandle('/Applications/XAMPP/xamppfiles/htdocs/userInterfaceXAI-GPT3/db/');
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
                    ':lOr' =>$leftOrRight,
                    ':nasa'=>implode('-', $NASA_TLX),
                    ':nasaWeights'=>implode('-', $NASA_weights),
                    ':lit_1' =>$literacy_q1,
                    ':lit_2' =>$literacy_q2,
                    ':lit_3' =>implode('-', $literacy_q3),
                    ':lit_4' =>$literacy_q4,
                    ':lit_5' =>$literacy_q5,
                    ':lit_6' =>$literacy_q6,
                    ':lit_7' =>$literacy_q7,
                    ':lit_8' =>$literacy_q8,
                    ':lit_9' =>$literacy_q9,
                    ':lit_10' =>$literacy_q10,
                    ':lit_11' =>$literacy_q11,
                    ':lit_12' =>$literacy_q12,
                    ':lit_13' =>$literacy_q13,
                    ':lit_14' =>$literacy_q14,
                    ':lit_15' =>$literacy_q15,
                    ':lit_16' =>$literacy_q16,
                    ':lit_17' =>implode('-', $literacy_q17),
                    ':lit_18' =>implode('-', $literacy_q18),
                    ':lit_19' =>$literacy_q19,
                    ':lit_20' =>$literacy_q20,
                    ':lit_21' =>$literacy_q21,
                    ':lit_22' =>$literacy_q22,
                    ':lit_23' =>$literacy_q23,
                    ':lit_24' =>$literacy_q24,
                    ':lit_25' =>implode('-', $literacy_q25),
                    ':lit_26' =>$literacy_q26,

                   );

      print_r($data);
      $qryStr = "INSERT INTO survey_data (workerId, event_id,driverLicense,driverLicenseAge,country, genderMMText, workerAge, workerRace, workerfeedback, workerEtnicity, workerGender, leftOrRight, NASATLX, NASAWeights, literacy_q1, literacy_q2, literacy_q3, literacy_q4, literacy_q5, literacy_q6, literacy_q7, literacy_q8, literacy_q9, literacy_q10, literacy_q11, literacy_q12, literacy_q13, literacy_q14, literacy_q15, literacy_q16, literacy_q17, literacy_q18, literacy_q19, literacy_q20, literacy_q21, literacy_q22, literacy_q23, literacy_q24, literacy_q25, literacy_q26)
                  VALUES (:workerId, :event_id, :userDriverLicense,:userDriverLicenseAge,:country,:gendertext, :wAg, :wRc, :wFbc, :wEtn, :wGdr, :lOr, :nasa, :nasaWeights, :lit_1, :lit_2, :lit_3, :lit_4, :lit_5, :lit_6, :lit_7, :lit_8, :lit_9, :lit_10, :lit_11, :lit_12, :lit_13, :lit_14, :lit_15, :lit_16, :lit_17, :lit_18, :lit_19, :lit_20, :lit_21, :lit_22, :lit_23, :lit_24, :lit_25, :lit_26)";
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

