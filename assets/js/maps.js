
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
    addedMarkers.forEach(function (m) {
        m.setMap(null);
    });
    addedMarkers = [];
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

// Gets walking routes(frances) upon request
$('#m-fran').click(function()  {
    clearMarkers();
    addMarkersToMap(getCoordinatesFrances());
    panToRoute({lat: 42.789026,lng: -4.847439}, 7.5);
    $('#cont-hd').text('Saint-Jean-Pied-de-Port - Santiago de Compostella')
    $('#sec-line').text('Click on the markers to see the name and location')
    $('#img-cw').attr("src", "assets/images/frances.jpg" )
    $('#cont-p').text("In the small medieval french town of St-Jean-de-Port lies the start of Europe's most famous long-distance walking route: the Camino Frances. This has always been the route from where most pilgrims visiting Santiago would come from. High in the Pyrean mountains this adventure starts and will test the capabillities of every pilgrim who dares brave it. For those who have proven their worth lies rewards, for when you descend from the mountains, green, vineyard covered hills lie in wait. Pilgrims will visit cities with their own distinct traditions like Pamplona, Gothic churches like in Burgos before reaching the royal city of León. Crusader castles, sleepy towns and fields of grain, as far as the eye can see. That is the Camino Frances. That is, untill the final destination finally shows itself: Santiago! ")
});
// Gets walking routes(norte) upon request
$('#m-norte').click(function () {
    clearMarkers();
    addMarkersToMap(getCoordinatesNorte());
    panToRoute({lat: 43.249719,lng: -5.778528}, 7.5);
    $('#cont-hd').text('Irun - Santiago de Compostella')
    $('#sec-line').text('Click on the markers to see the name and location')
    $('#img-cw').attr("src", "assets/images/norte.jpg" )
    $('#cont-p').text("The Camino del Norte stretches all along the northern coast of Spain. This route was often walked by Dutch and Flemish pilgrims who arrived by ship in one of the Spanish ports. Inbetween the snowy mountain peaks of Picos de Europa and the atlantic coast lays this narrow route of impeccable beauty. From the white beaches of San Sebastian pilgrims will walk along small fishing villages and slowly but surely go more inland into the hills. The route returns towards the coast into the city of Bilbao. Upon reaching La Casquita the pilgrim will have to choose whether to stay on the Camino del Norte or to go to Oviedo and join the Camino Primitivo.")
});
// Gets walking routes(primitivo) upon request
$('#m-prim').click(function () {
    clearMarkers();
    addMarkersToMap(getCoordinatesPrimitivo());
    panToRoute({lat: 43.009738,lng: -7.556758}, 8);
    $('#cont-hd').text('Oviedo - Santiago de Compostella')
    $('#sec-line').text('Click on the markers to see the name and location')
    $('#img-cw').attr("src", "assets/images/primitivo.jpg" )
    $('#cont-p').text("The Camino Primitivo, also known as the 'original' Camino has gained a lot of popularity in recent years. Roughly half of this route is through mountainous regions and thus allows for beautiful views during the hike. Because of this, the route is also considered the most challenging of the Caminos. King Alfonso II of Asturias was the first to choose this route to get to Santiago. Upon arriving, he built a church over the grave of apostle Jacobus and by doing so encouraged pilgrimage. On the way you will cross La Hospitales, a gorgeous chain of hills and mountains, as well as the ancient roman city of Lugo with great city walls that still stand to this day. Upon reaching Melide the route will merge with the Camino Frances untill it ends in Santiago.")
});
$('#i-flor').click(function () {
    clearMarkers();
    addMarkersToMap(getCoordinatesFlor());
    panToRoute({lat: 43.732501,lng: 11.555781}, 9.5);
    $('#cont-hd').text('Florence - Sansepolcro')
    $('#sec-line').text('Click on the markers to see the name and location')
    $('#img-cw').attr("src", "assets/images/florence.jpg" )
    $('#cont-p').text("The Saint Franciscus route starts in the beautiful city of Florence, birthplace of the Renaissance. Through this route you will walk in the footsteps of Franciscus from the banks of the Arno, over the green hills of Tuscany untill you reach the banks of the Tiber river. During the route you will encouter multiple sacred places dedicated to the life of Franciscus, for instance, the monastery of La Verna. The route will be concluded in the ancient city of Sansepolcro, famous for it's narrow streets and breathtaking cathedral. ")
});

