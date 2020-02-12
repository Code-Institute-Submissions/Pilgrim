
function initMap(){
    // Map starting options
    var options = {
        zoom: 5,
        center: {lat:41.902782, lng: 12.496366}
    };
    // New map, targets the #map div
    var map = new google.maps.Map(document.getElementById('map'), options);

    
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

    } 

}