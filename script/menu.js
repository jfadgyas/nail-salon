const hamburger = document.querySelector('.hamburger')
const menu = document.querySelector('.menu')

hamburger.addEventListener('click', function openMenu(){
    menu.classList.toggle('open')
    hamburger.classList.toggle('open')
})

document.addEventListener('click', function closeMenu(e){
    if (e.target.id != 'hamburger' && e.target.id != 'menu'){
        menu.classList.remove('open')
        hamburger.classList.remove('open')
    }
})