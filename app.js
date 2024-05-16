////////////////////////////////// GALLERY //////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const gallerySets = document.querySelectorAll('.gallery-set');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');
    let currentSetIndex = 0;

    function updateGallery(newIndex) {
        gallerySets.forEach(set => {
            set.classList.remove('active', 'left', 'right');
        });
        gallerySets[newIndex].classList.add('active');
    }

    function showNextGallery() {
        const nextIndex = (currentSetIndex + 1) % gallerySets.length;
        gallerySets[currentSetIndex].classList.add('left');
        gallerySets[nextIndex].classList.add('right');
        gallerySets[nextIndex].classList.remove('right');
        gallerySets[nextIndex].classList.add('active');

        setTimeout(() => {
            gallerySets[currentSetIndex].classList.remove('active', 'left');
            currentSetIndex = nextIndex;
        }, 500); // Match the transition duration
    }

    function showPreviousGallery() {
        const prevIndex = (currentSetIndex - 1 + gallerySets.length) % gallerySets.length;
        gallerySets[currentSetIndex].classList.add('right');
        gallerySets[prevIndex].classList.add('left');
        gallerySets[prevIndex].classList.remove('left');
        gallerySets[prevIndex].classList.add('active');

        setTimeout(() => {
            gallerySets[currentSetIndex].classList.remove('active', 'right');
            currentSetIndex = prevIndex;
        }, 500); // Match the transition duration
    }

    rightArrow.addEventListener('click', showNextGallery);
    leftArrow.addEventListener('click', showPreviousGallery);
});

////////////////////////////////// MAP //////////////////////////////////
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Getting GPS coordinates from images

// Include ExifR
const exifr = require('exifr');

// Function to get GPS coordinates from images in the active gallery set
async function getActiveGalleryGPSCoordinates() {
    const activeGallery = document.querySelector('.gallery-set.active');
    const images = activeGallery.querySelectorAll('img');
    const coordinates = [];

    for (const img of images) {
        try {
            // Load the image and extract EXIF data
            const data = await exifr.parse(img.src, { gps: true });
            if (data && data.latitude && data.longitude) {
                coordinates.push({
                    latitude: data.latitude,
                    longitude: data.longitude,
                    src: img.src // Reference to the image source
                });
            }
        } catch (error) {
            console.error(`Error reading EXIF data from image ${img.src}:`, error);
        }
    }

    return coordinates;
}

// Example of how to use the function
document.addEventListener('DOMContentLoaded', async () => {
    const gpsCoordinates = await getActiveGalleryGPSCoordinates();
    console.log(gpsCoordinates);
});






