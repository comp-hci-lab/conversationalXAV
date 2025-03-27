<?php
    #CONNECT TO AND SELECT DB
    function getDatabaseHandle($pathAdj) {
        // Add in the path adjustment to account for variable file locations/depths in the tree
        //AVStudy.db
        $dbh = new PDO("sqlite:" . $pathAdj . "AVStudy.db");
        //$dbh = new PDO("sqlite:" . $pathAdj . "scatola.sqlite3");
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }
?>
