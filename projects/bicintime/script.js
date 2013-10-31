google.maps.visualRefresh = true;

var map = null;
var mapAutocomplete = null;
var mapGeocoder = null;
var mapDirections = null;
var mapDirectionsRendererOrigin = null;
var mapDirectionsRendererBicing = null;
var mapDirectionsRendererDestination = null;
var mapMarkersEnds = [];
var mapMarkersStations = [];

var mapMarkerRed;
var mapMarkerGreen;
var mapMarkerBlue;
var mapMarkerCyan;
var mapMarkerYellow;
var mapMarkerMagenta;
var mapMarkersEndshadow;

var strCurrentLocation = "Current location";

var isSearch = true;

var searchResult = null;

$(document).ready(function(e) {
	var mapStyles = [
	  {
		stylers: [
		  { hue: "#00ffe6" },
		  { saturation: -20 }
		]
	  }
	];
	var mapOptions = {
		center: new google.maps.LatLng(41.383333, 2.183333),
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		panControl: false,
		streetViewControl: false,
		zoomControl: false,
		styles: mapStyles
	};
	// Create the map markers.
	mapMarkerRed = new google.maps.MarkerImage('images/pin_red.png',
		new google.maps.Size(30, 40),
		new google.maps.Point(0,0),
		new google.maps.Point(14, 33));
	mapMarkerGreen = new google.maps.MarkerImage('images/pin_green.png',
		new google.maps.Size(30, 40),
		new google.maps.Point(0,0),
		new google.maps.Point(14, 33));
	mapMarkerBlue = new google.maps.MarkerImage('images/pin_blue.png',
		new google.maps.Size(30, 40),
		new google.maps.Point(0,0),
		new google.maps.Point(14, 33));
	mapMarkerCyan = new google.maps.MarkerImage('images/pin_cyan.png',
		new google.maps.Size(30, 40),
		new google.maps.Point(0,0),
		new google.maps.Point(14, 33));
	mapMarkerYellow = new google.maps.MarkerImage('images/pin_yellow.png',
		new google.maps.Size(30, 40),
		new google.maps.Point(0,0),
		new google.maps.Point(14, 33));
	mapMarkerMagenta = new google.maps.MarkerImage('images/pin_magenta.png',
		new google.maps.Size(30, 40),
		new google.maps.Point(0,0),
		new google.maps.Point(14, 33));
	mapMarkersEndshadow = new google.maps.MarkerImage('images/pin_shadow.png',
		new google.maps.Size(54, 40),
		new google.maps.Point(0,0),
		new google.maps.Point(18, 36));
	// Create the map.
	map = new google.maps.Map($("#map-canvas")[0], mapOptions); 
	// Create the map autocomplete service.
	mapAutocomplete = new google.maps.places.AutocompleteService();
	// Create the map geocoder.
	mapGeocoder = new google.maps.Geocoder();
	// Create the map directions service.
	mapDirections = new google.maps.DirectionsService();
	// Create the map directions renderer.
	mapDirectionsRendererOrigin = new google.maps.DirectionsRenderer(
		{
			suppressMarkers: true,
			suppressInfoWindows: true,
			icons: [{
				icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 4 },
				offset: '0',
				repeat: '20px'
			}]
		});
	mapDirectionsRendererBicing = new google.maps.DirectionsRenderer(
		{
			suppressMarkers: true,
			suppressInfoWindows: true
		});
	mapDirectionsRendererDestination = new google.maps.DirectionsRenderer(
		{
			suppressMarkers: true,
			suppressInfoWindows: true,
			icons: [{
				icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 4 },
				offset: '0',
				repeat: '20px'
			}]
		});
	mapDirectionsRendererOrigin.setMap(map);
	mapDirectionsRendererBicing.setMap(map);
	mapDirectionsRendererDestination.setMap(map);
});

