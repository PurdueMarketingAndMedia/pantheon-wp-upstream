
import {CustomActiveClass, check_resize} from '../../../src/js/front-end/slider';
import Glide from '@glidejs/glide';

document.addEventListener("DOMContentLoaded",function(){
  const cta_sliders = document.querySelectorAll('.purdue-home-cta-card-block__image-container');
  if(cta_sliders && cta_sliders.length>0){
    for (let i = 0; i < cta_sliders.length; i++) {
      const slides=cta_sliders[i].querySelectorAll('.glide__slide');
      if(slides.length>1){
        const playButton=cta_sliders[i].querySelector('.cta-play');
        const pauseButton=cta_sliders[i].querySelector('.cta-pause');
        let glide = new Glide(cta_sliders[i], {
          type: 'carousel',
          autoplay: 5000,
          perView: 1,
          gap:0,
        });
        if(playButton){
          playButton.addEventListener("click", ()=>{
            pauseButton.classList.add("is-active")
            playButton.classList.remove("is-active")
            glide.enable()
          })
        }
        if(pauseButton){
          pauseButton.addEventListener("click", ()=>{
            pauseButton.classList.remove("is-active")
            playButton.classList.add("is-active")
            glide.disable()
          })
        }
        glide.mount({});
  
      }  
  }}
});