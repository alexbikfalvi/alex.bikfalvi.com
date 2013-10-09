
function initialize()
{
	var latlng = new google.maps.LatLng(41.40368, 2.19475);
	var mapOptions = {
		zoom: 11,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.TERRAIN
   	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	var image = new google.maps.MarkerImage('../images/pin.png',
		new google.maps.Size(30, 40),
		new google.maps.Point(0,0),
		new google.maps.Point(14, 33));
	var shadow = new google.maps.MarkerImage('../images/pin_shadow.png',
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
		title:"My contact address"
	});

	var infoWndContent = '<style type="text/css"> @font-face { font-family:"Open Sans"; src:url("http://alex.bikfalvi.com/style/fonts/OpenSans-Regular.eot?") format("eot"), url("http://alex.bikfalvi.com/style/fonts/OpenSans-Regular.woff") format("woff"), url("http://alex.bikfalvi.com/style/fonts/OpenSans-Regular.ttf") format("truetype"), url("http://alex.bikfalvi.com/style/fonts/OpenSans-Regular.svg#OpenSans") format("svg"); 	font-weight:normal; font-style:normal; } body{ line-height:1.35em; font-family: "Open Sans",arial,sans-serif; font-size: 12px; } h1 { color:#333; font-size:140%; font-weight:300; }</style><div><h1>My contact address</h1><p>Carrer de Roc Boronat, 138 <br/> Despatx 55.224 <br/> 08018 Barcelona <br/> Spain</p></div>';
	var infoWnd = new google.maps.InfoWindow({
		content: infoWndContent
	});
	google.maps.event.addListener(marker, 'click', toggleBounce);
	infoWnd.open(map, marker);
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