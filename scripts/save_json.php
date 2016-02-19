<?php
// Append new form data in json string saved in text file
// From: http://coursesweb.net/php-mysql/

// check if all form data are submited, else output error message
if(isset($_POST['user']) && isset($_POST['splash']) && isset($_POST['qn1']) && isset($_POST['qn2']) && isset($_POST['qn3'])
&& isset($_POST['qn4']) && isset($_POST['qn5']) && isset($_POST['id']) && isset($_POST['ct1']) && isset($_POST['ct2']) && isset($_POST['ct3']) ) {
// if form fields are empty, outputs message, else, gets their data
if(empty($_POST['user']) || empty($_POST['splash']) || empty($_POST['qn1']) || empty($_POST['qn2']) || empty($_POST['qn3'])
|| empty($_POST['qn4']) || empty($_POST['qn5']) || empty($_POST['id']) || empty($_POST['ct1']) || empty($_POST['ct2']) || empty($_POST['ct3']) ) {
    echo 'All fields are required';
  }
  else {
// gets and adds form data into an array
    $formdata = array(
      $_POST['id'],
      array(
        name=> $_POST['user'],
        splash=> $_POST['splash'],
        op1=> $_POST['op1'],
        qn1=> $_POST['qn1'],
        op2=> $_POST['op2'],
        qn2=> $_POST['qn2'],
        op3=> $_POST['op3'],
        qn3=> $_POST['qn3'],
        op4=> $_POST['op4'],
        qn4=> $_POST['qn4'],
        op5=> $_POST['op5'],
        qn5=> $_POST['qn5'],
        contact1=> $_POST['ct1'],
        contact2=> $_POST['ct2'],
        contact3=> $_POST['ct3'],
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


/////////////
///
// UPLOAD FILES
//
//////////

$target_dir = "../formdata/images/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}




?>