$(document).on("pageinit", "#main-page", function() {
	// Add an event handle for the menu panel swipe.
    $(document).on("swiperight", "#main-page", function(e) {
        if ($.mobile.activePage.jqmData("panel") !== "open") {
            if (e.type === "swiperight") {
                $("#menu-panel").panel("open");
            }
        }
    });
	// Add an event handler to the search navigation button.
	$("#navigation-search").on("click", function(e) {
		if (isSearch) {
			// Open the search panel.
			$("#search-panel").panel("open");
		}
		else {
			// Open the results panel.
			$("#results-panel").panel("open");
		}
	});
	// Add an event handler for the opening of the search panel.
	$("#search-panel").on("panelbeforeopen", function(e, data) {
		var date = new Date();
		// Reset the search date.
		$("#search-date-time").val("2013-12-31T15:35:52.52");
	});
	// Add an event handler for the changed event of the origin input.
	$("#search-origin").change(function(e) {
		onSearchInputChanged($(this), $("#search-origin-autocomplete"));
    });
	// Add an event handler for the changed event of the destination input.
	$("#search-destination").change(function(e) {
		onSearchInputChanged($(this), $("#search-destination-autocomplete"));
    });
	// Add an event handler for the focus in of the destination input.
	$("#search-origin").focusin(function(e) {
		// If the text is set to the current location, clear.
		if ($(this).val() == strCurrentLocation) {
			$(this).val("");
		}
    });
	// Add an event handler for the focus in of the destination input.
	$("#search-destination").focusin(function(e) {
		// If the text is set to the current location, clear.
		if ($(this).val() == strCurrentLocation) {
			$(this).val("");
		}
    });
	// Add an event handler for the origin autocomplete.
	$("#search-origin").keyup(function(e) {
		// Call the autocomplete method.
		onMapAutocomplete($(this), $("#search-origin-autocomplete"));
    });
	// Add an event handler for the destination autocomplete.
	$("#search-destination").keyup(function(e) {
		// Call the autocomplete method.
		onMapAutocomplete($(this), $("#search-destination-autocomplete"));
    });
	// Prevent page reload on search form submission.
	$("#search-form").on("submit", function() { return false; })
	// Add an event handler for the search start button.
	$("#search-start").on("click", function(e) {
		// Start the search.
		onMapSearch();
    });
	// Add an event handler for the search cancel button.
	$("#search-cancel").on("click", function(e) {
		// Close the search panel.
		$("#search-panel").panel("close");
    });
});

// An event handler called on the map place autocomplete.
function onMapAutocomplete(input, list) {
	var value = input.val();
	var html = "";
	if (value && value.length > 2) {
		mapAutocomplete.getQueryPredictions({ input: value }, function(predictions, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0, prediction; prediction = predictions[i]; i++) {
					html += '<li data-icon="false"><a class="search-autocomplete-select" href="#">' + prediction.description + '</a></li>';
				}
				// Show the search list.
				onShowSearchList(input, list, html);
				// Set an event handler for each autocomplete option.
				$(".search-autocomplete-select").click(function(e) {
					// When the option is selected, update the text.
					input.val($(this).text());
					// Hide the search list.
					onHideSearchList(list);
				});									
			}
		});
	}
	else {
		// Show the autocomplete list.
		onShowSearchList(input, list);
	}
	// Call the input changed.
	onSearchInputChanged(input, list);
}

// Shows the specified search list.
function onShowSearchList(input, list, items) {
	// Create the html.
	var html = '<li data-icon="star"><a class="search-autocomplete-select-gps" href="#">' + strCurrentLocation + '</a></li>';
	if (items) {
		html = html + '<li data-role="list-divider">Suggestions</li>' + items;
	}
	// Update the list.
	list.html(html);
	list.listview("refresh");
	list.trigger("updatelayout");
	// Set an event handler for the current location option.
	$(".search-autocomplete-select-gps").click(function(e) {
		// When the option is selected, update the text.
		input.val(strCurrentLocation);
		// Hide the search list.
		onHideSearchList(list);
	});	
}

// Hides the specified search list.
function onHideSearchList(list) {
	list.html("");
	list.listview("refresh");
	list.trigger("updatelayout");
}

// An event handler called when a search input has changed.
function onSearchInputChanged(input, list) {
	// If the text is empty because the user selected the clear button.
	if (input.val() == "") {
		// Hide the list.
		onHideSearchList(list);
	}
	// Call the search changed method.
	onSearchChanged();
}

// An event handler called when the search has changed.
function onSearchChanged() {
	if (($("#search-origin").val().length > 0) && ($("#search-destination").val().length > 0)) {
		if ($("#search-start").hasClass("ui-disabled")) {
			$("#search-start").removeClass("ui-disabled");
			$("#search-start").button("refresh");
		}
	}
	else {
		if (!$("#search-start").hasClass("ui-disabled")) {
			$("#search-start").addClass("ui-disabled");
			$("#search-start").button("refresh");
		}
	}
}

