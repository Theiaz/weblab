/**
 * Created by Julian on 29.04.2016.
 */

// function zeigePosition(position) {
//     // ausgabe.innerHTML = "Ihre Koordinaten sind:<br> Breite: " + position.coords.latitude +
//     //     "<br>Länge: " + position.coords.longitude;
//     console.log("zeigePosition");
// }
//

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
};

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};

function ermittlePosition() {
    if (navigator.geolocation) {
        console.log("ermittlePosition")
        // alert("ermittlePosition");
        navigator.geolocation.getCurrentPosition(success, error, options);
        console.log("positionErmittelt")
    } else {
        ausgabe.innerHTML = 'Ihr Browser unterstützt keine Geolocation.';
    }
}


$(document).ready(function() {
    // var ausgabe = $("#ausgabe");
    $("#geoForm").bind("submit", ermittlePosition);
    // ermittlePosition();
});

