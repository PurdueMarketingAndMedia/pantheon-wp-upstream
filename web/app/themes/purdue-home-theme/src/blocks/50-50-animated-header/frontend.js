document.addEventListener("DOMContentLoaded", function () {

    const animateHeader = document.querySelectorAll('span.purdue-home-cta-hero__header-animate')
	console.log(animateHeader)
    let carouselTimeout = null;
    let slideOutTimeout = null;
    let currentIndex = 0;
    let isPaused = false;
    
    if (animateHeader.length > 0) {
        animateHeader.forEach(item => {
            const content = item.querySelectorAll('span.purdue-home-cta-hero__header-animate-item');
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

			const ctaBtn = document.querySelector('.purdue-home-50-50-animated-header button.cta-btnctrl');

			

			if (ctaBtn) {
				ctaBtn.addEventListener('click', (e) => {
					console.log(animateHeader)
					const btn = e.currentTarget;
					console.log(btn)
					const icon = btn.querySelector('i');
					console.log(icon)
					if (btn.classList.contains('cta-play')) {
						console.log(btn)
						btn.classList.remove('cta-play');
						btn.classList.add('cta-pause');
						btn.setAttribute('aria-label', 'Pause Animation');
						icon.classList.add('fa-circle-pause', 'cta-pause-icon');
						icon.classList.remove('fa-circle-play', 'cta-play-icon');
						item.classList.remove('pause');
						isPaused = false;
						stopTimers();
						showFrame(currentIndex = (currentIndex + 1) % content.length);
						scheduleNext();
					} else {
						btn.classList.add('cta-play');
						btn.classList.remove('cta-pause');
						btn.setAttribute('aria-label', 'Play Animation');
						icon.classList.add('fa-circle-play', 'cta-play-icon');
						icon.classList.remove('fa-circle-pause', 'cta-pause-icon');
						item.classList.add('pause'); // optional, for CSS animation-play-state
						isPaused = true;
						stopTimers();
					}
				});
			}
            }

        })

    }
})
