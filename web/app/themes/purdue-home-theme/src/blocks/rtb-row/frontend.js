import { CustomActiveClass, changeFocusOnSlideChange, check_resize } from '../../../src/js/front-end/slider';
import Glide from '@glidejs/glide';

window.addEventListener("load", function () {

    const rtb_sliders = document.querySelectorAll('.purdue-home-rtb-slider');

    if (rtb_sliders && rtb_sliders.length > 0) {
        for (let i = 0; i < rtb_sliders.length; i++) {

            const type =
                rtb_sliders[i].classList.contains(
                    "purdue-home-rtb-slider--loop"
                ) && rtb_sliders[i].querySelectorAll(".glide__slide").length > 4
                    ? "carousel"
                    : "slide";

            let glide = new Glide(rtb_sliders[i], {
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

             glide.mount({ CustomActiveClass, changeFocusOnSlideChange });   
             check_resize(glide);   

            
            const observer = new IntersectionObserver((entries, _observer) => {
            entries.forEach(entry => {    
                if(entry.isIntersecting) {                                                                          
                 glide.update();
                 check_resize(glide);                                                                     
                }  
            });
            });
                                          
            observer.observe(rtb_sliders[i]);
         
            
           

        }
    }
});
