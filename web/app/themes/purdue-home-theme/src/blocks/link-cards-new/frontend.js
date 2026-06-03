import { CustomActiveClass, check_resize } from '../../../src/js/front-end/slider';
import Glide from '@glidejs/glide';

const link_cards = document.querySelectorAll(".purdue-home-link-cards__slider");

if (link_cards && link_cards.length > 0) {
	for (let i = 0; i < link_cards.length; i++) {
		
		const type =
			link_cards[i].classList.contains(
				"purdue-home-link-cards__slider--loop"
			) && link_cards[i].querySelectorAll(".glide__slide").length > 4
				? "carousel"
				: "slide";
		let glide = new Glide(link_cards[i].querySelector(".glide"), {
			type: type,
			perView: 4,
			gap: 24,
			keyboard: false,
			breakpoints: {
				1407: {
					perView: 3,
				},
				1024: {
					perView: 2,
				},
				767: {
					perView: 1,
				},
			},
		});
		const nextButton = link_cards[i].querySelector(".arrow--left");
		const prevButton = link_cards[i].querySelector(".arrow--right");
		nextButton.addEventListener("click", function (event) {
			event.preventDefault();
			glide.go("<");
		});

		prevButton.addEventListener("click", function (event) {
			event.preventDefault();
			glide.go(">");
		});
		glide.slides_count = link_cards[i].querySelectorAll(
			".glide__slide:not(.glide__slide--clone)"
		).length;
		glide.controls = link_cards[i].querySelector(".slider-controls");
		glide.on("resize", () => {
			check_resize(glide);
		});

		glide.mount({ CustomActiveClass });
		check_resize(glide);

		//resize observer for tabs horizontal block


		let parent = link_cards[i].parentElement.parentElement.parentElement.parentElement;

		if (parent.classList.contains("purdue-home-tabs-horizontal__panel")) {
			const observer = new MutationObserver(() => {
				const display = window.getComputedStyle(parent).display;
				if (display === 'none') {
					return;
				} else {
					glide.update();
				}
			});

			observer.observe(parent, { attributes: true, attributeFilter: ['class'] });
		}
	}


}