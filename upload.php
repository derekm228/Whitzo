<?php
/*
	This is the PHP code for the Uploading PHP Files Using PHP Tutorial
	
	You may use this code in your own projects as long as this 
	copyright is left in place.  All code is provided AS-IS.
	This code is distributed in the hope that it will be useful,
 	but WITHOUT ANY WARRANTY; without even the implied warranty of
 	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
	
	For the rest of the code visit http://www.WebCheatSheet.com
	
	Copyright 2007 WebCheatSheet.com	
*/

//Check that we have a file
if((!empty($_FILES["uploaded_file"])) && ($_FILES['uploaded_file']['error'] == 0)) {
  $filename = basename($_FILES['uploaded_file']['name']);
  $ext = substr($filename, strrpos($filename, '.') + 1);
  //Determine the path to which we want to save this file
    $newname = dirname(__FILE__).'/ViewerJS/docs/'.$filename;
    //Check if the file with the same name is already exists on the server
    if (!file_exists($newname)) {
      //Attempt to move the uploaded file to it's new place
      if ((move_uploaded_file($_FILES['uploaded_file']['tmp_name'],$newname))) {
         echo "It's done! The file has been saved as: ".$newname;
      } else {
         echo "Error: A problem occurred during file upload!";
      }
    } else {
       echo "Error: File ".$_FILES["uploaded_file"]["name"]." already exists";
    }
  }
} else {
 echo "Error: No file uploaded";
}
?>