$('#i-sans').click(function () {
    clearMarkers();
    addMarkersToMap(getCoordinatesSanse());
    panToRoute({lat: 43.305573,lng: 12.327868}, 9.5);
    $('#cont-hd').text('Sansepolcro - Assisi')
    $('#sec-line').text('Click on the markers to see the name and location')
    $('#img-cw').attr("src", "assets/images/tuscany.jpg" )
    $('#cont-p').text("This route leads you through the northern part of Umbria, the green heart of Italy. The path now enters a broad valley surrounded by green hills and small villages. During this part of the trip, you will pass the small medieval cities of Citerna, Citta di Castello and Gubbio. You'll finish in the city of Assisi, birthplace of saint Franciscus. Assisi is often referred to as an 'open air museum' because of its city walls, castle, churches and small streets. A beautiful place to end this part of the route. ")
});

$('#i-assi').click(function () {
    clearMarkers();
    addMarkersToMap(getCoordinatesAssisi());
    panToRoute({ lat: 42.740488, lng: 12.7378}, 8.8);
    $('#cont-hd').text('Assisi - Rieti')
    $('#sec-line').text('Click on the markers to see the name and location')
    $('#img-cw').attr("src", "assets/images/umbria-south.jpg" )
    $('#cont-p').text("The trek starts with leaving the famous pilgrims resort of Assisi and into the hills of southern Umbria. Here you will encounter spectacular sights overseeing the valley of the river Tiber, the green hills of Spoleto and the medieval city sharing the same name. Another great sight will be the Marmore waterfalls, one of Europe's most impressive natural spots. A unique combination of nature and culture will make this route worthy of rememberance. ")
});

$('#i-riet').click(function () {
    clearMarkers();
    addMarkersToMap(getCoordinatesRieti());
    panToRoute({lat: 42.09054,lng: 12.774746}, 9);
    $('#cont-hd').text('Rieti - Roma')
    $('#sec-line').text('Click on the markers to see the name and location')
    $('#img-cw').attr("src", "assets/images/roma.jpg" )
    $('#cont-p').text(" The Via Salaria is part of an ancient network of roads created by the Sabins centuries before Rome became a superpower. The Via is still the most important road between Rieti and Roma thirty centuries after it was established. This last part of the saint Franciscus route leads from the center of Rieti to the heart of the Vatican. The road leads through olive-tree covered hills aswell as historical villages and small towns. The route avoids the busy roads into Rome and instead takes you to the Saint Peter's square using a network of pedestrian paths.  ")
});
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

function getCoordinatesFlor() {
    return [
        { coords : { lat: 43.7695604, lng: 11.25581360000001}, content: "<p>Florence</p><button onclick='zoomToCity({ lat: 43.7695604, lng: 11.25581360000001});'>Go to</button>" },
        { coords : { lat: 43.773943, lng: 11.437915}, content: "<p>Pontassieve</p><button onclick='zoomToCity({ lat: 43.773943, lng: 11.437915});'>Go to</button>" },
        { coords : { lat: 43.781438, lng: 11.597127}, content: "<p>Consuma</p><button onclick='zoomToCity({ lat: 43.781438, lng: 11.597127});'>Go to</button>" },
        { coords : { lat: 43.804103, lng: 11.708622}, content: "<p>Stia</p><button onclick='zoomToCity({ lat: 43.804103, lng: 11.708622});'>Go to</button>" },
        { coords : { lat: 43.79466, lng: 11.877848}, content: "<p>Badia Prataglia</p><button onclick='zoomToCity({ lat: 43.79466, lng: 11.877848});'>Go to</button>" },
        { coords : { lat: 43.700812, lng: 11.937751}, content: "<p>Via del Santuario della Verna</p><button onclick='zoomToCity({ lat: 43.700812, lng: 11.937751});'>Go to</button>" },
        { coords : { lat: 43.667571, lng: 12.043238}, content: "<p>Pieve Santo Stefano</p><button onclick='zoomToCity({ lat: 43.667571, lng: 12.043238});'>Go to</button>" },
        { coords : { lat: 43.572621, lng: 12.138261}, content: "<p>Sansepolcro</p><button onclick='zoomToCity({ lat: 43.572621, lng: 12.138261});'>Go to</button>" }, 
    ]
}

