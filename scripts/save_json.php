<?php
// Append new form data in json string saved in text file
// From: http://coursesweb.net/php-mysql/

// check if all form data are submited, else output error message
if(isset($_POST['user']) && isset($_POST['splash']) && isset($_POST['qn1']) && isset($_POST['qn2']) && isset($_POST['qn3']) && isset($_POST['qn4']) && isset($_POST['qn5']) && isset($_POST['id'])) {
// if form fields are empty, outputs message, else, gets their data
if(empty($_POST['user']) || empty($_POST['splash']) || empty($_POST['qn1']) || empty($_POST['qn2']) || empty($_POST['qn3']) || empty($_POST['qn4']) || empty($_POST['qn5']) || empty($_POST['id'])) {
    echo 'All fields are required';
  }
  else {
// gets and adds form data into an array
    $formdata = array(
      $_POST['id'],
      array(
        name=> $_POST['user'],
        splash=> $_POST['splash'],
        qn1=> $_POST['qn1'],
        qn2=> $_POST['qn2'],
        qn3=> $_POST['qn3'],
        qn4=> $_POST['qn4'],
        qn5=> $_POST['qn5'],
      )
    );
// path and name of the file
    $filetxt = '../formdata/formdata.txt';
    $arr_data = array();        // to store all form data
// check if the file exists
    if(file_exists($filetxt)) {
   // gets json-data from file
    $jsondata = file_get_contents($filetxt);
   // converts json string into array
    $arr_data = json_decode($jsondata, true);
  }
// appends the array with new form data
    $arr_data[] = $formdata;
    // encodes the array into a string in JSON format (JSON_PRETTY_PRINT - uses whitespace in json-string, for human readable)
    $jsondata = json_encode($formdata, JSON_PRETTY_PRINT);
    // saves the json string in "formdata.txt" (in "dirdata" folder)
    // outputs error message if data cannot be saved
    if(file_put_contents('../formdata/formdata.txt', $jsondata, FILE_APPEND)) echo 'Data successfully saved';
    else echo 'Unable to save data in "../formdata/formdata.txt"';
  }
}
else echo 'Form fields not submitted';
?>
