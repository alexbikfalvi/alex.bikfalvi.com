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
		styles: mapStyles
	};
	var map = new google.maps.Map($("#map-canvas")[0], mapOptions); 
});

$(document).on("pageinit", "#main-page", function() {
    $(document).on("swiperight", "#main-page", function(e) {
        if ($.mobile.activePage.jqmData("panel") !== "open") {
            if (e.type === "swiperight") {
                $("#left-panel").panel("open");
            }
        }
    });
});

