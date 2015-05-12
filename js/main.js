$(document).ready(function(){

  //Initialize global variables

  //Define functions
  var map;
  var latitude;
  var longitude;

  function initialize() {
    var mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(latitude, longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-section'),
        mapOptions);
  }

         function showLocation(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            alert("Latitude : " + latitude + " Longitude: " + longitude);
         }

         function errorHandler(err) {
            if(err.code == 1) {
               alert("Error: Access is denied!");
            }else if( err.code == 2) {
               alert("Error: Position is unavailable!");
            }
         }
      
         function getLocation(){

            if(navigator.geolocation){
               // timeout at 60000 milliseconds (60 seconds)
               var options = {timeout:60000};
               navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
            }else{
               alert("Sorry, browser does not support geolocation!");
            }
         }

  getLocation();
  google.maps.event.addDomListener(window, 'load', initialize);

  //Event listeners





});