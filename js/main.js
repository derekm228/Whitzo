$(document).ready(function(){

	//Initialize global variables

	//Define functions
	var map;
	var latitude = 0;
	var longitude = 0;
	console.log(latitude);
	console.log(longitude);

	function initialize() {

		function success(position) {
			latitude  = position.coords.latitude;
			longitude = position.coords.longitude;
			console.log(latitude);
			console.log(longitude);
		};

		function error() {
			console.log(latitude);
			console.log(longitude);
		};

		navigator.geolocation.getCurrentPosition(success, error);

		var mapOptions = {
			zoom: 8,
			center: new google.maps.LatLng(latitude, longitude),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map(document.getElementById('map-section'), mapOptions);
	}

	google.maps.event.addDomListener(window, 'load', initialize);

	//Event listeners

});