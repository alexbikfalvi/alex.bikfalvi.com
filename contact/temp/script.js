function GetMap()
{
	//Microsoft.Maps.loadModule('Microsoft.Maps.Themes.BingTheme', { callback: ThemesModuleLoaded });
	var map = new Microsoft.Maps.Map(
		document.getElementById("mapDiv"),
		{
			credentials:"AgAHNvy0_FvwAnOjz8JdabCOxOB4A0bJC9KYFeYxcbbRFb1aJmC7kCaYkEamLY4h",
			center: new Microsoft.Maps.Location(40.416885, -3.703459),
			enableClickableLogo: false,
			enableSearchLogo: false,
			mapTypeId: Microsoft.Maps.MapTypeId.road,
			showCopyright: false,
			zoom: 7
		}
	);
	
	// Retrieve the location of the map center 
	var center = map.getCenter();
	
	// Add a pin to the center of the map
	var pin = new Microsoft.Maps.Pushpin(center, {
		draggable: false,
		icon:"../../images/pin.png"
		});
	
	map.entities.push(pin);
}

function ThemesModuleLoaded()
{
}
