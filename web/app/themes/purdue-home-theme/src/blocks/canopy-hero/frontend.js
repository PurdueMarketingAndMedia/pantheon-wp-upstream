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
        const playButton=el.querySelector('.cta-play');
        const pauseButton=el.querySelector('.cta-pause');
        let position;
        if(playButton){
            playButton.addEventListener("click", ()=>{
                pauseButton.classList.add("is-active")
                playButton.classList.remove("is-active")
                sliders.forEach((slider, index)=>{
                    const track =slider.querySelector(".slide-track")
                    track.style.animationPlayState="running"
                })

            })
        }
        if(pauseButton){
            pauseButton.addEventListener("click", ()=>{
                pauseButton.classList.remove("is-active")
                playButton.classList.add("is-active")
                sliders.forEach((slider)=>{
                    const track =slider.querySelector(".slide-track")
                    track.style.animationPlayState="paused"
                })
            
            })
        }
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
