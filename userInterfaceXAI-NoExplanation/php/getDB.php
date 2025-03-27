<?php
    #CONNECT TO AND SELECT DB
    function getDatabaseHandle($pathAdj) {
        // Add in the path adjustment to account for variable file locations/depths in the tree
        $dbh = new PDO("sqlite:" . $pathAdj . "AVStudyNoExp.db");
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }
?>
