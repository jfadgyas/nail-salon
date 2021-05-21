// Variables
const gallery = document.querySelector('#container__swiper')
let images

// Functions
// Get images (from db?, filter categories?)
const getImages = async () => {
    images = await fetch('../data/gallery.json')
        .then(response => response.json())
    console.log(images)
    showImages()
}

// Bring images to view, LIFO
const showImages = () => {
    images.map((image, index) => {
            gallery.insertAdjacentHTML('afterbegin', 
            `<div
                class='container__swiper__slide pos-2'
                data-pos-0=${-index}
                data-pos-2=${index-images.length}
                style='z-index: ${index-images.length}'>
                <img class='container__swiper__slide__img' src=${image.src}></img>
                <p>${index}${image.text}</p>
            </div>`            
        )
    })
    gallery.querySelector('.pos-2').classList.add('pos-1')
    gallery.querySelector('.pos-2').classList.remove('pos-2')
}

// Slide cards
const scroll = (direction) => {
    console.log(direction)
    if (direction == 'left'){
        const currentImage = gallery.querySelector('.pos-1')
        if (currentImage.nextElementSibling){
            currentImage.classList.add('pos-0')
            currentImage.classList.remove('pos-1')
            currentImage.style.zIndex = currentImage.getAttribute('data-pos-0')
            currentImage.nextElementSibling.classList.add('pos-1')
            currentImage.nextElementSibling.classList.remove('pos-2')
        }
    }
    if (direction == 'right') {
        const currentImage = gallery.querySelector('.pos-1')
        if (currentImage.previousElementSibling){
            currentImage.classList.add('pos-2')
            currentImage.classList.remove('pos-1')
            currentImage.style.zIndex = currentImage.getAttribute('data-pos-2')//`-${zPosition}`
            currentImage.previousElementSibling.classList.add('pos-1')
            currentImage.previousElementSibling.classList.remove('pos-0')
        }
    }
}

// Listeners
document.querySelector('#left').addEventListener('click', e => scroll(e.target.id))
document.querySelector('#right').addEventListener('click', e => scroll(e.target.id))

getImages()