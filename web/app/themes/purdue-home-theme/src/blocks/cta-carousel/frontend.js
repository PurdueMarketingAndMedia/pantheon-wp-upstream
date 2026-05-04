import {CustomActiveClass, check_resize} from '../../../src/js/front-end/slider';
import Glide from '@glidejs/glide';
//CTA carousel
document.addEventListener("DOMContentLoaded",function(){
  const cta_carousels = document.querySelectorAll('.purdue-home-cta-carousel__cards');
  
  if(cta_carousels && cta_carousels.length>0){
    for (let i = 0; i < cta_carousels.length; i++) {
          let sliderType="carousel"
          const count = cta_carousels[i].dataset.columns;
          if(count <= 2){
            sliderType="slider"
          }
          let glide = new Glide(cta_carousels[i], {
            type: sliderType,
            perView: 1,
            gap:24,
          });
          const nextButton = cta_carousels[i].querySelector('.arrow--left');
          const prevButton = cta_carousels[i].querySelector('.arrow--right');
          nextButton.addEventListener('click', function (event) {
            event.preventDefault();	  
            glide.go('<');
          })
          
          prevButton.addEventListener('click', function (event) {
            event.preventDefault();	  
            glide.go('>');
          })
          glide.slides_count = cta_carousels[i].querySelectorAll('.glide__slide').length;
          glide.controls = cta_carousels[i].querySelector('.slider-controls');
          glide.on('resize', () => {
            check_resize(glide);
          });

          glide.mount({CustomActiveClass,});
          check_resize(glide);

          const cards=cta_carousels[i].querySelectorAll('.purdue-home-cta-card');
          if(cards && cards.length>0){
            cards.forEach((item)=>{
              item.addEventListener("mousedown", (event)=>{
                event.preventDefault()
              })
            })
          }
    }

  }
});