<!--
	This is the HTML form for the Uploading Files Using PHP Tutorial
	
	You may use this code in your own projects as long as this 
	copyright is left in place.  All code is provided AS-IS.
	This code is distributed in the hope that it will be useful,
 	but WITHOUT ANY WARRANTY; without even the implied warranty of
 	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
	
	For the rest of the code visit http://www.WebCheatSheet.com
	
	Copyright 2007 WebCheatSheet.com	
-->
<html> 
<body>
  <form enctype="multipart/form-data" action="upload.php" method="post">
    <input type="hidden" name="MAX_FILE_SIZE" value="1000000" />
    Choose a file to upload: <input name="uploaded_file" type="file" />
    <input type="submit" value="Upload" />
  </form> 
</body> 
</html>