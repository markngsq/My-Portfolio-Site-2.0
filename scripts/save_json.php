<?php
// Saving data from form in text file in JSON format
// From: http://coursesweb.net/php-mysql/

// check if all form data are submited, else output error message
if(isset($_POST['user']) && isset($_POST['splash']) && isset($_POST['qn1']) && isset($_POST['qn2']) && isset($_POST['qn3']) && isset($_POST['qn4']) && isset($_POST['qn5'])) {
  // if form fields are empty, outputs message, else, gets their data
  if(empty($_POST['user']) || empty($_POST['splash']) || empty($_POST['qn1']) || empty($_POST['qn2']) || empty($_POST['qn3']) || empty($_POST['qn4']) || empty($_POST['qn5'])) {
    echo 'All fields are required';
  }
  else {
    // adds form data into an array
    $formdata = array(
      name=> $_POST['user'],
      splash=> $_POST['splash'],
      qn1=> $_POST['qn1'],
      qn2=> $_POST['qn2'],
      qn3=> $_POST['qn3'],
      qn4=> $_POST['qn4'],
      qn5=> $_POST['qn5']
    );

    // encodes the array into a string in JSON format (JSON_PRETTY_PRINT - uses whitespace in json-string, for human readable)
    $jsondata = json_encode($formdata, JSON_PRETTY_PRINT);

    // saves the json string in "formdata.txt" (in "dirdata" folder)
    // outputs error message if data cannot be saved
    if(file_put_contents('dirdata/formdata.txt', $jsondata)) echo 'Data successfully saved';
    else echo 'Unable to save data in "dirdata/formdata.txt"';
  }
}
else echo 'Form fields not submited';
?>
