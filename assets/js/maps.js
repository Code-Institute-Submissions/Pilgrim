
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
    directionsDisplay.setMap(map);

    function calcRoute() {
        var start = document.getElementById('route').start.value()
        var end = document.getElementById('route').end.value();
        var request = {
            origin: start,
            destination: end,
            travelMode: 'WALKING'
        };
        directionsService.route(request, function (result, status) {
            if (status == 'OK') {
                directionsRenderer.setDirections(result);
            }
        });
        };

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

    };



