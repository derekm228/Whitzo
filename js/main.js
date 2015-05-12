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
			// It's not going to fail!
		};

		navigator.geolocation.getCurrentPosition(success, error);
		console.log(latitude);
		console.log(longitude);

		var mapOptions = {
			zoom: 8,
			center: new google.maps.LatLng(latitude, longitude),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		console.log(latitude);
		console.log(longitude);

		map = new google.maps.Map(document.getElementById('map-section'), mapOptions);
		console.log(latitude);
		console.log(longitude);
	}

	google.maps.event.addDomListener(window, 'load', initialize);
	console.log(latitude);
	console.log(longitude);

	//Event listeners

});