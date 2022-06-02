function ibg() {

   let ibg = document.querySelectorAll(".ibg");
   for (var i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector('img')) {
         ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
      }
   }
}

ibg();


const iconMenu = document.querySelector('.header__burger');
const iconItem = document.querySelector('.menu__list')
if (iconMenu) {
   const menuBody = document.querySelector('.menu__body');
   iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
   });
   iconItem.addEventListener('click', (e) => {
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
      document.body.classList.toggle('_lock');
   })
}


///////////////////////

function app() {
   const buttons = document.querySelectorAll('.triggers__item')
   const cards = document.querySelectorAll('.tabs-popular__item')

   function filter(category, items) {
      items.forEach((item) => {
         const isItemFilters = !item.classList.contains(category)
         const isShowAll = category.toLowerCase() == 'all'
         if (isItemFilters && !isShowAll) {
            item.classList.add('anime')
         } else {
            item.classList.remove('hide')
            item.classList.remove('anime')
         }
      })
   }

   buttons.forEach((button) => {
      button.addEventListener('click', () => {
         const currentCategory = button.dataset.filter
         filter(currentCategory, cards)
         buttons.forEach((c) => {
            c.classList.remove('active')
         })
         button.classList.add('active')
      })
   })

   cards.forEach((card) => {
      card.ontransitionend = function () {
         if (card.classList.contains('anime')) {
            card.classList.add('hide')
         }
      }
   })
}

app()


new Swiper('.slider__block', {
   pagination: {
      el: '.swiper-pagination',
      clickable: true
   },
   slidesPerView: 3,
   breakpoints: {
      320: {
         slidesPerView: 1,
      },
      581: {
         slidesPerView: 2,
      },
      993: {
         slidesPerView: 3,
      }
   },
})

function gallery() {
   const container = document.querySelectorAll('.gallery__body .ibg')
   const popup = document.querySelector('.gallery__popup')

   container.forEach(img => {
      img.onclick = () => {
         popup.classList.add('active')
         document.querySelector('.gallery__popup img').src = img.childNodes[1].getAttribute('src')
      }
   })

   document.querySelector('.gallery__popup span').onclick = () => {
      popup.classList.remove('active')
   }
}
gallery()

////

const animItems = document.querySelectorAll('._anim')
if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll)
   function animOnScroll() {
      for (let i = 0; i < animItems.length; i++) {
         const animItem = animItems[i]
         const animItemHeight = animItem.offsetHeight
         const animItemOffset = offset(animItem).top
         const animStart = 4

         let animItemPoint = window.innerHeight - animItemHeight / animStart
         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart
         }

         if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
            animItem.classList.add('_active')
         }
      }
   }
   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
   }
   animOnScroll()
}

//
let nums = document.querySelectorAll('.skills__value')
let section = document.querySelector('.swiper-pagination-bullet')
let started = false
window.onscroll = function () {
   if (document.querySelector('.skills__items').classList.contains('_active')) {
      if (!started) {
         nums.forEach((num) => startCount(num))
      }
      started = true
   }
}

function startCount(el) {
   let goal = el.dataset.goal
   let count = setInterval(() => {
      el.textContent++
      if (el.textContent == goal) {
         clearInterval(count)
      }
   }, 1000 / goal)
}
