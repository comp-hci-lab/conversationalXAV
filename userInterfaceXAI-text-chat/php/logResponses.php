<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Read the vars passed in by the browser
              

$workerId         = $_REQUEST['workerId'];
$event_id         = $_REQUEST['event_id']; 
$idx              = $_REQUEST['idx'];   
$file_name_to_be_processed = $_REQUEST['file_name_to_be_processed'];   
$q1_correct    = $_REQUEST['q1_correct']; 
$q1_user    = $_REQUEST['q1_user'];  

$q2_correct    = $_REQUEST['q2_correct']; 
$q2_user    = $_REQUEST['q2_user']; 

$q3_correct    = $_REQUEST['q3_correct']; 
$q3_user    = $_REQUEST['q3_user']; 

$q4_correct    = $_REQUEST['q4_correct']; 
$q4_user    = $_REQUEST['q4_user']; 

$q5_correct    = $_REQUEST['q5_correct']; 
$q5_user    = $_REQUEST['q5_user']; 

$q6_correct    = $_REQUEST['q6_correct']; 
$q6_user    = $_REQUEST['q6_user']; 

$q7_correct    = $_REQUEST['q7_correct']; 
$q7_user    = $_REQUEST['q7_user']; 

$q8_correct    = $_REQUEST['q8_correct']; 
$q8_user    = $_REQUEST['q8_user']; 

$q9_correct    = $_REQUEST['q9_correct']; 
$q9_user    = $_REQUEST['q9_user']; 

$q10_correct    = $_REQUEST['q10_correct']; 
$q10_user    = $_REQUEST['q10_user']; 

$q11_correct    = $_REQUEST['q11_correct']; 
$q11_user    = $_REQUEST['q11_user']; 

$q12_correct    = $_REQUEST['q12_correct']; 
$q12_user    = $_REQUEST['q12_user']; 

$q13_correct    = $_REQUEST['q13_correct']; 
$q13_user    = $_REQUEST['q13_user']; 

$q14_correct    = $_REQUEST['q14_correct']; 
$q14_user    = $_REQUEST['q14_user']; 

$q15_correct    = $_REQUEST['q15_correct']; 
$q15_user    = $_REQUEST['q15_user']; 

$q16_correct    = $_REQUEST['q16_correct']; 
$q16_user    = $_REQUEST['q16_user']; 

$q17_correct    = $_REQUEST['q17_correct']; 
$q17_user    = $_REQUEST['q17_user']; 

$q18_correct    = $_REQUEST['q18_correct']; 
$q18_user    = $_REQUEST['q18_user']; 

$q19_correct    = $_REQUEST['q19_correct']; 
$q19_user    = $_REQUEST['q19_user']; 

$q20_correct    = $_REQUEST['q20_correct']; 
$q20_user    = $_REQUEST['q20_user']; 

$q21_correct    = $_REQUEST['q21_correct']; 
$q21_user    = $_REQUEST['q21_user']; 

$q22_correct    = $_REQUEST['q22_correct']; 
$q22_user    = $_REQUEST['q22_user']; 

$q23_correct    = $_REQUEST['q23_correct']; 
$q23_user    = $_REQUEST['q23_user']; 

$q24_correct    = $_REQUEST['q24_correct']; 
$q24_user    = $_REQUEST['q24_user']; 

$userVehicleChat = $_REQUEST['userVehicleChat'];
$vid_name = $_REQUEST['vid_name'];
$prompt_info = $_REQUEST['prompt_info'];

if (!isset($workerId) || !isset($event_id) || !isset($file_name_to_be_processed)) {
    // Fail
    exit();
}
//echo $userVehicleChat;
echo "implode(chat)".gettype(implode('-', $userVehicleChat));

// Connect to the local SQLite3 DB
include "getDB.php";


// Get the DB handle
try {
    $dbh = getDatabaseHandle('/Applications/XAMPP/xamppfiles/htdocs/userInterfaceXAI-text-chat/db/');
} catch(PDOException $e) {
    echo $e->getMessage();
}

//echo "workerId Is data type - ".gettype(intval($workerId));

//echo "session Is data type - ".gettype(intval($session));

//echo "event_id Is data type - ".gettype(intval($event_id));

//echo "idx Is data type - ".gettype(intval($idx));
//echo "implode(userObser)".gettype(implode($userObservationValidation,'-'));
echo "implode(chat)".gettype(implode('-', $userVehicleChat));


