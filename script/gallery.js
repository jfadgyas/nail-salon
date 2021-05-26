// Variables
const gallery = document.querySelector('#container__gallery__swiper')
let images
let swipeStartPos

// Functions
// Get images (from db?, filter categories?)
const getImages = async () => {
    images = await fetch('../data/gallery.json')
        .then(response => response.json())
    showImages()
}

// Bring images to view
const showImages = () => {
    images.map((image, index) => {
            gallery.insertAdjacentHTML('afterbegin', 
            `<div
                class='container__gallery__swiper__slide pos-2'
                data-pos-0=${-index}
                data-pos-2=${index-images.length+1}
                style='z-index: ${index-images.length+1}'>
                <p>${index}${image.text}</p>
                <img class='container__gallery__swiper__slide__img' src=${image.src}></img>
                <div class='container__gallery__swiper__slide__reflection'>
                    <img class='container__gallery__swiper__slide__img' src=${image.src}></img>
                </div>
            </div>`            
        )
    })
    gallery.querySelector('.pos-2').classList.add('pos-1')
    gallery.querySelector('.pos-2').classList.remove('pos-2')
}

// Slide cards
const scroll = (nextImage, nextPos) => {
    const currentImage = gallery.querySelector('.pos-1')
    if (currentImage[nextImage]){
        currentImage.classList.add(`pos-${nextPos+1}`)
        currentImage.classList.remove('pos-1')
        currentImage.style.zIndex = currentImage.getAttribute(`data-pos-${nextPos+1}`)
        currentImage[nextImage].classList.add('pos-1')
        currentImage[nextImage].classList.remove(`pos-${1-nextPos}`)
    }
}

// Swiper functions: start, move, end
const swipeStart = e => {
    e.preventDefault()
    swipeStartPos = e.type.includes('touch') ? e.touches[0].clientX : e.pageX
}

const swipeEnd = e => {
    const swipeEndPos = e.type.includes('touch') ? e.changedTouches[0].clientX : e.pageX
    if (swipeEndPos < swipeStartPos - 50){
        scroll('nextElementSibling', -1)
    }
    if (swipeEndPos > swipeStartPos + 50){
        scroll('previousElementSibling', 1)
    }
}

// Listeners
document.querySelector('#left').addEventListener('click', () => scroll('nextElementSibling', -1))
document.querySelector('#right').addEventListener('click', () => scroll('previousElementSibling', 1))
// gallery.addEventListener('touchstart', swipeStart)
// gallery.addEventListener('touchend', swipeEnd)
// gallery.addEventListener('mousedown', swipeStart)
// gallery.addEventListener('mouseup', swipeEnd)

getImages()