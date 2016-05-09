/**
 * Created by Julian on 29.04.2016.
 */

//Koordinaten
var coordinates = {
    latitude : 0,
    longitude: 1,
    accuracy : 2
}

// Validator Konstruktor
function Validator(_class, logic) {
    this.class = _class;
    this.validate = logic;
}

// Validierungsfehler Konstruktor
function Error(element, errorMessage) {
    this.element = element;
    this.errorMessage = errorMessage;
}
// Validierungslogik
var locationValidator = new Validator("locationInput", function(element, errors) {
    var value = element.value;
    if (!/^\w+[\s\w+]*$/.test(value)) {
        errors.push(new Error(element,
            "Die Location muss aus Wörtern bestehen! \n"));
    }
});
//erlaubt nur ein zusammenhängendes wort, welches mit # beginnt
var hashValidator = new Validator("hashInput", function(element, errors) {
    var value = element.value;
    if (!/^#\S*$/.test(value)) {
        errors.push(new Error(element,
            "Der Hash muss mit '#' beginnen und aus Buchstaben bestehen! "));
    }
});

// Validierungsfunktion
var validate = function(event) {
    //validiere einzelne einträge
    var validators = this.validators;
    var errors = [];
    for (var i = 0; i < validators.length; i++) {
        var validator = validators[i];
        var elements = this.getElementsByClassName(validator.class);
        for (var j = 0; j < elements.length; j++) {
            validators[i].validate(elements[j], errors);
        }
    }
    //falls error
    if (errors.length > 0) {
        var messages = errors.reduce(function(previousValue, currentValue) {
            return previousValue + currentValue.errorMessage;
        }, "");
        alert(messages);
        errors.forEach(function highlight(item) {
            var classAttr = item.element.getAttribute("class");
            classAttr += " error";
            item.element.setAttribute("class", classAttr);
        });
        event.preventDefault(); // prevent default action
        event.stopImmediatePropagation(); // prevent other handlers on same element
        errors[0].element.focus();
    }
};

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
    //Valideren
    $("#geoForm").prop("validators", [ locationValidator, hashValidator ]);
    $("#geoForm").bind("submit", validate);
    //position ermitteln und Dokument updaten
    $("#geoForm").bind("submit", sendAjaxAsync);
});