// An event handler called when performing a search.
function onMapSearch() {
	// Get the origin address.
	var addrOrigin = $("#search-origin").val();
	// If the origin location is the current location.
	if (addrOrigin == strCurrentLocation) {
		if (navigator.geolocation) {
			// Call the search origin function with the current location.
			navigator.geolocation.getCurrentPosition(function(position) {
				onMapSearchOrigin(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
			}, function() {
				alert("The current location is not available.");
			});
		}
		else {
			alert("The current location is not available.");
		}
	}
	else {
		// Use the geocoder service to get the origin location.
		mapGeocoder.geocode({'address': addrOrigin}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				// Call the search origin function.
				onMapSearchOrigin(results[0].geometry.location);
			} else {
				alert("Cannot find the origin address.");
			}
		});
	}
}

// An event handler called when receiving the response for the origin location.
function onMapSearchOrigin(originLocation) {
	// Get the destination address.
	var addrDestination = $("#search-destination").val();
	// If the destination location is the current location.
	if (addrDestination == strCurrentLocation) {
		if (navigator.geolocation) {
			// Call the search origin function with the current location.
			navigator.geolocation.getCurrentPosition(function(position) {
				onMapSearchDestination(
					originLocation,
					new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
					);
			}, function() {
				alert("The current location is not available.");
			});
		}
		else {
			alert("The current location is not available.");
		}
	}
	else {
		// Use the geocoder service to get the destination location.
		mapGeocoder.geocode({'address': addrDestination}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				// Call the search destination function.
				onMapSearchDestination(originLocation, results[0].geometry.location);
			}
			else {
				alert("Cannot find the destination address.");
			}
		});
	}
}

// An event handler called when receiving the responde for the destination location.
function onMapSearchDestination(originLocation, destinationLocation) {
	// Close the search panel.
	$("#search-panel").panel("close");
	// Clear the current markers.
	for (var i = 0; i < mapMarkersEnds.length; i++) {
		mapMarkersEnds[i].setMap(null);
	}
	mapMarkersEnds = [];
	for (var i = 0; i < mapMarkersStations.length; i++) {
		mapMarkerStations[i].setMap(null);
	}
	mapMarkerStations = [];
	// Create a new origin marker.
	var markerOrigin = new google.maps.Marker({
		position: originLocation,
		icon: mapMarkerGreen,
		shadow: mapMarkersEndshadow,
		draggable: false,
		animation: google.maps.Animation.DROP,
		title:"Origin"
	});
	// Create a new destination marker.
	var markerDestination = new google.maps.Marker({
		position: destinationLocation,
		icon: mapMarkerRed,
		shadow: mapMarkersEndshadow,
		draggable: false,
		animation: google.maps.Animation.DROP,
		title:"Destination"
	});
	// Add the map markers.
	mapMarkersEnds.push(markerOrigin);
	mapMarkersEnds.push(markerDestination);
	// Center the map on the markers.
	var mapBounds = new google.maps.LatLngBounds();
	for (var i = 0; i < mapMarkersEnds.length; i++) {
		mapBounds.extend(mapMarkersEnds[i].getPosition());
	}
	map.setCenter(mapBounds.getCenter());
	map.fitBounds(mapBounds);
	// Add the markers to the map.
	for (var i = 0; i < mapMarkersEnds.length; i++) {
		setTimeout(function(index) { mapMarkersEnds[index].setMap(map); }, 500 * i, i);
	}

	// Compute directions for the specified locations.
	onRequestDirections(originLocation, destinationLocation);	
}

