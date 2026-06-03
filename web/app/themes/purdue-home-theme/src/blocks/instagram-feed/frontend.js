import { CustomActiveClass, check_resize, changeFocusOnSlideChange } from '../../../src/js/front-end/slider';
import Glide from '@glidejs/glide';

document.addEventListener("DOMContentLoaded", function () {
  const instagram_sliders = document.querySelectorAll('.purdue-home-instagram-feed__image-slider');
  if (instagram_sliders && instagram_sliders.length > 0) {
    for (let i = 0; i < instagram_sliders.length; i++) {
      let glide = new Glide(instagram_sliders[i], {
        type: 'carousel',
        perView: 1,
        gap: 24,
        keyboard: false,
        peek: {
          before: 50,
          after: 50
        },
        // swipeThreshold: false, 
        // dragThreshold: false 
      });
      const nextButton = instagram_sliders[i].querySelector('.arrow--left');
      const prevButton = instagram_sliders[i].querySelector('.arrow--right');
      nextButton.addEventListener('click', function (event) {
        event.preventDefault();
        glide.go('<');
      })

      prevButton.addEventListener('click', function (event) {
        event.preventDefault();
        glide.go('>');
      })
      glide.slides_count = instagram_sliders[i].querySelectorAll('.glide__slide').length;
      glide.controls = instagram_sliders[i].querySelector('.slider-controls');
      glide.on('resize', () => {
        check_resize(glide);
      });
      glide.mount({ CustomActiveClass, changeFocusOnSlideChange });
      check_resize(glide);

      const dialogTrigger = document.querySelectorAll('.dialog-trigger');

      if (dialogTrigger && dialogTrigger.length > 0) {
        dialogTrigger.forEach(trigger => {
          trigger.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const dialog = document.getElementById(targetId);
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
          });
        });
      }
    }
  }
})