// back to top button

const toTop = document.querySelector('#to-top')
const content = document.querySelector('#content');
let scroll = "";

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  console.log(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  scroll = 'instant';
}else{
  scroll = 'smooth';
}

if(toTop){
  toTop.addEventListener('click', () => {
    window.scroll({
      top: 0,
      behavior: scroll
    })
  })

  toTop.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scroll({
        top: 0,
        behavior: scroll
      })
      content.focus();
    }
  })    


  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      toTop.classList.remove('to-top-hidden')
      toTop.classList.add('to-top-shown')
      const footer = document.getElementsByTagName('footer')[0]
      const start = window.innerHeight-footer.getBoundingClientRect().top - 160;

      if (start >= 80){
        toTop.classList.add('to-top-relative')
      } else if(start < 80){ 
        toTop.classList.remove('to-top-relative')
      }
    } else {
      toTop.classList.remove('to-top-shown')
      toTop.classList.add('to-top-hidden')
      toTop.classList.remove('to-top-relative')
    } 
  })
}
