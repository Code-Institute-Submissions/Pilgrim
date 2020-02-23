
// Global scope variables 
var map;
var service;

var infoWindow;
var searchBox;
var searchElement = document.getElementById('pac-input');

var norte;
var frances;
var primitivo;

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
// Initial function to call all functions needed upon initial load-up
function init() {
    initMap();
    setSearchbox();
    setListeners();
    // setPolylines();
}
// Initiates basic google maps
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), options);
}
// creates SearchBox for Maps
function setSearchbox() {
    searchBox = new google.maps.places.SearchBox(searchElement);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchElement);
}
// Adds listeners for bound and place change upon search
function setListeners() {
    map.addListener('bounds_changed', function()  {
        searchBox.setBounds(map.getBounds());
    });
    searchBox.addListener('places_changed', function () {
        searchPlaces();
    });
}
// Gets walking routes(frances) upon request
$('#m-fran').click(function()  {
    clearMarkers();
    addMarkersToMap(getCoordinatesFrances());
    panToRoute({lat: 42.789026,lng: -4.847439}, 7,5)
});
// Gets walking routes(norte) upon request
$('#m-norte').click(function () {
    clearMarkers();
    addMarkersToMap(getCoordinatesNorte());
    panToRoute({lat: 43.249719,lng: -5.778528}, 7,5)
});

$('#m-prim').click(function () {
    clearMarkers();
    addMarkersToMap(getCoordinatesPrimitivo());
    panToRoute({lat: 43.009738,lng: -7.556758}, 8,5)
});

// adds markers to coordinates of route passed as argument
function addMarkersToMap(markers) {
    markers.forEach(function(marker)  {
        marker = new google.maps.Marker({
            position: marker.coords,
            map: map,
            content: marker.content,
            
        });
        if(marker.content) {
        var infoWindow = new google.maps.InfoWindow({
                content : marker.content
            });
            marker.addListener('click', function(){
                infoWindow.open(map, marker)
            });
        }
        addedMarkers.push(marker);
    });
}
// Search place function
function searchPlaces() {
    // place to be found is in the searchbox
    var places = searchBox.getPlaces();
    //clear previous markers
    if (addedMarkers.length > 1){
        clearMarkers();
    }


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
// Change bounds to Place
function goToPlace() {
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place)  {
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }
    });
}
// get Icon for Place (defined by Google Places)
function getIconForPlace(place) {
    return {
        url: getIconUrl(place),
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
    };
}
// get custom icon
function getIconUrl(place) {
    return place ? place.icon : "";
}
// add marker for searched place
function markerForSearchedPlace() {
    markers.push(new google.maps.Marker({
        map: map,
        icon: getIconForPlace(place),
        title: place.name,
        position: place.geometry.location
        })
    );
}

