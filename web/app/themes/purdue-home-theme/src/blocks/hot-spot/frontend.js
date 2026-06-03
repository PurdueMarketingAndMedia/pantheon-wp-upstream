import { CustomActiveClass, check_resize, changeFocusOnSlideChange } from '../../../src/js/front-end/slider';
import Glide from '@glidejs/glide';

function trapFocus(event, target, button) {


    button.setAttribute("inert", "true");

    const cardFocusableElements = target.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), iframe'
    );

    //const focusableElements = [...cardFocusableElements];
    const focusableElements = Array.from(cardFocusableElements);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    const active = document.activeElement;
    const isInside = focusableElements.includes(active);

    if (event.key === "Tab") {
        if (isInside === false) {
            console.log("Focus is outside the modal, moving it back to the first focusable element.");
            event.preventDefault();
            firstFocusableElement.focus();
            return;

        }
        if (event.shiftKey) {
            // Shift+Tab: cycle to last if at first
            if (document.activeElement === firstFocusableElement) {
                event.preventDefault();
                lastFocusableElement.focus();
            }
        } else {
            // Tab: cycle to first if at last
            if (document.activeElement === lastFocusableElement) {
                event.preventDefault();
                firstFocusableElement.focus();
            }
        }
    }
    if (event.key === "Escape") {
        target.classList.remove('is-active');
        button.classList.remove('is-active');
        target.removeEventListener("keydown", trapFocus);
        target.removeEventListener("focusin", trapFocus);
        button.removeAttribute("inert");
        button.focus();
        button.setAttribute("aria-expanded", "false");
        target.removeAttribute("aria-modal");
        target.setAttribute("inert", "true");
    }

    const closeButton = target.querySelector('.hot-spot-button--close');

    closeButton.addEventListener("click", () => {
        target.classList.remove('is-active');
        button.classList.remove('is-active');
        target.setAttribute("tabindex", "-1");
        target.removeEventListener("keydown", trapFocus);
        target.removeEventListener("focusin", trapFocus);
        target.setAttribute("inert", "true");
        button.removeAttribute("inert");
        button.focus();
        button.setAttribute("aria-expanded", "false");
        target.removeAttribute("aria-modal");
    })
}

function getRelativePosition(element, container) {
  const elRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  return {
    top: elRect.top - containerRect.top,
    left: elRect.left - containerRect.left,
    right: containerRect.right - elRect.right,
    bottom: containerRect.bottom - elRect.bottom
  };
}

document.addEventListener("DOMContentLoaded", function () {
    //hot spot button functionality
    const hotspot_buttons = document.querySelectorAll('.hot-spot-button--open')
    if (hotspot_buttons && hotspot_buttons.length > 0) {
        hotspot_buttons.forEach((button) => {
            const parentElement = button.parentElement.parentElement.parentElement;
            const target = document.getElementById(button.dataset.target);
            const closeButton = target.querySelector('.hot-spot-button--close');
            const link = target.querySelector('a');
            const pos = getRelativePosition(button, parentElement);
            const cardPos = getRelativePosition(closeButton.parentElement.parentElement, parentElement);

            if (closeButton) {
                closeButton.parentElement.style.top = pos.top - cardPos.top + 12 + "px";
            }

        })
    }
})

const hotspot_buttons = document.querySelectorAll('.hot-spot-button--open')
const modals = document.querySelectorAll('.hot-spot-content');
if (hotspot_buttons && hotspot_buttons.length > 0) {

    hotspot_buttons.forEach((button) => {
        const target = document.getElementById(button.getAttribute('aria-controls'));
        const link = target.querySelector('a');

        button.addEventListener("click", (event) => {
            modals.forEach((modal) => {
                if (modal !== target) {
                    modal.classList.remove('is-active');
                    modal.removeAttribute("aria-modal");
                    modal.setAttribute("inert", "true");
                }
            })
            hotspot_buttons.forEach((button) => {
                if (button.classList.contains('is-active')) {
                    button.classList.remove('is-active');
                    button.removeAttribute("inert");
                }
            })

            if (target.classList.contains('is-active')) {
                target.classList.remove('is-active')
                target.classList.remove('is-active')
                //target.setAttribute("tabindex", "-1");
                //link.setAttribute("tabindex", "-1");
                target.removeAttribute("aria-modal");
                target.setAttribute("inert", "true");
            } else {
                event.target.classList.add('is-active')
                target.classList.add('is-active')
                //link.setAttribute("tabindex", "0");
                target.setAttribute("tabindex", "0");
                target.removeAttribute("inert");
                link.focus();
                target.setAttribute("aria-modal", "true");
                target.addEventListener("keydown", (event) => {
                    trapFocus(event, target, button);
                });

                target.addEventListener("focusin", (event) => {
                    trapFocus(event, target, button);
                });
            }

        })


        if (button.parentElement.parentElement.querySelector('.image')) {
            button.parentElement.parentElement.querySelector('.image').addEventListener("click", () => {
                // target.classList.remove('is-active');
                // button.classList.remove('is-active');
                // target.setAttribute("tabindex", "-1");
                // link.setAttribute("tabindex", "-1");
            })
        }

        if (button.parentElement.previousElementSibling) {
            button.parentElement.previousElementSibling.addEventListener("click", () => {
                //target.classList.remove('is-active');
                // button.classList.remove('is-active');
                // target.setAttribute("tabindex", "-1");
                //link.setAttribute("tabindex", "-1");
            })
        }
        if (button.parentElement.nextElementSibling) {
            button.parentElement.nextElementSibling.addEventListener("click", () => {
                //target.classList.remove('is-active');
                //button.classList.remove('is-active');
                // target.setAttribute("tabindex", "-1");
                // link.setAttribute("tabindex", "-1");
            })
        }
    })
}