// A method that request the directions for the given location.
function onRequestDirections(originLocation, destinationLocation) {
	// Get the current time.
	var date = new Date();
	// Compute the request url.
	var url = 'http://bicing.h2o.net.br/getroute.php?origin=' +
		originLocation.lat() + ',' + originLocation.lng() + '&destination=' +
		destinationLocation.lat() + ',' + destinationLocation.lng() + '&time=' +
		date.getTime();
	// Request the directions.
	$.ajax(url).done(function(result) {
		// Save the result.
		searchResult = result;
		// Create the result html content.
		var html = "";
		// Parse each result.
		$.each(result, function(index, value) {
			// Create the results set.
			html += '<div data-role="collapsible-set" data-content-theme="c">' +
				'<div class=".result-collapsible" data-role="collapsible" data-mini="true" data-collapsed="' + (index == 0 ? "false" : "true") + '">' +
				'<h3>' + value.distance.sum + ' meters (' + value.print.sumTime + ')</h3>' +
				'<p>Depart at: ' + value.station.start.street + ' ' + value.station.start.street_number + '</p>' +
				'<p>Arrive at: ' + value.station.arrive.street + ' ' + value.station.arrive.street_number + '</p>' +
                '</div></div>';
		});
		// Add the close button.
		html += '<a href="#" type="button" data-theme="d" id="results-clear">New search</a>';
		// Set the html result.
		$("#results-panel").html(html);
		$("#results-panel").trigger("create");
		// Close the search panel.
		$("#search-panel").panel("close");
		// Open the results panel.
		$("#results-panel").panel("open");
		// Set the search flag to false.
		isSearch = false;
		// Add an event handler for the results clear button.
		$("#results-clear").on("click", function(e) {
			// Close the results panel.
			$("#results-panel").panel("close");
			// Open the search panel.
			$("#search-panel").panel("open");
			// Set the search flag to true.
			isSearch = true;
		});
		// For each result collapsible, create an event handler.
		$.each(result, function(index, value) {
			$(".result-collapsible").on("collapsiblecollapse", function(e, ui) {
				alert('Collapse');
			});
		});
		// If the result is not empty.
		if (searchResult.length > 0) {
			// Show the route for the first result.
			onDisplayStations(0, originLocation, destinationLocation);
		}
	}).fail(function(result) { alert(result); });
}

// A method called to display the bicing stations.
function onDisplayStations(index, originLocation, destinationLocation) {
	// Clear the current station markers if any.
	for (var i = 0; i < mapMarkersStations.length; i++) {
		mapMarkerStations[i].setMap(null);
	}
	mapMarkerStations = [];
	
	// Get the current result.
	var result = searchResult[index];
	
	// Create the origin station location.
	var originStation = new google.maps.LatLng(result.station.start.latitude, result.station.start.longitude);
	// Create the destination station location.
	var destinationStation = new google.maps.LatLng(result.station.arrive.latitude, result.station.arrive.longitude); 
	
	// Create a new origin station marker.
	var markerOrigin = new google.maps.Marker({
		position: originStation,
		icon: mapMarkerCyan,
		shadow: mapMarkersEndshadow,
		draggable: false,
		animation: google.maps.Animation.DROP,
		title:"Origin station"
	});
	// Create a new destination marker.
	var markerDestination = new google.maps.Marker({
		position: destinationStation,
		icon: mapMarkerMagenta,
		shadow: mapMarkersEndshadow,
		draggable: false,
		animation: google.maps.Animation.DROP,
		title:"Destination station"
	});
	
	// Add the map markers.
	mapMarkerStations.push(markerOrigin);
	mapMarkerStations.push(markerDestination);
	// Add the markers to the map.
	for (var i = 0; i < mapMarkerStations.length; i++) {
		setTimeout(function(index) { mapMarkerStations[index].setMap(map); }, 500 * i, i);
	}
	
	// Draw the directions.
	onDisplayDirections(originLocation, destinationLocation, originStation, destinationStation);
}

// A method that displays the directions for the specified points.
function onDisplayDirections(originLocation, destinationLocation, originStation, destinationStation) {
	// Route the origin walking.
	mapDirections.route(
		{origin:originLocation, destination:originStation, travelMode: google.maps.DirectionsTravelMode.WALKING },
		function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				// Set the map directions.
				mapDirectionsRendererOrigin.setDirections(response);
			}
			else {
				alert("No directions could be found.");
			}
		});
	// Route the cycling.
	mapDirections.route(
		{origin:originStation, destination:destinationStation, travelMode: google.maps.DirectionsTravelMode.BICYCLING },
		function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				mapDirectionsRendererBicing.setDirections(response);
			}
			else {
				// Route using walking directions.
				mapDirections.route(
					{origin:originStation, destination:destinationStation, travelMode: google.maps.DirectionsTravelMode.WALKING },
					function(response, status) {
						if (status == google.maps.DirectionsStatus.OK) {
							// Set the map directions.
							mapDirectionsRendererBicing.setDirections(response);
						}
						else {
							alert("No directions could be found.");
						}
					});
			}
		});
	// Route the destination walking.
	mapDirections.route(
		{origin:destinationStation, destination:destinationLocation, travelMode: google.maps.DirectionsTravelMode.WALKING },
		function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				// Set the map directions.
				mapDirectionsRendererDestination.setDirections(response);
			}
			else {
				alert("No directions could be found.");
			}
		});
}

