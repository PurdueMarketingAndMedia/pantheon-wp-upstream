import {CustomActiveClass, check_resize} from '../../../src/js/front-end/slider';
import Glide from '@glidejs/glide';

document.addEventListener("DOMContentLoaded",function(){
const instagram_sliders = document.querySelectorAll('.purdue-home-instagram-feed__image-slider');
console.log(instagram_sliders)
if(instagram_sliders && instagram_sliders.length>0){
	for (let i = 0; i < instagram_sliders.length; i++) {
        let glide = new Glide(instagram_sliders[i], {
          type: 'carousel',
          perView: 1,
          gap:24,
          peek: {
            before: 50,
            after: 50
          },
          // swipeThreshold: false, 
          // dragThreshold: false 
        });
        const nextButton = instagram_sliders[i].querySelector('.arrow--left');
        const prevButton = instagram_sliders[i].querySelector('.arrow--right');
        nextButton.addEventListener('click', function (event) {
          event.preventDefault();	  
          glide.go('<');
        })
        
        prevButton.addEventListener('click', function (event) {
          event.preventDefault();	  
          glide.go('>');
        })
        glide.slides_count = instagram_sliders[i].querySelectorAll('.glide__slide').length;
        glide.controls = instagram_sliders[i].querySelector('.slider-controls');
        glide.on('resize', () => {
          check_resize(glide);
        });
        glide.mount({CustomActiveClass,});
        check_resize(glide);
  }
}
})