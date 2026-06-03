import { flipBtnState } from '../../utils/flipBtnState.js';

const canopyHeros = document.querySelectorAll(".purdue-home-canopy-hero");
const height = window.innerHeight - 80;
const width = window.innerWidth;
var r = document.querySelector(':root');

if(canopyHeros && canopyHeros.length>0){
    canopyHeros.forEach((el)=>{
        const sliders = el.querySelectorAll('.continuous-moving-slider');
        if(sliders && sliders.length>0){
            if(sliders[0]){
                const slides = sliders[0].querySelectorAll('.slide');
                const transform = slides.length/2*(-284)+'px';
                const time = 5*slides.length;
                r.style.setProperty('--animationSpeed1', time);
                r.style.setProperty('--translate1', transform);
            }
            if(sliders[1]){
                const slides = sliders[1].querySelectorAll('.slide');
                const transform = slides.length/2*(-284)+'px';
                const time = 5*slides.length;
                r.style.setProperty('--animationSpeed2', time);
                r.style.setProperty('--translate2', transform);
            }
        }

        const btn = el.querySelector('.cta-btnctrl');

        btn.addEventListener("click", () => {
            if (btn.classList.contains('cta-play')) {
                sliders.forEach((slider, index)=>{
                    const track = slider.querySelector(".slide-track")
                    track.style.animationPlayState="running"
                })
            } else {
                sliders.forEach((slider)=>{
                    const track = slider.querySelector(".slide-track")
                    track.style.animationPlayState="paused"
                })
            }
            flipBtnState(btn);
        });
    })

}
const arrows = document.querySelectorAll('.hero-down-arrow');
if(arrows && arrows.length>0){
    arrows.forEach((arrow)=>{
        arrow.addEventListener('click', () => {
            window.scroll({
                top: height,
                behavior: 'smooth',
            });
        });
    })
}
