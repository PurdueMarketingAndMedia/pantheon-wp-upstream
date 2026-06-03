import { flipBtnState } from '../../utils/flipBtnState.js';

document.addEventListener("DOMContentLoaded", function () {
	let carouselTimeout = null;
	let slideOutTimeout = null;
	let currentIndex = 0;
	let isPaused = false;

	const animateHeader = document.querySelector('.purdue-home-cta-hero__header-animate');

	if (animateHeader) {
		const content = animateHeader.querySelectorAll('span.purdue-home-cta-hero__header-animate-item');

		if (content.length > 0) {
			function showFrame(index) {
				// hide all, reset classes
				for (let i = 0; i < content.length; i++) {
					content[i].classList.add('hide');
					content[i].classList.remove('slide-in', 'slide-out');
				}
				const current = content[index];
				current.classList.remove('hide');
				current.classList.add('slide-in');
			}

			function scheduleNext() {
				if (isPaused) {
					return;
				}

				// schedule slide-out of current frame
				slideOutTimeout = setTimeout(() => {
					if (isPaused) {
						return;
					}
					const current = content[currentIndex];
					current.classList.remove('slide-in');
					current.classList.add('slide-out');
				}, 3500);

				// schedule advance to next frame
				carouselTimeout = setTimeout(() => {
					if (isPaused) {
						return;
					}
					currentIndex = (currentIndex + 1) % content.length;
					showFrame(currentIndex);
					scheduleNext(); // loop
				}, 4000);
			}

			function stopTimers() {
				clearTimeout(carouselTimeout);
				clearTimeout(slideOutTimeout);
				carouselTimeout = null;
				slideOutTimeout = null;
			}

			showFrame(currentIndex);
			scheduleNext();

			const ctaBtn = document.querySelector('.purdue-home-cta-hero button.cta-btnctrl');

			if (ctaBtn) {
				ctaBtn.addEventListener('click', (e) => {
					const btn = e.currentTarget;
					const icon = btn.querySelector('i');
					if (btn.classList.contains('cta-play')) {
						animateHeader.classList.remove('pause');
						isPaused = false;
						stopTimers();
						showFrame(currentIndex = (currentIndex + 1) % content.length);
						scheduleNext();
					} else {
						animateHeader.classList.add('pause'); // optional, for CSS animation-play-state
						isPaused = true;
						stopTimers();
					}
					flipBtnState(btn);
				});
			}
		}
	}
});
