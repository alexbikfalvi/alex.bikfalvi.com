
function initialize()
{
	var latlng = new google.maps.LatLng(40.332513, -3.764526);
	var mapOptions = {
		center: latlng,
		draggable: true,
		mapTypeId: google.maps.MapTypeId.TERRAIN,
		mapTypeControl: false,
		overviewMapControl: false,
		panControl: false,
		rotateControl: false,
		scaleControl: false,
		streetViewControl: false,
		zoomControl: false,
		zoom: 15
   	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	var image = new google.maps.MarkerImage('../../../images/pin.png',
		new google.maps.Size(30, 40),
		new google.maps.Point(0,0),
		new google.maps.Point(14, 33));
	var shadow = new google.maps.MarkerImage('../../../images/pin_shadow.png',
		new google.maps.Size(54, 40),
		new google.maps.Point(0,0),
		new google.maps.Point(18, 36));
	var marker = new google.maps.Marker({
		map:map,
		icon:image,
		shadow:shadow,
		draggable:false,
		animation: google.maps.Animation.DROP,
		position: latlng,
		title:"Event location"
	});
	google.maps.event.addListener(marker, 'click', toggleBounce);
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