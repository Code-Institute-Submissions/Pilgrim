
// Global scope variables 
var map;
var service;

var infowindow;
var searchBox;
var searchElement = document.getElementById('pac-input');

var norte;
var frances;

var options = {
    zoom: 4,
    center: { lat: 41.902782, lng: 12.496366 }
};

var SantiagoAndRome = [
    {
        coords: { lat: 41.902782, lng: 12.496366 }
    },
    {
        coords: { lat: 42.878212, lng: -8.544844 }
    }
];

var addedMarkers = [];

function init() {
    initMap();
    setSearchbox();
    setListeners();
    setPolylines();
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), options);
}

function setSearchbox() {
    searchBox = new google.maps.places.SearchBox(searchElement);
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(searchElement);
}

function setListeners() {
    map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
    });
    searchBox.addListener('places_changed', function () {
        searchPlaces();
    });
}

$('#m-fran').click(() => {
    clearMarkers();
    clearRoutes();
    frances.setMap(map);
    addMarkersToMap(getCoordinatesFrances());
});

$('#m-norte').click(function () {
    clearMarkers();
    clearRoutes();
    norte.setMap(map);
    addMarkersToMap(getCoordinatesNorte());
});

function addMarkersToMap(markers) {
    markers.forEach(marker => {
        var marker = new google.maps.Marker({
            position: marker,
            map: map,
            // icon: getIconForPlace(null)
        });
        addedMarkers.push(marker);
    });
}

function searchPlaces() {
    var places = searchBox.getPlaces();
    
    if (places.length == 0) return;
    
    clearMarkers();

    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }

            addedMarkers.push(getMarkerFromSearch(place));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
}

function goToPlace() {
    var bounds = new google.maps.LatLngBounds();
    places.forEach(place => {
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }
    });
}

function getIconForPlace(place) {
    return {
        url: getIconUrl(place),
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
    };
}

function getIconUrl(place) {
    return place ? place.icon : "";
}

function markerForSearchedPlace() {
    markers.push(new google.maps.Marker({
        map: map,
        icon: getIconForPlace(place),
        title: place.name,
        position: place.geometry.location
        })
    )
};

function panToLocation() {
    if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
    } else {
        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
};

function setPolylines() {
    norte = new google.maps.Polyline({
        path: getCoordinatesNorte(),
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });

    frances = new google.maps.Polyline({
        path: getCoordinatesFrances(),
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });
}

function addMarker(props) {
    var marker = new google.maps.Marker({
        position: props.coords,
        map: map
        //icon: props.iconImage

    });

    // Check for custom icon marker
    if (props.iconImage) {
        // set icon image
        marker.setIcon(props.iconImage)
    }
    // Check content
    if (props.content) {
        var infoWindow = new google.maps.infoWindow({
            content: props.content
        });

        marker.addListener('click', function () {
            infoWindow.open(map, marker);
        });
    }
}

function getIcon(place) {
    return {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            }
}

function getMarkerFromSearch(place) {
new google.maps.Marker({
                map: map,
                icon: getIcon(place),
                title: place.name,
                position: place.geometry.location
            })
}

function clearMarkers() {
    addedMarkers.forEach(function (marker) {
        marker.setMap(null);
    });
    addedMarkers = [];
};

function clearRoutes() {
    norte.setMap(null);
    frances.setMap(null);
}

function getCoordinatesFrances() {
    return [
        { lat: 43.163141, lng: -1.23811 },
        { lat: 43.009177, lng: -1.31951 },
        { lat: 42.90111, lng: -1.542951 },
        { lat: 42.812526, lng: -1.6457745 },
        { lat: 42.672304, lng: -1.813594 },
        { lat: 42.568487, lng: -2.191654 },
        { lat: 42.46272, lng: -2.444985 },
        { lat: 42.416741, lng: -2.729462 },
        { lat: 42.440181, lng: -2.957549 },
        { lat: 42.419568, lng: -3.191775 },
        { lat: 42.37554, lng: -3.435795 },
        { lat: 42.343993, lng: -3.696906 },
        { lat: 42.338628, lng: -3.926491 },
        { lat: 42.288482, lng: -4.14242 },
        { lat: 42.267633, lng: -4.40535 },
        { lat: 42.337338, lng: -4.602433 },
        { lat: 42.328756, lng: -4.804443 },
        { lat: 42.37096, lng: -5.029949 },
        { lat: 42.497947, lng: -5.41621 },
        { lat: 42.598726, lng: -5.567096 },
        { lat: 42.462725, lng: -5.881549 },
        { lat: 42.45493, lng: -6.053251 },
        { lat: 42.481138, lng: -6.284736 },
        { lat: 42.549996, lng: -6.598259 },
        { lat: 42.608394, lng: -6.808554 },
        { lat: 42.707816, lng: -7.043627 },
        { lat: 42.75662, lng: -7.239622 },
        { lat: 42.780839, lng: -7.414077 },
        { lat: 42.807428, lng: -7.61583 },
        { lat: 42.873467, lng: -7.868759 },
        { lat: 42.929688, lng: -8.160784 },
        { lat: 42.878213, lng: -8.544845 },
    ];
};

function getCoordinatesNorte() {
    return [
        { lat: 43.338147, lng: -1.78885 },
        { lat: 43.312691, lng: -1.993332 },
        { lat: 43.294140, lng: -2.353931 },
        { lat: 43.249714, lng: -2.54971 },
        { lat: 43.311373, lng: -2.68084 },
        { lat: 43.274182, lng: -2.832803 },
        { lat: 43.2630126, lng: -2.9349852000000283 },
        { lat: 43.318248, lng: -3.021197 },
        { lat: 43.368822, lng: -3.215635 },
        { lat: 43.394792, lng: -3.457514 },
        { lat: 43.456032, lng: -3.634938 },
        { lat: 43.462306, lng: -3.80998 },
        { lat: 43.387947, lng: -4.029218 },
        { lat: 43.385931, lng: -4.211553 },
        { lat: 43.381307, lng: -4.397058 },
        { lat: 43.421148, lng: -4.756216 },
        { lat: 43.440517, lng: -4.965447 },
        { lat: 43.481887, lng: -5.22731 },
        { lat: 43.498857, lng: -5.381195 },
        { lat: 43.410523, lng: -5.55827 },
        { lat: 43.557952, lng: -5.924665 },
        { lat: 43.561377, lng: -6.229797 },
        { lat: 43.544639, lng: -6.388265 },
        { lat: 43.54509, lng: -6.668284 },
        { lat: 43.570233, lng: -6.94391 },
        { lat: 43.533679, lng: -7.040349 },
        { lat: 43.472102, lng: -7.300544 },
        { lat: 43.368074, lng: -7.467947 },
        { lat: 43.29749, lng: -7.680772 },
        { lat: 43.176328, lng: -7.75661 },
        { lat: 43.040027, lng: -8.020866 },
        { lat: 42.929688, lng: -8.160784 },
        { lat: 42.878213, lng: -8.544845 },
    ];
};