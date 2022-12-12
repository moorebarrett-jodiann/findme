'use strict';

/*--------------------------------------------------------------------------- *
 * Find Me Geolocation Website
 * Jodi-Ann Barrett
 * 
 * */

// Utility Functions 
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
  }
  
// Select HTML element by class, id and html element
function select(selector, parent = document) {  
    return parent.querySelector(selector);
}

/**--------------------------------------------------------------------------- */

/**-----------------------------------DATA------------------------------------ */

const longitudeCoords = select('.longitude');
const latitudeCoords = select('.latitude');

const dialog = select('dialog');
const aboutUs = select('.about');

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9kaWFubmJhcnJldHQiLCJhIjoiY2xiZ3JxMzJmMGFjcDN2bW1ydjlpc2NjYyJ9.pgkAM_oUNu6TpYp8ScH9Ow';
const options = {
    enableHighAccuracy: true
}
/**--------------------------------------------------------------------------- */

/**-----------------------------RENDER MAP------------------------------------ */

function getLocation(position) {
    const {longitude, latitude} = position.coords; 
    longitudeCoords.innerText = longitude;
    latitudeCoords.innerText = latitude;    
    
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [longitude, latitude], // starting position [lng, lat]
        zoom: 12, // starting zoom
    });
    
    const watermark1 = select('.mapboxgl-ctrl-bottom-left');
    const watermark2 = select('.mapboxgl-ctrl-bottom-right');
    watermark1.style.display = 'none';
    watermark2.style.display = 'none';

    // Default Marker and add it to the map.
    const marker = new mapboxgl.Marker({ color: '#232ED1' })
    .setLngLat([longitude, latitude])
    .addTo(map);
}

function errorHandler(error) {
    console.log(error.message);
}

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocation, errorHandler, options);
} else {
    console.log('Geolocation is not supported by your browser');
}

/**---------------------------About Us Modal------------------------------- */

onEvent('click', aboutUs, function () {
    dialog.showModal();
});

onEvent('click', dialog, function(event) {
    const rect = this.getBoundingClientRect();

    if(event.clientY < rect.top || event.clientY > rect.bottom || 
        event.clientX < rect.left || event.clientX < rect.right) {
        dialog.close();
    }
});
