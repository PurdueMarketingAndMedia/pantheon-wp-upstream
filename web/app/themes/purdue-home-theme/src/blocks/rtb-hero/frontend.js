
import {CustomActiveClass, check_resize} from '../../../src/js/front-end/slider';
import Glide from '@glidejs/glide';

const rtbHero_sliders = document.querySelectorAll('.purdue-home-slider--rtb-hero');

if(rtbHero_sliders && rtbHero_sliders.length>0){
	for (let i = 0; i < rtbHero_sliders.length; i++) {
  let count= parseInt(rtbHero_sliders[i].dataset.number)>3?3:parseInt(rtbHero_sliders[i].dataset.number)
	let glide = new Glide(rtbHero_sliders[i], {
		type: 'carousel',
    gap: 24,
		perView: 1.5,
    breakpoints: {
      1024:{
        perView: count,
      },
      767: {
        perView: 1,
      },
    },
	});
	const nextButton = rtbHero_sliders[i].querySelector('.arrow--left');
	const prevButton = rtbHero_sliders[i].querySelector('.arrow--right');
	nextButton.addEventListener('click', function (event) {
		event.preventDefault();	  
		glide.go('<');
	})
	
	prevButton.addEventListener('click', function (event) {
		event.preventDefault();	  
		glide.go('>');
	})
  glide.slides_count = rtbHero_sliders[i].querySelectorAll('.glide__slide').length;
  glide.controls = rtbHero_sliders[i].querySelector('.slider-controls');
  glide.on('resize', () => {
    check_resize(glide);
  });
  glide.mount({CustomActiveClass});
  check_resize(glide);
}}
//fix cursor on safari
const rtbCards=document.querySelectorAll('.purdue-home-slider--rtb-hero .purdue-home-proofpoint--simple');
if(rtbCards && rtbCards.length>0){
  rtbCards.forEach((item)=>{
    item.addEventListener("mousedown", (event)=>{
      event.preventDefault()
    })
  })
}