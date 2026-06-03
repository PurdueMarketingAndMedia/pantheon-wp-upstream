import {CustomActiveClass, check_resize, changeFocusOnSlideChange} from '../../../src/js/front-end/slider';
import Glide from '@glidejs/glide';

document.addEventListener("DOMContentLoaded",function(){
	const news_sliders = document.querySelectorAll('.purdue-home-slider--news');

	if(news_sliders && news_sliders.length>0){
		for (let i = 0; i < news_sliders.length; i++) {
			const cards=news_sliders[i].querySelectorAll('.purdue-home-cta-card')
			if(cards.length>1){
				let glide = new Glide(news_sliders[i], {
						type: 'carousel',
						perView: 1,
						keyboard: false,
					});
					const nextButton = news_sliders[i].querySelector('.arrow--left');
					const prevButton = news_sliders[i].querySelector('.arrow--right');
					nextButton.addEventListener('click', function (event) {
						event.preventDefault();	  
						glide.go('<');
					})
					
					prevButton.addEventListener('click', function (event) {
						event.preventDefault();	  
						glide.go('>');
					})
					glide.slides_count = news_sliders[i].querySelectorAll('.glide__slide').length;
					glide.controls = news_sliders[i].querySelector('.slider-controls');
					glide.on('resize', () => {
						check_resize(glide);
					});
					glide.mount({CustomActiveClass, changeFocusOnSlideChange});
					check_resize(glide);
			}
		}
}
})