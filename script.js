//Unsplash API
const count = 30;
const apiKey = 'KNt_3_bQYKCqxDLQQQ6nFNN8ZSv5rm6dA58DJ3TGR08';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0;
let isReady = false;

//Check the image loading count
function isImageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        isReady = true;
        loader.hidden = true;
    }
}
//Populating the image elements and creating link elements
function displayPhotos() {
    totalImages += photosArray.length;
    photosArray.forEach(photo => {

        const div = document.createElement('div');
        div.setAttribute('id', 'image-' + photo.id);
        div.setAttribute('class', 'image');
        
        const anchor = document.createElement('a');
        anchor.setAttribute('href', photo.links.html);
        anchor.setAttribute('target','_blank');
        anchor.setAttribute('id', photo.id);

        const image = document.createElement('img');
        image.setAttribute('src', photo.urls.regular);
        image.setAttribute('alt',photo.alt_description);
        image.setAttribute('title', photo.alt_description);

        image.addEventListener('load', isImageLoaded);
        
        const icon = document.createElement('i');
        icon.setAttribute('class','fa fa-download');

        anchor.appendChild(image);
        anchor.appendChild(icon)
        div.appendChild(anchor);

        imageContainer.appendChild(div);
    });
}

//Get Photos
async function getPhotos() {
    try{
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();        
    }
    catch(e) {
        console.log(e);
    }
}

//Load more when scrolled to the bottom of the page
window.addEventListener('scroll', () => {
    if((window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) && isReady) {
        isReady = false;
        getPhotos();
    }
    
});

//Call on load
getPhotos();