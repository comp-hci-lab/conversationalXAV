<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Read the vars passed in by the browser
$workerId         = $_REQUEST['workerId'];
$event_id         = $_REQUEST['event_id']; 
$idx              = $_REQUEST['idx'];   
$file_name_to_be_processed = $_REQUEST['file_name_to_be_processed'];   
$eventTypeText    = $_REQUEST['eventTypeText'];   
$eventTypeTextAfter = $_REQUEST['eventTypeTextAfter']; 
$userEventCategory = $_REQUEST['userEventCategory']; 
$userEventCategoryAfter = $_REQUEST['userEventCategoryAfter'];
$realEventCategory = $_REQUEST['realEventCategory'];
$eventDescription  = $_REQUEST['eventDescription'];
$userObservationValidation = $_REQUEST['userObservationValidation'];
$userObservationValidationAfter = $_REQUEST['userObservationValidationAfter'];
$userVehicleChat = $_REQUEST['userVehicleChat'];
$vid_name = $_REQUEST['vid_name'];

if (!isset($workerId) || !isset($event_id) || !isset($file_name_to_be_processed) || !isset($userEventCategory)) {
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

//echo "workerId Is data type - ".gettype(intval($workerId));

//echo "session Is data type - ".gettype(intval($session));

//echo "event_id Is data type - ".gettype(intval($event_id));

//echo "idx Is data type - ".gettype(intval($idx));
//echo "implode(userObser)".gettype(implode($userObservationValidation,'-'));
//echo "implode(chat)".gettype(implode($userVehicleChat,'-'));


// If the DB handle is valid, log the response
if ($dbh){
    // For each user response...
    // Use PDO to normalize DB access and ensure sanitary queries (via prepare/execute)
    $data = array(':workerId'=>$workerId,
                    ':event_id' => $event_id,
                    ':idx'=>$idx,
                    ':file_name_to_be_processed'=>$file_name_to_be_processed,
                    ':eventTypeText'=>$eventTypeText,
                    ':eventTypeTextAfter'=>$eventTypeTextAfter,
                    ':userEventCategory'=>$userEventCategory,
                    ':userEventCategoryAfter'=>$userEventCategoryAfter,
                    ':realEventCategory'=>$realEventCategory,
                    ':eventDescription'=>$eventDescription,
                    ':userObservationValidation'=>implode($userObservationValidation,'-'),
                    ':userObservationValidationAfter'=>implode($userObservationValidationAfter,'-'),
                    ':userVehicleChat'=>implode($userVehicleChat,'-'),
                    ':vid_name'=>$vid_name
                    );
    //print_r($data);
    //echo "that was the data";

    

    $qryStr = "INSERT INTO responsesXAIV (workerId, event_id, idx, file_name_to_be_processed, eventTypeText, eventTypeTextAfter, userEventCategory, userEventCategoryAfter, realEventCategory, eventDescription, userObservationValidation, userObservationValidationAfter, userVehicleChat, vid_name) VALUES
     (:workerId, :event_id, :idx, :file_name_to_be_processed,:eventTypeText,:eventTypeTextAfter,:userEventCategory,:userEventCategoryAfter,:realEventCategory,:eventDescription,:userObservationValidation,:userObservationValidationAfter,:userVehicleChat,:vid_name)";
    //echo "this line is fine";
    $sth = $dbh->prepare($qryStr);
    //echo "we are at this line";
    $sth->execute($data);
    //echo "alll set";
    

    // Return a success signal to the browser
    return 0;
} else {
    echo "Invalid DB handle!";
}

?>
