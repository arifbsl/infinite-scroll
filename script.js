const imageContainer = document.getElementById('image-container');
const loader    = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// Unsplash API
const count = 5;
const apiKey   = 'VJcYCMk-AdmqjYUCbLZXjvywdggKjUhanJoQGGKrRnw';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


// Check all images were loaded 
function imageLoaded() {

    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// Helper function to set Attribute on DOM Element
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotosInLinkAndPushInDOM() {
    imagesLoaded = 0;
    totalImages = photoArray.length;
    // Run function for each object in photoArray
    photoArray.forEach((photo) => {
        // Create an <a> tag to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create an <img> tag for photo
        const img = document.createElement('img'); 
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            target: photo.alt_description,
        });


        // Event listener, Check when each is finished loading
        img.addEventListener('load', imageLoaded);


        // Put <img> inside <a>, then put both inside imageContent Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotosFromUnsplashAPI() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        
        displayPhotosInLinkAndPushInDOM()
    } catch (error) {
        // 
    }
}


// Check to see if scrolling near bottom of page, Lode More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotosFromUnsplashAPI();
    }
});




getPhotosFromUnsplashAPI();