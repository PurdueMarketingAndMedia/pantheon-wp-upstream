
import { CustomActiveClass, check_resize, changeFocusOnSlideChange } from '../../../src/js/front-end/slider';
import Glide from '@glidejs/glide';

document.addEventListener("DOMContentLoaded", function () {
	const windowHTML = document.querySelector("html");
	const rtb_sliders = document.querySelectorAll('.purdue-home-slider--rtb');

	if (rtb_sliders && rtb_sliders.length > 0) {
		for (let i = 0; i < rtb_sliders.length; i++) {
			let glide = new Glide(rtb_sliders[i], {
				type: 'carousel',
				perView: 1,
				peek: {
					before: 20,
					after: 20
				},
				keyboard: false
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
			glide.mount({ CustomActiveClass, changeFocusOnSlideChange});
			check_resize(glide);
		}
	}


	const dialogTrigger = document.querySelectorAll('.dialog-trigger');

	if (dialogTrigger && dialogTrigger.length > 0) {
		dialogTrigger.forEach(trigger => {
			trigger.addEventListener('click', function () {
				const targetId = this.getAttribute('data-target');
				const dialog = document.getElementById(targetId);
				this.setAttribute('aria-expanded', true);
				dialog.showModal();
				windowHTML.classList.add("no-scroll-page");

			});
			trigger.addEventListener("keydown", (e) => {
				console.log(e.key);
				if (e.key === "Enter" || e.code === "Space") {
					e.preventDefault();
					const targetId = trigger.getAttribute('data-target');
					const dialog = document.getElementById(targetId);
					dialog.showModal();
					windowHTML.classList.add("no-scroll-page");
				}
			});
		});
	}

	const dialogCloseButtons = document.querySelectorAll('.modal-close');

	if (dialogCloseButtons && dialogCloseButtons.length > 0) {
		dialogCloseButtons.forEach(button => {
			button.addEventListener('click', function () {
				const dialog = this.closest('dialog');
				const dialogId = dialog.getAttribute('id');
				const trigger = document.querySelector(`.dialog-trigger[data-target="${dialogId}"]`);
				dialog.close();
				windowHTML.classList.remove("no-scroll-page");
				trigger.focus();
				trigger.setAttribute('aria-expanded', false);
			});
		});
	}
});