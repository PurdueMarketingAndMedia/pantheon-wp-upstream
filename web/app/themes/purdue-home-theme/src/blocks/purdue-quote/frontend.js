import {CustomActiveClass, changeFocusOnSlideChange, check_resize} from '../../../src/js/front-end/slider';
import Glide from '@glidejs/glide';

window.addEventListener("load",function(){
  //image sliders
  const img_sliders = document.querySelectorAll('.purdue-home-quote-slider');

  if(img_sliders && img_sliders.length>0){
    for (let i = 0; i < img_sliders.length; i++) {
    let glide = new Glide(img_sliders[i], {
      type: "carousel",
      perView: 1,
      gap:24,
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
    glide.mount({CustomActiveClass, changeFocusOnSlideChange});
    check_resize(glide);

  }}
});
