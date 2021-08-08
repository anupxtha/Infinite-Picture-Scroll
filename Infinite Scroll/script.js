const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];



// Unsplash API
// Making variable with let cause loading less amount of data load faster in slow internet also
let count = 5;
const apiKey = 'wtgRKS1NKfP9Bj_r8yEjAM75zkyY2op2lK3AUH_45cw';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Check if all images were loaded
function imageLoaded(){
  console.log('image Loaded');
  imagesLoaded++;
  if(imagesLoaded === totalImages){
    ready = true;
    console.log('ready = ', ready);
    loader.hidden = true;
    // updating count and apiUrl so that after loaded 5 count of data when scroll load other
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}


// Helper function to set Attributes on DOM Elements
function setElementAttribute(element, attributes){
  for(const key in attributes){
    element.setAttribute(key, attributes[key]);
  }
}


// Create Elements for links & photos, Add to DOM
function displayPhotos(){
  imagesLoaded = 0;  
  totalImages = photosArray.length;
  console.log('total images',totalImages);

  photosArray.forEach((photo)=>{
    // Creating <a> to link to Unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setElementAttribute(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Creating <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setElementAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos From Unsplash API
async function getPhotos(){
  try{
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  }
  catch(error){
    // Catch Error Here
  }
}


// Checking to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready = false;
    getPhotos();
  }
});


// On Load 
getPhotos();