// If the DB handle is valid, log the response
if ($dbh){
    // For each user response...
    // Use PDO to normalize DB access and ensure sanitary queries (via prepare/execute)
    $data = array(':workerId'=>$workerId,
                    ':event_id' => $event_id,
                    ':idx'=>$idx,
                    ':file_name_to_be_processed'=>$file_name_to_be_processed,
                    ':userVehicleChat'=>implode('-', $userVehicleChat),
                    ':vid_name'=>$vid_name,
                    ':q1_correct'=>$q1_correct,
                    ':q1_user'=>$q1_user,
                    ':q2_user'=>$q2_user,
                    ':q2_correct'=>$q2_correct,
                    ':q3_user'=>$q3_user,
                    ':q3_correct'=>$q3_correct,
                    ':q4_user'=>$q4_user,
                    ':q4_correct'=>$q4_correct,
                    ':q5_user'=>$q5_user,
                    ':q5_correct'=>$q5_correct,
                    ':q6_user'=>$q6_user,
                    ':q6_correct'=>$q6_correct,
                    ':q7_user'=>$q7_user,
                    ':q7_correct'=>$q7_correct,
                    ':q8_user'=>$q8_user,
                    ':q8_correct'=>$q8_correct,
                    ':q9_user'=>$q9_user,
                    ':q9_correct'=>$q9_correct,
                    ':q10_user'=>$q10_user,
                    ':q10_correct'=>$q10_correct,
                    ':q11_user'=>$q11_user,
                    ':q11_correct'=>$q11_correct,
                    ':q12_user'=>$q12_user,
                    ':q12_correct'=>$q12_correct,
                    ':q13_user'=>$q13_user,
                    ':q13_correct'=>$q13_correct,
                    ':q14_user'=>$q14_user,
                    ':q14_correct'=>$q14_correct,
                    ':q15_user'=>$q15_user,
                    ':q15_correct'=>$q15_correct,
                    ':q16_user'=>$q16_user,
                    ':q16_correct'=>$q16_correct,
                    ':q17_user'=>$q17_user,
                    ':q17_correct'=>$q17_correct,
                    ':q18_user'=>$q18_user,
                    ':q18_correct'=>$q18_correct,
                    ':q19_user'=>$q19_user,
                    ':q19_correct'=>$q19_correct,
                    ':q20_user'=>$q20_user,
                    ':q20_correct'=>$q20_correct,
                    ':q21_user'=>$q21_user,
                    ':q21_correct'=>$q21_correct,
                    ':q22_user'=>$q22_user,
                    ':q22_correct'=>$q22_correct,
                    ':q23_user'=>$q23_user,
                    ':q23_correct'=>$q23_correct,
                    ':q24_user'=>$q24_user,
                    ':q24_correct'=>$q24_correct,
                    ':prompt_info'=>$prompt_info,
                    
                    );
    //print_r($data);
    //echo "that was the data";

    

    $qryStr = "INSERT INTO userData (workerId, event_id, idx, file_name_to_be_processed, userVehicleChat, vid_name, q1_correct, q1_user, q2_correct, q2_user, q3_correct, q3_user, q4_correct, q4_user, q5_correct, q5_user,q6_correct, q6_user,q7_correct, q7_user,q8_correct, q8_user,q9_correct, q9_user,q10_correct, q10_user,q11_correct, q11_user,q12_correct, q12_user,q13_correct, q13_user,q14_correct, q14_user,q15_correct, q15_user,q16_correct, q16_user,q17_correct, q17_user,q18_correct, q18_user,q19_correct, q19_user,q20_correct, q20_user ,q21_correct, q21_user,q22_correct, q22_user ,q23_correct, q23_user,q24_correct, q24_user, explanation) VALUES
     (:workerId, :event_id, :idx, :file_name_to_be_processed,:userVehicleChat,:vid_name, :q1_correct, :q1_user, :q2_correct, :q2_user, :q3_correct, :q3_user, :q4_correct, :q4_user, :q5_correct, :q5_user, :q6_correct, :q6_user,:q7_correct, :q7_user,:q8_correct, :q8_user,:q9_correct, :q9_user,:q10_correct, :q10_user,:q11_correct, :q11_user,:q12_correct, :q12_user,:q13_correct, :q13_user,:q14_correct, :q14_user,:q15_correct, :q15_user,:q16_correct, :q16_user,:q17_correct, :q17_user,:q18_correct, :q18_user,:q19_correct, :q19_user,:q20_correct, :q20_user ,:q21_correct, :q21_user,:q22_correct, :q22_user, :q23_correct, :q23_user,:q24_correct, :q24_user, :prompt_info)";
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
