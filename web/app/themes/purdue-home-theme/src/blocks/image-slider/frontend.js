import {CustomActiveClass, check_resize, changeFocusOnSlideChange} from '../../../src/js/front-end/slider';
import Glide from '@glidejs/glide';

window.addEventListener("load",function(){
  //image sliders
  const img_sliders = document.querySelectorAll('.purdue-home-image-slider');

  if(img_sliders && img_sliders.length>0){
    for (let i = 0; i < img_sliders.length; i++) {
      const count = img_sliders[i].dataset.columns;
      const newCount = count>1?count-0.5:1;
      const loop = img_sliders[i].classList.contains("no-loop")? "slider" : "carousel";
    let glide = new Glide(img_sliders[i], {
      type: loop,
      autoHeight: true,
      perView: count,
      gap:24,
      breakpoints: {
        1024:{
          perView: newCount,
        },
        767: {
          perView: 1,
        },
      },
      keyboard: false,
    });
    const nextButton = img_sliders[i].querySelector('.arrow--left');
    const prevButton = img_sliders[i].querySelector('.arrow--right');
    nextButton.addEventListener('click', function (event) {
      event.preventDefault();	  
      glide.go('<');
    })
    
    prevButton.addEventListener('click', function (event) {
      event.preventDefault();	  
      glide.go('>');
    })
    glide.slides_count = img_sliders[i].querySelectorAll('.glide__slide').length;
    glide.controls = img_sliders[i].querySelector('.slider-controls');
    glide.on('resize', () => {
      check_resize(glide);
    });

    glide.mount({CustomActiveClass,changeFocusOnSlideChange});

    check_resize(glide);

    //if is in a tab block, adjust size
    const parent=img_sliders[i].parentElement
    if(parent&&parent.classList.contains("purdue-home-tabs__panel")){
      const id=parent.getAttribute("aria-labelledby");
      if(id){
        const panelButton=document.querySelector(`#${id}`)
          if(panelButton){
            panelButton.addEventListener("click", ()=>{
              glide.update();
              check_resize(glide);
            })
          }
        
      }
     
    }
  }}
});


//fix cursor on safari
const cards=document.querySelectorAll('.purdue-home-image-slider .purdue-home-image-slider__card');
if(cards && cards.length>0){
  cards.forEach((item)=>{
    item.addEventListener("mousedown", (event)=>{
      event.preventDefault()
    })
  })
}