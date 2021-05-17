// Variables
const hamburger = document.querySelector('.hamburger')
const menu = document.querySelector('.menu')
const langSelector = document.querySelector('#lang-selector')
const pageContent = Array.from(document.querySelectorAll('article'))
const options = {
    root: null,
    rootMargin: '0px 0px -40% 0px',
    threshold: 0.22
}
const menuObserver = new IntersectionObserver(function(entries) {
    entries.map(function(entry) {
        const index = pageContent.findIndex(function(item){
            return item.id == entry.target.id
        })
        if (entry.isIntersecting){
            return menu.children[index].classList.add('active')
        }
        menu.children[index].classList.remove('active')
    })
}, options)

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

langSelector.addEventListener('change', function changeLang() {
    document.documentElement.setAttribute('lang', langSelector.value)
})

pageContent.map(function(item){
    menuObserver.observe(item)
})

