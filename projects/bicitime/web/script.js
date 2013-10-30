// Global variables.

var mapStyles = [
  {
    stylers: [
      { hue: "#00ffe6" },
      { saturation: -20 }
    ]
  }
]; // The map styles.
var map = null; // The map.
var mapMarkerImage = null;
var mapMarkerShadow = null;

var bicingXml = null;

// An event handler called when the page has loaded.
function onLoad()
{
	// Resize the map area.
	onResize();
	
	// Load the map.
	onLoadMap();
	
	// Load the Bicing data.
	onLoadBicing();
}

// An event handler called when the page is being resized.
function onResize()
{
	$("#divMap").height($(window).height() - $("#divHeader").height() - $("#divResult").height());
}

// An event handler called when the user opens the input page.
function onOpen()
{
	alert("Open!");
}

// An event handler called when loading the map.
function onLoadMap()
{
	// The Barcelona center.
	var latlng = new google.maps.LatLng(41.383333, 2.183333);
	// The map options.
	var mapOptions = {
		zoom: 12,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: mapStyles
   	};
	// Create the map.
	map = new google.maps.Map(document.getElementById("divMap"), mapOptions);
	// Create the map marker image.
	mapMarkerImage = new google.maps.MarkerImage('../../images/pin.png',
		new google.maps.Size(30, 40),
		new google.maps.Point(0,0),
		new google.maps.Point(14, 33));
	// Create the map marker shadow.
	mapMarkerShadow = new google.maps.MarkerImage('../../images/pin_shadow.png',
		new google.maps.Size(54, 40),
		new google.maps.Point(0,0),
		new google.maps.Point(18, 36));
	
	// Create the bike layer.
	var bikeLayer = new google.maps.BicyclingLayer();
	bikeLayer.setMap(map);			
}

// An event handler called when loading the bicing data.
function onLoadBicing()
{
	// If the map is null, do nothing.
	if (null == map) return;
	
	// Else, load the Bicing XML data from file.
	$.ajax({
		type: "GET",
		url: "http://bicing.h2o.net.br/getstations.php",
		dataType: "xml",
		success: function (xml) {
			/*
			$(xml).find("station").each(function(index, element) {
				// Get the station identifier.
				var id = $(element).find("id").text();
				// Get the latitude.
				var lat = parseFloat($(element).find("lat").text());
				// Get the longitude.
				var long = parseFloat($(element).find("long").text());
				// Create the marker.
				var marker = new google.maps.Marker({
					map: map,
					icon: mapMarkerImage,
					shadow: mapMarkerShadow,
					draggable: false,
					animation: google.maps.Animation.DROP,
					position: new google.maps.LatLng(lat, long),
					title: id
				});
            });*/
			bicingXml = xml;
		}
	});
}

// An event handler called when the user clicks on the search button.
function onSearch()
{
}

function toggleBounce()
{
	if(marker.getAnimation() != null)
	{
		marker.setAnimation(null);
	}
	else
	{
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}
