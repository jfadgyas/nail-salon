// Variables
const gallery = document.querySelector('#container__swiper')
let images
let swipeStartPos

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
                <p>${index}${image.text}</p>
                <img class='container__swiper__slide__img' src=${image.src}></img>
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
    console.log('start')
    console.log(e)
    swipeStartPos = e.type.includes('touch') ? e.touches[0].clientX : e.pageX
}

const swipeEnd = e => {
    console.log('end')
    console.log(e)
    const swipeEndPos = e.type.includes('touch') ? e.changedTouches[0].clientX : e.pageX
    if (swipeEndPos < swipeStartPos - 100){
        scroll('nextElementSibling', -1)
    }
    if (swipeEndPos > swipeStartPos + 100){
        scroll('previousElementSibling', 1)
    }
}

// const swipe = e => {
//     // e.preventDefault()
//     console.log('move')
//     // console.log(e)
//     gallery.style.background = 'rgba(0,0,0,0.5)'
// }

// Listeners
document.querySelector('#left').addEventListener('click', () => scroll('nextElementSibling', -1))
document.querySelector('#right').addEventListener('click', () => scroll('previousElementSibling', 1))

// gallery.addEventListener('dragstart', e => e.preventDefault())

gallery.addEventListener('touchstart', swipeStart)
gallery.addEventListener('touchend', swipeEnd)
// gallery.addEventListener('touchmove', swipe)
gallery.addEventListener('mousedown', swipeStart)
gallery.addEventListener('mouseup', swipeEnd)

getImages()