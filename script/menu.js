// Variables
const hamburger = document.querySelector('.hamburger')
const menu = document.querySelector('.menu')
const pageContent = Array.from(document.querySelectorAll('article'))
const options = {
    root: null,
    threshold: 0.75,
    rootMargin: '0px 0px -10% 0px'
}
const menuObserver = new IntersectionObserver(entries => activateMenuItem(entries), options)

// Function
// toggle active menu item
const activateMenuItem = entries => {
    entries.map(entry => {
        const index = pageContent.findIndex(item => item.id == entry.target.id)
        if (entry.isIntersecting){
            return menu.children[index].classList.add('active')
        }
        menu.children[index].classList.remove('active')
    })
}

// Listeners
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

pageContent.map(item => {
    menuObserver.observe(item)
})

