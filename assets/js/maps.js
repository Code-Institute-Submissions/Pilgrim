
function initMap(){
    // Map starting options
    var options = {
        zoom: 5,
        center: {lat:41.902782, lng: 12.496366}
    };
    // New map, targets the #map div
    var map = new google.maps.Map(document.getElementById('map'), options);
    
    // Array of markers

    var markers = [
        {
        coords:{lat:41.902782,lng:12.496366}
        },
        {
        coords:{lat:42.878212,lng:-8.544844}
        }
    ];
    
    // Loop through markers
    for(var i = 0; i <= markers.length; i++){
        // Add marker
        addMarker(markers[i]);
    }


    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            //icon: props.iconImage
        });

        // Check for custom icon marker
        if(props.iconImage) {
            // set icon image
            marker.setIcon(props.iconImage)
        }
        // Check content
        if(props.content){
            var infoWindow = new google.maps.InfoWindow({
                content:props.content
            });

            marker.addListener('click', function(){
                infoWindow.open(map, marker);
            });
        }

    } 

};

