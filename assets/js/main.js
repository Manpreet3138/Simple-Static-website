/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle){
  navToggle.addEventListener('click', () =>{
    navMenu.classList.add('show-menu')
    navToggle.setAttribute('aria-expanded', 'true')
  })
}
if(navClose){
  navClose.addEventListener('click', () =>{
    navMenu.classList.remove('show-menu')
    navToggle?.setAttribute('aria-expanded', 'false')
  })
}

/*=============== REMOVE MENU MOBILE ===============*/
document.querySelectorAll('.nav__link').forEach(n => {
  n.addEventListener('click', ()=>{
    document.getElementById('nav-menu').classList.remove('show-menu')
    navToggle?.setAttribute('aria-expanded', 'false')
  })
})

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
  const header = document.getElementById('header')
  if(this.scrollY >= 80) header.classList.add('scroll-header')
  else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== QUESTIONS ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.questions__item')
accordionItems.forEach((item) =>{
  const accordionHeader = item.querySelector('.questions__header')
  accordionHeader.addEventListener('click', () =>{
    const openItem = document.querySelector('.accordion-open')
    toggleItem(item)
    if(openItem && openItem!== item){ toggleItem(openItem) }
  })
  accordionHeader.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); accordionHeader.click() }
  })
})
const toggleItem = (item) =>{
  const accordionContent = item.querySelector('.questions__content')
  if(item.classList.contains('accordion-open')){
    accordionContent.style.height = 0
    item.classList.remove('accordion-open')
  }else{
    accordionContent.style.height = accordionContent.scrollHeight + 'px'
    item.classList.add('accordion-open')
  }
  const header = item.querySelector('.questions__header')
  const content = item.querySelector('.questions__content')
  const open = item.classList.contains('accordion-open')
  header?.setAttribute('aria-expanded', String(open))
  content?.setAttribute('aria-hidden', String(!open))
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
function scrollActive(){
  const scrollY = window.pageYOffset
  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 58,
          sectionId = current.getAttribute('id')
    const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
    if (!link) return
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      link.classList.add('active-link')
    }else{
      link.classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
  const scrollUp = document.getElementById('scroll-up');
  if(this.scrollY >= 400) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

themeButton?.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL (optional) ===============*/
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1200,
    delay: 200,
  })
  sr.reveal(`.home__data`)
  sr.reveal(`.home__img`, {delay: 150})
  sr.reveal(`.home__social`, {delay: 200})
  sr.reveal(`.about__img, .contact__box`,{origin: 'left'})
  sr.reveal(`.about__data, .contact__form`,{origin: 'right'})
  sr.reveal(`.product__card, .questions__group, .footer`,{interval: 80})
}
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.dataset.product;
    const price = btn.dataset.price;

    // Redirect with product info in URL
    window.location.href = `payment.html?product=${encodeURIComponent(product)}&price=${price}`;
  });
});