function getCoordinatesSanse() {
    return [
        { coords : { lat: 43.572621, lng: 12.138261}, content: "<p>Sansepolcro</p><button onclick='zoomToCity({ lat: 43.572621, lng: 12.138261});'>Go to</button>" },
        { coords : { lat: 43.498013, lng: 12.117846}, content: "<p>Citerna</p><button onclick='zoomToCity({ lat: 43.498013, lng: 12.117846});'>Go to</button>" },
        { coords : { lat: 43.4639783, lng: 12.2404869}, content: "<p>Città di Castello</p><button onclick='zoomToCity({ lat: 43.4639783, lng: 12.2404869});'>Go to</button>" },
        { coords : { lat: 43.442952, lng: 12.448589}, content: "<p>Pietralunga</p><button onclick='zoomToCity({ lat: 43.442952, lng: 12.448589});'>Go to</button>" },
        { coords : { lat: 43.351319, lng: 12.575317}, content: "<p>Gubbio</p><button onclick='zoomToCity({ lat: 43.351319, lng: 12.575317});'>Go to</button>" },
        { coords : { lat: 43.216667, lng: 12.583333}, content: "<p>Biscina</p><button onclick='zoomToCity({ lat: 43.216667, lng: 12.583333});'>Go to</button>" },
        { coords : { lat: 43.0707017, lng: 12.619596600000023}, content: "<p>Assisi</p><button onclick='zoomToCity({ lat: 43.0707017, lng: 12.619596600000023});'>Go to</button>" },
    ]
}

function getCoordinatesAssisi() {
    return [
        { coords : { lat: 43.0707017, lng: 12.619596600000023}, content: "<p>Assisi</p><button onclick='zoomToCity({ lat: 43.0707017, lng: 12.619596600000023});'>Go to</button>" },
        { coords : { lat: 42.9508683, lng: 12.701474899999994}, content: "<p>Foligno</p><button onclick='zoomToCity({ lat: 42.9508683, lng: 12.701474899999994});'>Go to</button>" },
        { coords : { lat: 42.829422, lng: 12.784993}, content: "<p>Castello di Campello</p><button onclick='zoomToCity({ lat: 42.829422, lng: 12.784993});'>Go to</button>" },
        { coords : { lat: 42.740488, lng: 12.7378}, content: "<p>Spoleto</p><button onclick='zoomToCity({ lat: 42.740488, lng: 12.7378});'>Go to</button>" },
        { coords : { lat: 42.684665, lng: 12.817947}, content: "<p>Ceselli</p><button onclick='zoomToCity({ lat: 42.684665, lng: 12.817947});'>Go to</button>" },
        { coords : { lat: 42.584025, lng: 12.768178}, content: "<p>Arrone</p><button onclick='zoomToCity({ lat: 42.584025, lng: 12.768178});'>Go to</button>" },
        { coords : { lat: 42.536306, lng: 12.765276}, content: "<p>Piediluco</p><button onclick='zoomToCity({ lat: 42.536306, lng: 12.765276});'>Go to</button>" },
        { coords : { lat: 42.501206, lng: 12.887802}, content: "<p>Poggio Bustone</p><button onclick='zoomToCity({ lat: 42.501206, lng: 12.887802});'>Go to</button>" },
        { coords : { lat: 42.404509, lng: 12.856728}, content: "<p>Rieti</p><button onclick='zoomToCity({ lat: 42.404509, lng: 12.856728});'>Go to</button>" },
    ]
}

function getCoordinatesRieti() {
    return [
        { coords : { lat: 42.404509, lng: 12.856728}, content: "<p>Rieti</p><button onclick='zoomToCity({ lat: 42.404509, lng: 12.856728});'>Go to</button>" },
        { coords : { lat: 42.253139, lng: 12.845473}, content: "<p>Poggio San Lorenzo</p><button onclick='zoomToCity({ lat: 42.253139, lng: 12.845473});'>Go to</button>" },
        { coords : { lat: 42.174873, lng: 12.814381}, content: "<p>Ponticelli</p><button onclick='zoomToCity({ lat: 42.174873, lng: 12.814381});'>Go to</button>" },
        { coords : { lat: 42.051779, lng: 12.620287}, content: "<p>Monterotondo</p><button onclick='zoomToCity({ lat: 42.051779, lng: 12.620287});'>Go to</button>" },
        { coords : { lat: 41.936312, lng: 12.538321}, content: "<p>Montesacro</p><button onclick='zoomToCity({ lat: 41.936312, lng: 12.538321});'>Go to</button>" },
        { coords : { lat: 41.9027835, lng: 12.4963655}, content: "<p>Rome</p><button onclick='zoomToCity({ lat: 41.9027835, lng: 12.4963655});'>Go to</button>" },
    ]
}
        // { coords : { lat: , lng: }, content: "<p></p><button onclick='zoomToCity({ lat: , lng: });'>Go to</button>" },