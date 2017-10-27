var latitude;
var longitude;
var city;
var temperature;
var toogleButton=document.getElementById("toggle");
var icon;


function localWeather(){

if(navigator.geoLocation){
	getCurrentPosition(function(position){

					latitude=position.coords.latitude;
					longitude=position.coords.longitude;
					getWeather(latitude,longitude);

				






	});
	else{
		alert("err..geoLocation disabled");
	}
}

}