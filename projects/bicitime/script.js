var map = null;
var mapAutocomplete = null;
var mapGeocoder = null;


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
	// Create the map.
	map = new google.maps.Map($("#map-canvas")[0], mapOptions); 
	// Create the map autocomplete service.
	mapAutocomplete = new google.maps.places.AutocompleteService();
	// Create the map geocoder.
	mapGeocoder = new google.maps.Geocoder();
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
	// Add an event handler for the opening of the search panel.
	$("#search-panel").on("panelbeforeopen", function(e, data) {
		var date = new Date();
		// Reset the search date.
		$("#search-date-time").val("2013-12-31T15:35:52.52");
	});
	// Add an event handler for the changed event.
	$("#search-origin").change(function(e) {
		onSearchInputChanged($(this), $("#search-origin-autocomplete"));
    });
	// Add an event handler for the changed event.
	$("#search-origin").change(function(e) {
		onSearchInputChanged($(this), $("#search-destination-autocomplete"));
    });
	// Add an event handler for the origin autocomplete.
	$("#search-origin").keyup(function(e) {
		// Call the autocomplete method.
		onMapAutocomplete($("#search-origin"), $("#search-origin-autocomplete"));
    });
	// Add an event handler for the destination autocomplete.
	$("#search-destination").keyup(function(e) {
		// Call the autocomplete method.
		onMapAutocomplete($("#search-destination"), $("#search-destination-autocomplete"));
    });
	// Prevent page reload on search form submission.
	$("#search-form").on("submit", function() { return false; })
	// Add an event handler for the search start button.
	$("#search-start").on("click", function(e) {
		onMapSearch();
    });
	// Add an event handler for the search cancel button.
	$("#search-cancel").on("click", function(e) {
		// Close the search panel.
		$("#search-panel").panel("close");
    });
});

// An event handler called on the map place autocomplete.
function onMapAutocomplete(input, ul) {
	var value = input.val();
	var html = "";
	if (value && value.length > 2) {
		mapAutocomplete.getQueryPredictions({ input: value }, function(predictions, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0, prediction; prediction = predictions[i]; i++) {
					html += '<li><a class="search-autocomplete-select" href="#">' + prediction.description + '</a></li>';
				}
				ul.html(html);
				ul.listview("refresh");
				ul.trigger("updatelayout");
				// Set an event handler for each autocomplete option.
				$(".search-autocomplete-select").click(function(e) {
					// When the option is selected, update the text.
					input.val($(this).text());
					// Close the autocomplete list.
					ul.html("");
					ul.listview("refresh");
					ul.trigger("updatelayout");
				});									
			}
		});
	}
	else {
		// Close the autocomplete list.
		ul.html("");
		ul.listview("refresh");
		ul.trigger("updatelayout");
	}
	// Call the input changed.
	onSearchInputChanged(input, ul);
}

// An event handler called when a search input has changed.
function onSearchInputChanged(input, list) {
	// If the text is empty.
	if (input.val() == "") {
		list = $("#search-origin-autocomplete");
		list.html("");
		list.listview("refresh");
		list.trigger("updatelayout");
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
	// Get the destination address.
	var addrDestination = $("#search-destination").val();
	// The origin location.
	var originLocation;
	// The destination location.
	// Use the geocoder service to get the origin location.
	mapGeocoder.geocode({'address': addrOrigin}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			// Save the origin location.
			originLocation = results[0].geometry.location;
			// Use the geocoder service to get the destination location.
			mapGeocoder.geocode({'address': addrOrigin}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					// Save the destination location.
					destinationLocation = results[0].geometry.location;
					// Clear the map markers.
					alert(originLocation + " " + destinationLocation);
				}
				else {
					alert("Cannot find the destination address.");
				}
			});
		} else {
			alert("Cannot find the origin address.");
		}
    });
}

