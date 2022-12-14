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

function selectAll(selector, parent = document) {  
    return parent.querySelectorAll(selector);
}

/**-----------------------------------DATA------------------------------------ */

const longitudeCoords = select('.longitude');
const latitudeCoords = select('.latitude');

const dialog = select('dialog');
const aboutUs = select('.about');

const overlay = select('.overlay');
const fly = select('#fly');

// Map interface handlers
const scrollZoom = 'scrollZoom';
const boxZoom = 'boxZoom';
const doubleClickZoom = 'doubleClickZoom';
const dragRotate = 'dragRotate';

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
        zoom: 15, // starting zoom,
        pitch: 60 // pitch in degrees
    });
    
    overlay.style.display = 'none';
    fly.style.display = 'block';
    const watermark1 = select('.mapboxgl-ctrl-bottom-left');
    const watermark2 = select('.mapboxgl-ctrl-bottom-right');
    watermark1.style.display = 'none';
    watermark2.style.display = 'none';

    onEvent('click', fly, function(){
        // Fly to center location
        map.flyTo({
            center: [longitude, latitude],
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    });

    //disable scrollZoom handlers
    map[scrollZoom].disable();
    map[boxZoom].disable();
    map[doubleClickZoom].disable();
    map[dragRotate].enable();

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
    
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

/**--------------------------------------------------------------------------- */

/**--------------------------About Us Slideshow------------------------------- */

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = selectAll('.slides');
    let dots = selectAll('.dot');

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

/**--------------------------------------------------------------------------- */