function panToLocation() {
    if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
    } else {
        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
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
        marker.setIcon(props.iconImage);
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
// gets Icon information from Google Maps Places
function getIcon(place) {
    return {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
}
// gets markers from place argument
function getMarkerFromSearch(place) {
   return new google.maps.Marker({
                map: map,
                icon: getIcon(place),
                title: place.name,
                position: place.geometry.location
            });
}
// clear markers on the map
function clearMarkers() {
    console.log(addedMarkers.length);
    console.log(addedMarkers);


    addedMarkers.forEach(function (m) {
        m.setMap(null);
    });
    addedMarkers = [];
}


function getCoordinatesFrances() {
    return [
        { coords :  { lat: 43.163141, lng: -1.23811 }, content: "<p>Saint-Jean-Pied-de-Port</p><button onclick='zoomToCity({ lat:43.163141, lng:-1.23811});'>Go to</button>" },
        { coords :  { lat: 43.009177, lng: -1.31951 }, content: "<p>Roncesvalles</p><button onclick='zoomToCity({ lat: 43.009177, lng: -1.31951});'>Go to</button>" },
        { coords :  { lat: 42.90111, lng: -1.542951 }, content: "<p>Larrasoaña</p><button onclick='zoomToCity({ lat: 42.90111, lng: -1.542951});'>Go to</button>" },
        { coords :  { lat: 42.812526, lng: -1.6457745 }, content: "<p>Pamplona</p><button onclick='zoomToCity({ lat: 42.812526, lng: -1.6457745});'>Go to</button>" },
        { coords :  { lat: 42.672304, lng: -1.813594 }, content: "<p>Puente la Reina</p><button onclick='zoomToCity({ lat: 42.672304, lng: -1.813594});'>Go to</button>" },
        { coords :  { lat: 42.568487, lng: -2.191654 }, content: "<p>Los Arcos</p><button onclick='zoomToCity({ lat: 42.568487, lng: -2.191654});'>Go to</button>" },
        { coords :  { lat: 42.46272, lng: -2.444985 }, content: "<p>Logroño</p><button onclick='zoomToCity({ lat: 42.46272, lng: -2.444985});'>Go to</button>" },
        { coords :  { lat: 42.416741, lng: -2.729462 }, content: "<p>Nájera</p><button onclick='zoomToCity({ lat: 42.416741, lng: -2.729462});'>Go to</button>" },
        { coords :  { lat: 42.440181, lng: -2.957549 }, content: "<p>Santo Domingo de la Calzada</p><button onclick='zoomToCity({ lat: 42.440181, lng: -2.957549});'>Go to</button>" },
        { coords :  { lat: 42.419568, lng: -3.191775 }, content: "<p>Belorado</p><button onclick='zoomToCity({ lat: 42.419568, lng: -3.191775});'>Go to</button>" },
        { coords :  { lat: 42.37554, lng: -3.435795 }, content: "<p>San Juan de Ortega</p><button onclick='zoomToCity({ lat: 42.37554, lng: -3.435795});'>Go to</button>" },
        { coords :  { lat: 42.343993, lng: -3.696906 }, content: "<p>Burgos</p><button onclick='zoomToCity({ lat: 42.343993, lng: -3.696906});'>Go to</button>" },
        { coords :  { lat: 42.338628, lng: -3.926491 }, content: "<p>Hornillos del Camino</p><button onclick='zoomToCity({ lat: 42.338628, lng: -3.926491});'>Go to</button>" },
        { coords :  { lat: 42.288482, lng: -4.14242 }, content: "<p>Castrojeriz</p><button onclick='zoomToCity({ lat: 42.288482, lng: -4.14242});'>Go to</button>" },
        { coords :  { lat: 42.267633, lng: -4.40535 }, content: "<p>Frómista</p><button onclick='zoomToCity({ lat: 42.267633, lng: -4.40535});'>Go to</button>" },
        { coords :  { lat: 42.337338, lng: -4.602433 }, content: "<p>Carrión de los Condes</p><button onclick='zoomToCity({ lat: 42.337338, lng: -4.602433});'>Go to</button>" },
        { coords :  { lat: 42.328756, lng: -4.804443 }, content: "<p>Calzadilla de la Cueza</p><button onclick='zoomToCity({ lat: 42.328756, lng: -4.804443});'>Go to</button>" },
        { coords :  { lat: 42.37096, lng: -5.029949 }, content: "<p>Sahagún</p><button onclick='zoomToCity({ lat: 42.37096, lng: -5.029949});'>Go to</button>" },
        { coords :  { lat: 42.497947, lng: -5.41621 }, content: "<p>Mansilla de las Mulas</p><button onclick='zoomToCity({ lat: 42.497947, lng: -5.41621});'>Go to</button>" },
        { coords :  { lat: 42.598726, lng: -5.567096 }, content: "<p>León</p><button onclick='zoomToCity({ lat: 42.598726, lng: -5.567096});'>Go to</button>" },
        { coords :  { lat: 42.462725, lng: -5.881549 }, content: "<p>Hospital de Órbigo</p><button onclick='zoomToCity({ lat: 42.462725, lng: -5.881549});'>Go to</button>" },
        { coords :  { lat: 42.45493, lng: -6.053251 }, content: "<p>Astorga</p><button onclick='zoomToCity({ lat: 42.45493, lng: -6.053251});'>Go to</button>" },
        { coords :  { lat: 42.481138, lng: -6.284736 }, content: "<p>Rabanal del Camino</p><button onclick='zoomToCity({ lat: 42.481138, lng: -6.284736});'>Go to</button>" },
        { coords :  { lat: 42.549996, lng: -6.598259 }, content: "<p>Ponferrada</p><button onclick='zoomToCity({ lat: 42.549996, lng: -6.598259});'>Go to</button>" },
        { coords :  { lat: 42.608394, lng: -6.808554 }, content: "<p>Villafranca del Bierzo</p><button onclick='zoomToCity({ lat: 42.608394, lng: -6.808554});'>Go to</button>" },
        { coords :  { lat: 42.707816, lng: -7.043627 }, content: "<p>O Cebreiro</p><button onclick='zoomToCity({ lat: 42.707816, lng: -7.043627});'>Go to</button>" },
        { coords :  { lat: 42.75662, lng: -7.239622 }, content: "<p>Triacastela</p><button onclick='zoomToCity({ lat: 42.75662, lng: -7.239622});'>Go to</button>" },
        { coords :  { lat: 42.780839, lng: -7.414077 }, content: "<p>Sarria</p><button onclick='zoomToCity({ lat: 42.780839, lng: -7.414077});'>Go to</button>" },
        { coords :  { lat: 42.807428, lng: -7.61583 }, content: "<p>Portomarín</p><button onclick='zoomToCity({ lat: 42.807428, lng: -7.61583});'>Go to</button>" },
        { coords :  { lat: 42.873467, lng: -7.868759 }, content: "<p>Palas de Rei</p><button onclick='zoomToCity({ lat: 42.873467, lng: -7.868759});'>Go to</button>" },
        { coords :  { lat: 42.929688, lng: -8.160784 }, content: "<p>Arzúa</p><button onclick='zoomToCity({ lat: 42.929688, lng: -8.160784});'>Go to</button>" },
        { coords :  { lat: 42.878213, lng: -8.544845 }, content: "<p>Santiago de Compostela</p><button onclick='zoomToCity({ lat: 42.878213, lng: -8.544845});'>Go to</button>" },
    ];
}

function getCoordinatesNorte() {
    return [
        { coords :  { lat: 43.338147, lng: -1.78885 }, content: "<p>Irun</p><button onclick='zoomToCity({ lat: 43.338147, lng:-1.78885});'>Go to</button>" }, 
        { coords :  { lat: 43.312691, lng: -1.993332 }, content: "<p>San Sebastián</p><button onclick='zoomToCity({ lat: 43.312691, lng: -1.993332});'>Go to</button>" },
        { coords :  { lat: 43.294140, lng: -2.353931 }, content: "<p>Deba</p><button onclick='zoomToCity({ lat: 43.294140, lng: -2.353931});'>Go to</button>" },
        { coords :  { lat: 43.249714, lng: -2.54971 }, content: "<p>Cenarruza</p><button onclick='zoomToCity({ lat: 43.249714, lng: -2.54971});'>Go to</button>" },
        { coords :  { lat: 43.311373, lng: -2.68084 }, content: "<p>Gernika</p><button onclick='zoomToCity({ lat: 43.311373, lng: -2.68084});'>Go to</button>" },
        { coords :  { lat: 43.274182, lng: -2.832803 }, content: "<p>Lezama</p><button onclick='zoomToCity({ lat: 43.274182, lng: -2.832803});'>Go to</button>" },
        { coords :  { lat: 43.2630126, lng: -2.9349852000000283 }, content: "<p>Bilbao</p><button onclick='zoomToCity({ lat:43.2630126, lng: -2.9349852000000283});'>Go to</button>" },
        { coords :  { lat: 43.318248, lng: -3.021197 }, content: "<p>Portugalete</p><button onclick='zoomToCity({ lat: 43.318248, lng: -3.021197});'>Go to</button>" },
        { coords :  { lat: 43.368822, lng: -3.215635 }, content: "<p>Castro Urdiales</p><button onclick='zoomToCity({ lat: 43.368822, lng: -3.215635});'>Go to</button>" },
        { coords :  { lat: 43.394792, lng: -3.457514 }, content: "<p>Colindres</p><button onclick='zoomToCity({ lat: 43.394792, lng: -3.457514});'>Go to</button>" },
        { coords :  { lat: 43.456032, lng: -3.634938 }, content: "<p>Bareyo</p><button onclick='zoomToCity({ lat: 43.456032, lng: -3.634938});'>Go to</button>" },
        { coords :  { lat: 43.462306, lng: -3.80998 }, content: "<p>Santander</p><button onclick='zoomToCity({ lat: 43.462306, lng: -3.80998});'>Go to</button>" },
        { coords :  { lat: 43.387947, lng: -4.029218 }, content: "<p>Requejada</p><button onclick='zoomToCity({ lat: 43.387947, lng: -4.029218});'>Go to</button>" },
        { coords :  { lat: 43.385931, lng: -4.211553 }, content: "<p>Cóbreces</p><button onclick='zoomToCity({ lat: 43.385931, lng: -4.211553});'>Go to</button>" },
        { coords :  { lat: 43.381307, lng: -4.397058 }, content: "<p>San Vicente de la Barquera</p><button onclick='zoomToCity({ lat: 43.381307, lng: -4.397058});'>Go to</button>" },
        { coords :  { lat: 43.421148, lng: -4.756216 }, content: "<p>Llanes</p><button onclick='zoomToCity({ lat: 43.421148, lng: -4.756216});'>Go to</button>" },
        { coords :  { lat: 43.440517, lng: -4.965447}, content: "<p>Silviella</p><button onclick='zoomToCity({ lat: 43.440517, lng: -4.965447});'>Go to</button>" },
        { coords :  { lat: 43.481887, lng: -5.22731 }, content: "<p>La Isla</p><button onclick='zoomToCity({ lat: 43.481887, lng: -5.22731});'>Go to</button>" },
        { coords :  { lat: 43.498857, lng: -5.381195 }, content: "<p>Sebrayo</p><button onclick='zoomToCity({ lat: 43.498857, lng: -5.381195});'>Go to</button>" },
        { coords :  { lat: 43.410523, lng: -5.55827 }, content: "<p>La Vega</p><button onclick='zoomToCity({ lat: 43.410523, lng: -5.55827});'>Go to</button>" },
        { coords :  { lat: 43.410523, lng: -5.55827 }, content: "<p>Gijón</p><button onclick='zoomToCity({ lat: 43.532202, lng: -5.66112});'>Go to</button>" },
        { coords :  { lat: 43.557952, lng: -5.924665 }, content: "<p>Avilés</p><button onclick='zoomToCity({ lat: 43.557952, lng: -5.924665});'>Go to</button>" },
        { coords :  { lat: 43.561377, lng: -6.229797 }, content: "<p>Soto de Luiña</p><button onclick='zoomToCity({ lat: 43.561377, lng: -6.229797});'>Go to</button>" },
        { coords :  { lat: 43.544639, lng: -6.388265 }, content: "<p>Cadavedo</p><button onclick='zoomToCity({ lat: 43.544639, lng: -6.388265});'>Go to</button>" },
        { coords :  { lat: 43.54509, lng: -6.668284 }, content: "<p>Piñera</p><button onclick='zoomToCity({ lat: 43.54509, lng: -6.668284});'>Go to</button>" },
        { coords :  { lat: 43.570233, lng: -6.94391 }, content: "<p>Tapia de Casariego</p><button onclick='zoomToCity({ lat: 43.570233, lng: -6.94391});'>Go to</button>" },
        { coords :  { lat: 43.533679, lng: -7.040349 }, content: "<p>Ribadeo</p><button onclick='zoomToCity({ lat: 43.533679, lng: -7.040349});'>Go to</button>" },
        { coords :  { lat: 43.472102, lng: -7.300544 }, content: "<p>Lourenzá</p><button onclick='zoomToCity({ lat: 43.472102, lng: -7.300544});'>Go to</button>" },
        { coords :  { lat: 43.368074, lng: -7.467947 }, content: "<p>Gontán</p><button onclick='zoomToCity({ lat: 43.368074, lng: -7.467947});'>Go to</button>" },
        { coords :  { lat: 43.29749, lng: -7.680772 }, content: "<p>Vilalba</p><button onclick='zoomToCity({ lat: 43.29749, lng: -7.680772});'>Go to</button>" },
        { coords :  { lat: 43.176328, lng: -7.75661 }, content: "<p>Baamonde</p><button onclick='zoomToCity({ lat: 43.176328, lng: -7.75661 });'>Go to</button>" },
        { coords :  { lat: 43.040027, lng: -8.020866 }, content: "<p>Sobrado</p><button onclick='zoomToCity({ lat: 43.040027, lng: -8.020866});'>Go to</button>" },
        { coords :  { lat: 42.929688, lng: -8.160784 }, content: "<p>Arzúa</p><button onclick='zoomToCity({ lat: 42.929688, lng: -8.160784});'>Go to</button>" },
        { coords :  { lat: 42.878213, lng: -8.544845 }, content: "<p>Santiago de Compostella</p><button onclick='zoomToCity({ lat: 42.878213, lng: -8.544845});'>Go to</button>" },
    ];
}

function getCoordinatesPrimitivo() {
    return [
        { coords : { lat: 43.361915, lng: -5.849389}, content: "<p>Oviedo</p><button onclick='zoomToCity({ lat: 43.361915, lng: -5.849389});'>Go to</button>" },  
        { coords : { lat: 43.387055, lng: -6.074386}, content: "<p>Grado</p><button onclick='zoomToCity({ lat: 43.387055, lng: -6.074386});'>Go to</button>" },
        { coords : { lat: 43.409305, lng: -6.262157}, content: "<p>Salas</p><button onclick='zoomToCity({ lat: 43.409305, lng: -6.262157});'>Go to</button>" },
        { coords : { lat: 43.334333, lng: -6.411729}, content: "<p>Tineo</p><button onclick='zoomToCity({ lat: 43.334333, lng: -6.411729});'>Go to</button>" },
        { coords : { lat: 43.271711, lng: -6.611051}, content: "<p>Pola de Allande</p><button onclick='zoomToCity({ lat: 43.271711, lng: -6.611051});'>Go to</button>" },
        { coords : { lat: 43.233811, lng: -6.767467}, content: "<p>Berducedo</p><button onclick='zoomToCity({ lat: 43.233811, lng: -6.767467});'>Go to</button>" },
        { coords : { lat: 43.218425, lng: -6.875797}, content: "<p>Grandas de Salime</p><button onclick='zoomToCity({ lat: 43.218425, lng: -6.875797});'>Go to</button>" },
        { coords : { lat: 43.12471,  lng: -7.068857}, content: "<p>A Fonsagrada</p><button onclick='zoomToCity({ lat: 43.12471, lng: -7.068857});'>Go to</button>" },
        { coords : { lat: 43.016288, lng: -7.245874}, content: "<p>O Cadavo Baleira</p><button onclick='zoomToCity({ lat: 43.016288, lng: -7.245874});'>Go to</button>" },
        { coords : { lat: 43.009738, lng: -7.556758}, content: "<p>Lugo</p><button onclick='zoomToCity({ lat: 43.009738, lng: -7.556758});'>Go to</button>" },
        { coords : { lat: 42.946567, lng: -7.820734}, content: "<p>Ferreira</p><button onclick='zoomToCity({ lat: 42.946567, lng: -7.820734});'>Go to</button>" },
        { coords : { lat: 42.913951, lng: -8.014692}, content: "<p>Melide</p><button onclick='zoomToCity({ lat: 42.913951, lng: -8.014692});'>Go to</button>" },
        { coords : { lat: 42.929688, lng: -8.160784}, content: "<p>Arzua</p><button onclick='zoomToCity({ lat: 42.929688, lng: -8.160784});'>Go to</button>"},
        { coords : { lat: 42.914518, lng: -8.350944}, content: "<p>Rua o Pino</p><button onclick='zoomToCity({ lat: 42.914518, lng: -8.350944});'>Go to</button>" },
        { coords : { lat: 42.878213, lng: -8.544845}, content: "<p>Santiago de Compostella</p><button onclick='zoomToCity({ lat: 42.878213, lng: -8.544845});'>Go to</button>" },
    ];
}

function zoomToCity(coords) {
  map.setOptions({
    center: coords,
    zoom: 15
  });
}

function panToRoute(coords, cam) {
   map.setOptions({
    center: coords,
    zoom: cam
    });
}