//desktop hot spot
const hs_desktop = document.querySelectorAll('.purdue-home-slide__hot-spot-desktop');

if (hs_desktop && hs_desktop.length > 0) {
    for (let i = 0; i < hs_desktop.length; i++) {
        let glide = new Glide(hs_desktop[i], {
            type: 'carousel',
            perView: 1,
            keyboard: false
        });
        const nextButton = hs_desktop[i].querySelector('.arrow--left');
        const prevButton = hs_desktop[i].querySelector('.arrow--right');
        nextButton.addEventListener('click', function (event) {
            event.preventDefault();
            glide.go('<');
        })

        prevButton.addEventListener('click', function (event) {
            event.preventDefault();
            glide.go('>');
        })

        glide.slides_count = hs_desktop[i].querySelectorAll('.glide__slide').length;
        glide.controls = hs_desktop[i].querySelector('.slider-controls');
        glide.on('resize', () => {
            check_resize(glide);
        });
        glide.on('run', function () {

            const hotspot_buttons = hs_desktop[i].querySelectorAll('.hot-spot-button');

            if (hotspot_buttons && hotspot_buttons.length > 0) {
                hotspot_buttons.forEach((button) => {
                    const dataTarget = document.getElementById(button.dataset.target);
                    const link = dataTarget.querySelector('a');

                    if (link) {
                        //    link.setAttribute("tabindex", "-1");
                    }

                    dataTarget.setAttribute("tabindex", "-1");
                    let parentElement = button.parentElement.parentElement.parentElement;
                    setTimeout(() => {
                        if (parentElement.classList.contains('is-active')) {
                            //button.setAttribute("tabindex", "0");
                        } else {
                            //button.setAttribute("tabindex", "-1");
                        }
                    }, 500);

                    const modal = button.dataset.target;
                    const target = document.getElementById(modal);
                    target.classList.remove('is-active');
                    button.classList.remove('is-active');
                })
            }
        })
        glide.mount({ CustomActiveClass, changeFocusOnSlideChange });
        check_resize(glide);
    }
}

//mobile hot spot
const hs_mobile = document.querySelectorAll('.purdue-home-slide__hot-spot-mobile');

if (hs_mobile && hs_mobile.length > 0) {
    for (let i = 0; i < hs_mobile.length; i++) {
        let glide = new Glide(hs_mobile[i], {
            type: 'carousel',
            perView: 1,
            keyboard: false
        });
        const nextButton = hs_mobile[i].querySelector('.arrow--left');
        const prevButton = hs_mobile[i].querySelector('.arrow--right');
        nextButton.addEventListener('click', function (event) {
            event.preventDefault();
            glide.go('<');
        })

        prevButton.addEventListener('click', function (event) {
            event.preventDefault();
            glide.go('>');
        })
        glide.slides_count = hs_mobile[i].querySelectorAll('.glide__slide').length;
        glide.controls = hs_mobile[i].querySelector('.slider-controls');
        glide.on('resize', () => {
            check_resize(glide);
        });
        glide.mount({ CustomActiveClass, changeFocusOnSlideChange });
        check_resize(glide);

        const hs_slides = hs_mobile[i].querySelectorAll('.glide__slide');
        hs_slides.forEach((slide) => {
            if (slide.classList.contains('glide__slide--active')) {
                slide.setAttribute("z-index", "0");
            } else {
                slide.setAttribute("z-index", "-1");
            }
        })

        function setTabIndexMobile(hotspot_content) {

            if (hotspot_content && hotspot_content.length > 0) {

                hotspot_content.forEach((content) => {

                    const link = content.querySelector('a');
                    let parentElement = content.parentElement.parentElement;

                    setTimeout(() => {
                        if (parentElement.classList.contains('is-active')) {
                            if (link) {
                                //  link.setAttribute("tabindex", "0");
                            }
                             parentElement.setAttribute("tabindex", "0");
                        } else {
                            if (link) {
                                // link.setAttribute("tabindex", "-1");
                            }
                             parentElement.setAttribute("tabindex", "-1");
                        }
                    }, 500);

                })
            }
        }

        const hotspot_content = hs_mobile[i].querySelectorAll('.hot-spot-content');

        //  setTabIndexMobile(hotspot_content);


        glide.on('run', function () {

            //    setTabIndexMobile(hotspot_content);

        })


    }
}