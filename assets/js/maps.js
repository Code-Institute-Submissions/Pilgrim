
// Global scope variables needed for searches
var map;
var service;
var infowindow;


//  Basic google maps function
function initMap() {
    // Variables needed for routes
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    // Map starting options
    var options = {
        zoom: 4,
        center: { lat: 41.902782, lng: 12.496366 }
    };
    // New map, targets the #map div
    var map = new google.maps.Map(document.getElementById('map'), options);
    directionsRenderer.setMap(map);

    // creating variable to store input when searching a place
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias Searchbox towards current viewpoint of the map
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    // Will remember place even after searching a new one
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();
        // Making sure it is only one adress
        if (places.length == 0) {
            return;
        }
        var markers = [];
        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });



    // Array of initial markers
    var markers = [
        {
            coords: { lat: 41.902782, lng: 12.496366 }
        },
        {
            coords: { lat: 42.878212, lng: -8.544844 }
        }
    ];

    // Loop through markers
    for (var i = 0; i < markers.length; i++) {
        // Add marker
        addMarker(markers[i]);
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

    var norte = [
        {lat: 43.338147,lng: -1.78885}, 
        {lat: 43.312691,lng: -1.993332},
        {lat: 43.294140,lng: -2.353931},
        {lat: 43.249714,lng: -2.54971},
        {lat: 43.311373,lng: -2.68084},
        {lat: 43.274182,lng: -2.832803},
        {lat: 43.2630126,lng: -2.9349852000000283},
        {lat: 43.318248,lng: -3.021197},
        {lat: 43.368822,lng: -3.215635},
        {lat: 43.394792,lng: -3.457514},
        {lat: 43.456032,lng: -3.634938},
        {lat: 43.462306,lng: -3.80998},
        {lat: 43.387947,lng: -4.029218},
        {lat: 43.385931,lng: -4.211553},
        {lat: 43.381307,lng: -4.397058},
        {lat: 43.421148,lng: -4.756216},
        {lat: 43.440517,lng: -4.965447},
        {lat: 43.481887,lng: -5.22731}, ////
        {lat: 43.498857,lng: -5.381195},
        {lat: 43.410523,lng: -5.55827},
        {lat: 43.361915,lng: -5.849389},
        {lat: 43.557952,lng: -5.924665},
        {lat: 43.561377,lng: -6.229797},
        {lat: 43.544639,lng: -6.388265},
        {lat: 43.54509,lng: -6.668284},
        {lat: 43.570233,lng: -6.94391},
        {lat: 43.533679,lng: -7.040349},
        {lat: 43.472102,lng: -7.300544},
        {lat: 43.368074,lng: -7.467947},
        {lat: 43.29749,lng: -7.680772},
        {lat: 43.176328,lng: -7.75661},
        {lat: 43.040027,lng: -8.020866},
        {lat: 42.929688,lng: -8.160784},
        {lat: 42.878213,lng: -8.544845},
        ];
        43.243874 -4.561475
    var norte = new google.maps.Polyline({
    path: norte,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 6
  });
  $('#m-norte').click(function() {
    norte.setMap(map);
});

  
    var frances = [
        {lat: 43.163141, lng: -1.23811},
        {lat: 43.009177, lng: -1.31951},
        {lat: 42.90111, lng: -1.542951},
        ];
    
    var frances = new google.maps.Polyline({
    path: frances,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 6
    });
};






       



