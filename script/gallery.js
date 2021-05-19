// Variables
const gallery = document.querySelector('#container__gallery')
const slides = document.querySelectorAll('.container__swiper__slide')

// Functions
//create imgs
//assign initial classes
//scroll left
//img position=current-1, assign new class
//scroll right

const scrollLeft = (item, current, next) => {
    item.classList.remove(current)
    item.classList.add(next)
}

// Listeners
document.addEventListener('click', () => scrollLeft(slides[1], 'mid', 'start'))