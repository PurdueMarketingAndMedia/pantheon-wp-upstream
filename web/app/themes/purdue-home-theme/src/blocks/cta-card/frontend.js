import Glide from '@glidejs/glide';
import { flipBtnState } from '../../utils/flipBtnState.js';

document.addEventListener("DOMContentLoaded",function(){
  const cta_sliders = document.querySelectorAll('.purdue-home-cta-card-block__image-container');
  if(cta_sliders && cta_sliders.length>0){
    for (let i = 0; i < cta_sliders.length; i++) {
      const slides=cta_sliders[i].querySelectorAll('.glide__slide');
      if(slides.length>1) {

        let glide = new Glide(cta_sliders[i], {
          type: 'carousel',
          autoplay: 5000,
          perView: 1,
          gap:0,
          keyboard: false
        });

        glide.mount({});
        const btn = cta_sliders[i].querySelector('.cta-btnctrl');

        btn.addEventListener("click", () => {
          if (btn.classList.contains('cta-play')) {
            glide.enable()
          } else {
            glide.disable()
          }
          flipBtnState(btn);
        });
      }  
  }}
});