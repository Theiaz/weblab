/**
 * Created by Julian on 29.04.2016.
 */


var coordinates = {
    latitude : 0,
    longitude: 1,
    accuracy : 2
}

// var geoOptions = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0
// };
//
// function success(pos) {
//     var crd = pos.coords;
//     coordinates.latitude = crd.latitude;
//     coordinates.longitude = crd.longitude;
// };
//
// function error(err) {
//     console.warn('ERROR(' + err.code + '): ' + err.message);
// };

function getGeoPosition() {
    if (navigator.geolocation) {
        console.log("getGeoPosition")
        navigator.geolocation.getCurrentPosition(function(position) {
            coordinates.latitude = position.coords.latitude;
            coordinates.longitude = position.coords.longitude;
            coordinates.accuracy = position.coords.accuracy;
            console.log("coordinate updated")
        });
    } else {
        ausgabe.innerHTML = 'Ihr Browser unterstützt keine Geolocation.';
    }
}

// Formular per asynchronem Ajax Aufruf senden
function sendAjaxAsync(event) {
    getGeoPosition();
    //submit unterbrechen
    event.preventDefault();

    //URL und message parameter aus dem Formular nehmen 
    var form = this; //die aktuelle Form der Seite
    var request = new XMLHttpRequest();
    var url = form.getAttribute("action");
    //Hole Werte von Eingabe in Locationfield (Attribut locationInput)
    //message muss bleiben, hat nix mit .jade zu tun
    var params = "message="
        + form.getElementsByClassName("locationInput")[0].value;

    // asynchroner request
    request.open("POST", url, true); // asynchroner POST
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(params);

    //request callback
    request.onreadystatechange = function() {
        if (request.readyState === 4) { //übertragung abgeschlossen
            if (request.status == "200") { // Stauts == Okay
                var htmlDocument = document.createElement("HTML");
                htmlDocument.innerHTML = request.responseText;
                //hole lattitude/longitude field
                var latitudeElement = document.getElementById("latitude");
                latitudeElement.innerHTML = "Latitude: ";
                latitudeElement.innerHTML = latitudeElement.innerHTML + coordinates.latitude;
                var longitudeElement = document.getElementById("longitude");
                longitudeElement.innerHTML = "Longitude: ";
                longitudeElement.innerHTML = longitudeElement.innerHTML + coordinates.longitude;

                var img = document.getElementById("geoImage");
                img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + coordinates.latitude + "," + coordinates.longitude + "&zoom=13&size=300x300&sensor=false";
                // img.appendChild(img);

                console.log("coordElements updated")
            } else {
                alert("Ein Fehler ist aufgetreten: " + request.statusText);
            }
        }
    }
}


$(document).ready(function() {
    $("#geoForm").bind("submit", sendAjaxAsync);
});

