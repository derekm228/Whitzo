$(document).ready(function(){

/*------------------------------------------MAPS SPECIFIC START CODE------------------------------------------*/

	//Initialize global variables
	var map;
	var geocoder;

	//Define functions
	function initialize() {
		var mapOptions = {
			zoom: 12,
			scrollwheel: false
		};
	
		map = new google.maps.Map(document.getElementById('map-section'), mapOptions);

		geocoder = new google.maps.Geocoder();

		// Try HTML5 geolocation
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				var marker = new google.maps.Marker({
					position: pos,
					map: map,
				});

				map.setCenter(pos);
			}, 
			function() {
				handleNoGeolocation(true);
			});
		} 
		else {
	    	// Browser doesn't support Geolocation
	    	handleNoGeolocation(false);
	  	}
	}

	function handleNoGeolocation(errorFlag) {
		if (errorFlag) {
			var content = 'Error: The Geolocation service failed.';
		} 
		else {
	    	var content = 'Error: Your browser doesn\'t support geolocation.';
		}

		var options = {
			map: map,
			position: new google.maps.LatLng(60, 105),
			content: content
		};

		var infowindow = new google.maps.InfoWindow(options);
		map.setCenter(options.position);
	}

	//Event listeners
	google.maps.event.addDomListener(window, 'load', initialize);

/*-----------------------------------------ADDRESS SEARCHING SPECIFIC CODE-----------------------------------------*/

	// This example displays an address form, using the autocomplete feature
	// of the Google Places API to help users fill in the information.

	var placeSearch, autocomplete;
	var componentForm = {
	 	street_number: 'short_name',
		route: 'long_name',
		locality: 'long_name',
		administrative_area_level_1: 'short_name',
		country: 'long_name',
		postal_code: 'short_name'
	};

	function initializeAuto() {
  		// Create the autocomplete object, restricting the search
  		// to geographical location types.
  		autocomplete = new google.maps.places.Autocomplete(
     		(document.getElementById('address')),
      		{ types: ['geocode'] });
  			// When the user selects an address from the dropdown,
  			// populate the address fields in the form.
  		google.maps.event.addListener(autocomplete, 'place_changed', function() { codeAddress()
  		});
	}

	// Bias the autocomplete object to the user's geographical location,
	// as supplied by the browser's 'navigator.geolocation' object.
	function geolocate() {
	 	if (navigator.geolocation) {
	    	navigator.geolocation.getCurrentPosition(function(position) {
	      		var geolocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	      		var circle = new google.maps.Circle({
	        		center: geolocation,
	        		radius: position.coords.accuracy
	      		});
	      		autocomplete.setBounds(circle.getBounds());
	    	});
	 	}
	}

	function codeAddress() {
  		var address = document.getElementById('address').value;
  		geocoder.geocode( { 'address': address}, function(results, status) {
	    	if (status == google.maps.GeocoderStatus.OK) {
	      		map.setCenter(results[0].geometry.location);
	      		var marker = new google.maps.Marker({
	          		map: map,
	          		position: results[0].geometry.location
	      		});
	    	} 
	    	else {
	      		alert('Geocode was not successful for the following reason: ' + status);
	    	}
	  	});
	}

	function drawPreviewMap() {
  		var previewLatitude = 42.323777;
  		var previewLongitude = -71.056935;
  		var mapOptions = {
			zoom: 17,
			scrollwheel: false
		};
	
		var map2 = new google.maps.Map(document.getElementById('map-section2'), mapOptions);

		var pos2 = new google.maps.LatLng(previewLatitude, previewLongitude);

		var marker2 = new google.maps.Marker({
			position: pos2,
			map: map2,
		});

		map2.setCenter(pos2);
	}


	initializeAuto();

	$("#address").on('focus', geolocate);

	$("#address").keyup(function(e){
    	if(e.keyCode == 13)
    	{
        	codeAddress();
        	console.log("Dirty");
    	}
	});

	if($("#previewMyApartmentContent").length > 0) {
		console.log("Yes")
		drawPreviewMap();
	}


/*------------------------------------------CALENDAR SPECIFIC START CODE------------------------------------------*/

	if($("#listSection").length > 0) {
		datePickerController.createDatePicker({
	    	formElements: {
	        	"moveInDate": "%m/%d/%Y"
	    	},
	    	// Position the activation button within the span
	    	nopopup: true
		});
		
		datePickerController.createDatePicker({
	    	formElements: {
	        	"moveOutDate": "%m/%d/%Y"
	    	},
	    	// Position the activation button within the span
	    	nopopup: true
		});
	}

/*------------------------------------------ANIMATE SCROLLING WHEN SELECTING LINKS------------------------------------------*/

	$('.leftSideBar a').on('click', function() {
    	$.smoothScroll({
      		scrollElement: $('#listMyApartmentContent, #previewMyApartmentContent'),
      		scrollTarget: $(this).attr("href"),
      		speed: 1000
    	});
    	return false;
  	});

/*------------------------------------------GET NAME OF FILE AND FEED IT TO THE IFRAME SRC------------------------------------------*/

	$('#contractFile').on('change', function() {
		var filename = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '')
		if (filename) {
			$(".contractDoc").attr("src", "ViewerJS/docs/" + filename);
		}
	});

/*------------------------------------------GOOGLE PLUS SIGN IN CODE------------------------------------------*/
	
	// Additional params
	var additionalParams = {
		'theme' : 'dark',
		'callback': signinCallback
		};

	gapi.signin.render('loginButton', additionalParams);

	function signinCallback(authResult) {
		if (authResult['status']['signed_in']) {
	    	// Update the app to reflect a signed in user
	    	// Hide the sign-in button now that the user is authorized, for example:
	    	$('#loginButton').attr('style', 'display: none');
	    	$('#login h3').css('visibility', 'visible');
	  	} 
	  	else {
	    	// Update the app to reflect a signed out user
	    	// Possible error values:
	    	//   "user_signed_out" - User is signed-out
	    	//   "access_denied" - User denied access to your app
	    	//   "immediate_failed" - Could not automatically log in the user
	    	console.log('Sign-in state: ' + authResult['error']);
		}
	}

	$("#loginButton").on('click', function() {
    	gapi.auth.signIn(additionalParams); // Will use page level configuration
   	});

/*------------------------------------------RICH TEXT EDITOR------------------------------------------*/
	
	// Enable CKEditor
	if($("#listMyApartmentContent").length > 0) {
		CKEDITOR.replace('moreInfo');
		CKEDITOR.config.height = '25em';
	}


/*------------------------------------------APARTMENT PREVIEW SLIDER------------------------------------------*/

});



