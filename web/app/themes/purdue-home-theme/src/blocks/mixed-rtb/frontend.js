
import {CustomActiveClass, check_resize} from '../../../src/js/front-end/slider';
import Glide from '@glidejs/glide';

document.addEventListener("DOMContentLoaded",function(){
	const rtb_sliders = document.querySelectorAll('.purdue-home-slider--rtb');

	if(rtb_sliders && rtb_sliders.length>0){
		for (let i = 0; i < rtb_sliders.length; i++) {
		let glide = new Glide(rtb_sliders[i], {
			type: 'carousel',
			perView: 1,
			peek: {
				before: 20,
				after: 20
			}
		});
		const nextButton = rtb_sliders[i].querySelector('.arrow--left');
		const prevButton = rtb_sliders[i].querySelector('.arrow--right');
		
		nextButton.addEventListener('click', function (event) {
			event.preventDefault();	  
			glide.go('<');
		})
		
		prevButton.addEventListener('click', function (event) {
			event.preventDefault();	  
			glide.go('>');
		})
	glide.slides_count = rtb_sliders[i].querySelectorAll('.glide__slide').length;
	glide.controls = rtb_sliders[i].querySelector('.slider-controls');
	glide.on('resize', () => {
		check_resize(glide);
	});
	glide.mount({CustomActiveClass,});
	check_resize(glide);
	}}
});